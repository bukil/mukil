"""Run with Blender --background --python scripts/prepare-daksha.py.

Creates a web asset from the original FBX without changing the source file.
Uses shared metal material fallbacks when the FBX has no authored PBR materials.
"""
import bpy
import json
import subprocess
import tempfile
import sys
from pathlib import Path
from mathutils import Vector, Matrix

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'models'
ASSEMBLY_EXPORT = '--assembly' in sys.argv
MODEL_PATH = OUT / ('daksha-assembly.glb' if ASSEMBLY_EXPORT else 'daksha.glb')
OUT.mkdir(parents=True, exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.fbx(filepath=str(ROOT / 'public' / 'dakshak.fbx'))
meshes = [o for o in bpy.context.scene.objects if o.type == 'MESH']
points = [o.matrix_world @ Vector(corner) for o in meshes for corner in o.bound_box]
low = Vector(tuple(min(p[i] for p in points) for i in range(3)))
high = Vector(tuple(max(p[i] for p in points) for i in range(3)))
center = (low + high) / 2
scale = 3.2 / max(high - low)
palette = {
    'Light Gold Metal': ((0.55, 0.34, 0.12, 1), 0.84, 0.32),
    'Polished Chrome Metal': ((0.68, 0.74, 0.8, 1), 0.88, 0.24),
    'Silver metal': ((0.48, 0.55, 0.62, 1), 0.8, 0.33),
    'Sparkle Metal': ((0.38, 0.44, 0.51, 1), 0.8, 0.36),
    'Chromatic Rainbow Spectrum Metal': ((0.15, 0.24, 0.32, 1), 0.8, 0.3),
    'Daksha graphite': ((0.1, 0.14, 0.18, 1), 0.72, 0.42),
    'Daksha titanium': ((0.32, 0.39, 0.46, 1), 0.8, 0.4),
    'Daksha detector': ((0.025, 0.04, 0.06, 1), 0.35, 0.52),
}
fallbacks = {}
for name in ['Daksha graphite', 'Daksha titanium', 'Daksha detector', 'Light Gold Metal']:
    fallbacks[name] = bpy.data.materials.get(name) or bpy.data.materials.new(name)
for obj in meshes:
    if not obj.data.materials or all(material is None or material.name in {'Material', 'Dots Stroke'} for material in obj.data.materials):
        if obj.name.startswith('Bus'): role = 'Daksha graphite'
        elif obj.name.startswith('RadiatorPlate'): role = 'Light Gold Metal'
        elif obj.name.startswith('dummy sensor') or 'ME_PCB' in obj.name: role = 'Daksha detector'
        else: role = 'Daksha titanium'
        obj.data.materials.clear()
        obj.data.materials.append(fallbacks[role])
for material in bpy.data.materials:
    color, metallic, roughness = palette.get(material.name, ((0.12, 0.15, 0.19, 1), 0.65, 0.4))
    material.use_nodes = True
    material.node_tree.nodes.clear()
    output = material.node_tree.nodes.new('ShaderNodeOutputMaterial')
    shader = material.node_tree.nodes.new('ShaderNodeBsdfPrincipled')
    shader.inputs['Base Color'].default_value = color
    shader.inputs['Metallic'].default_value = metallic
    shader.inputs['Roughness'].default_value = roughness
    material.node_tree.links.new(shader.outputs['BSDF'], output.inputs['Surface'])
    material.diffuse_color = color

for obj in meshes:
    world = obj.matrix_world.copy()
    obj.parent = None
    obj.data = obj.data.copy()
    obj.data.transform(Matrix.Scale(scale, 4) @ Matrix.Translation(-center) @ world)
    local_center = sum((Vector(corner) for corner in obj.bound_box), Vector()) / 8
    obj.data.transform(Matrix.Translation(-local_center))
    obj.matrix_world = Matrix.Translation(local_center)
    obj['part'] = obj.name.split('\\')[0]
for obj in list(bpy.context.scene.objects):
    if obj.type != 'MESH':
        bpy.data.objects.remove(obj, do_unlink=True)

# Keep meaningful subassemblies, consolidate their draw calls, and simplify CAD
# tessellation for small screens. The original FBX is always the source of truth.
buckets = {}
for obj in meshes:
    name = obj.name
    if name.startswith('Dome\\Cap'): key = 'Crown'
    elif name.startswith('Dome\\Ring'): key = 'Upper frame'
    elif 'MEBox' in name: key = 'Detector housings'
    elif 'ME_PCB' in name: key = 'Detector electronics'
    elif name.startswith('DakshaHE'): key = 'Side detectors'
    elif name.startswith('dummy sensor'): key = 'Sensors'
    else: key = 'Spacecraft bus'
    buckets.setdefault(key, []).append(obj)
    obj.data.calc_loop_triangles()
    if len(obj.data.loop_triangles) > 1500:
        bpy.context.view_layer.objects.active = obj
        triangulate = obj.modifiers.new('CAD triangulation', 'TRIANGULATE')
        bpy.ops.object.modifier_apply(modifier=triangulate.name)
        modifier = obj.modifiers.new('Web tessellation', 'DECIMATE')
        modifier.ratio = 0.32
        bpy.ops.object.modifier_apply(modifier=modifier.name)
assembly_order = ['Spacecraft bus', 'Side detectors', 'Upper frame', 'Detector electronics', 'Detector housings', 'Sensors', 'Crown']
component_count = 0
for name, parts in buckets.items():
    if ASSEMBLY_EXPORT:
        # Keep original CAD object boundaries as vertex attributes while still
        # joining render meshes. One object is one independently moving part.
        for index, obj in enumerate(parts):
            group_index = assembly_order.index(name)
            direction = (index + group_index) % 6
            offset = [0.0, 0.0, 0.0]
            offset[direction // 2] = (-1 if direction % 2 else 1) * (1.35 + (index % 4) * 0.18)
            # Export converts Blender Z-up geometry and custom vectors separately;
            # bake this vector in glTF's Y-up coordinates explicitly.
            offset = (offset[0], offset[2], -offset[1])
            delay = group_index * 0.105 + index / max(1, len(parts) - 1) * 0.075
            offsets = obj.data.attributes.new('_assembly_offset', 'FLOAT_VECTOR', 'POINT')
            delays = obj.data.attributes.new('_assembly_delay', 'FLOAT', 'POINT')
            offsets.data.foreach_set('vector', list(offset) * len(obj.data.vertices))
            delays.data.foreach_set('value', [delay] * len(obj.data.vertices))
            component_count += 1
    bpy.ops.object.select_all(action='DESELECT')
    for obj in parts: obj.select_set(True)
    bpy.context.view_layer.objects.active = parts[0]
    bpy.ops.object.join()
    joined = bpy.context.view_layer.objects.active
    joined.name = name
    joined['part'] = name
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
meshes = [o for o in bpy.context.scene.objects if o.type == 'MESH']
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(
    filepath=str(MODEL_PATH), export_format='GLB',
    use_selection=True, export_extras=True, export_yup=True,
    export_attributes=ASSEMBLY_EXPORT,
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
    export_draco_position_quantization=14,
    export_draco_normal_quantization=10,
)
for obj in meshes: obj.data.calc_loop_triangles()
print('DAKSHA_EXPORT', json.dumps({'meshes': len(meshes), 'components': component_count, 'triangles': sum(len(o.data.loop_triangles) for o in meshes), 'bytes': MODEL_PATH.stat().st_size}))
if ASSEMBLY_EXPORT:
    sys.exit(0)

# A real model render provides an instant first paint and a WebGL fallback.
scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.samples = 24
scene.cycles.use_denoising = True
scene.render.resolution_x = 1000
scene.render.resolution_y = 1000
scene.render.resolution_percentage = 100
scene.render.film_transparent = True
scene.world.color = (0.22, 0.22, 0.22)
scene.view_settings.view_transform = 'AgX'
bpy.ops.object.camera_add(location=(5.5, -7.5, 4.7))
camera = bpy.context.object
camera.rotation_euler = (-camera.location).to_track_quat('-Z', 'Y').to_euler()
camera.data.type = 'ORTHO'
camera.data.ortho_scale = 4.8
scene.camera = camera
for location, energy, size, color in [((1,-4,6),1500,5,(0.8,0.88,1)), ((-5,-1,2),1100,4,(0.5,0.7,1)), ((3,4,4),2200,3,(1,0.88,0.66))]:
    bpy.ops.object.light_add(type='AREA', location=location)
    light = bpy.context.object
    light.data.energy, light.data.shape, light.data.size = energy, 'DISK', size
    light.data.color = color
    light.rotation_euler = (-light.location).to_track_quat('-Z', 'Y').to_euler()
poster = Path(tempfile.gettempdir()) / 'daksha-poster.png'
scene.render.filepath = str(poster)
bpy.ops.render.render(write_still=True)
subprocess.run([
    'node', '-e',
    "require('sharp')(process.argv[1]).webp({quality:88}).toFile(process.argv[2]).catch(e=>{console.error(e);process.exit(1)})",
    str(poster), str(OUT / 'daksha-poster.webp'),
], cwd=str(ROOT), check=True)
