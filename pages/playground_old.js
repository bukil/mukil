import React, { useEffect, useRef } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import Head from 'next/head';
import * as d3 from 'd3';

// Comprehensive sample data for hierarchical edge bundling with many categories
const sampleData = {
  "name": "flare",
  "children": [
    {
      "name": "analytics",
      "children": [
        {"name": "cluster", "children": [
          {"name": "AgglomerativeCluster", "size": 3938, "imports": ["analytics.cluster.CommunityStructure", "analytics.cluster.HierarchicalCluster"]},
          {"name": "CommunityStructure", "size": 3812, "imports": ["analytics.cluster.HierarchicalCluster"]},
          {"name": "HierarchicalCluster", "size": 6714, "imports": ["analytics.cluster.MergeEdge"]},
          {"name": "MergeEdge", "size": 743, "imports": []}
        ]},
        {"name": "graph", "children": [
          {"name": "BetweennessCentrality", "size": 3534, "imports": ["analytics.graph.LinkDistance", "analytics.graph.ShortestPaths"]},
          {"name": "LinkDistance", "size": 5731, "imports": ["analytics.graph.MaxFlowMinCut"]},
          {"name": "MaxFlowMinCut", "size": 7840, "imports": ["analytics.graph.ShortestPaths"]},
          {"name": "ShortestPaths", "size": 5914, "imports": ["analytics.graph.SpanningTree"]},
          {"name": "SpanningTree", "size": 3416, "imports": []}
        ]},
        {"name": "optimization", "children": [
          {"name": "AspectRatioBanker", "size": 7074, "imports": ["analytics.cluster.AgglomerativeCluster"]}
        ]}
      ]
    },
    {
      "name": "animate",
      "children": [
        {"name": "Easing", "size": 17010, "imports": ["animate.Transition", "animate.interpolate.Interpolator"]},
        {"name": "FunctionSequence", "size": 5842, "imports": ["animate.Transition"]},
        {"name": "interpolate", "children": [
          {"name": "ArrayInterpolator", "size": 1983, "imports": ["animate.interpolate.Interpolator"]},
          {"name": "ColorInterpolator", "size": 2047, "imports": ["animate.interpolate.Interpolator"]},
          {"name": "DateInterpolator", "size": 1375, "imports": ["animate.interpolate.Interpolator"]},
          {"name": "Interpolator", "size": 8746, "imports": []},
          {"name": "MatrixInterpolator", "size": 2202, "imports": ["animate.interpolate.Interpolator"]},
          {"name": "NumberInterpolator", "size": 1382, "imports": ["animate.interpolate.Interpolator"]},
          {"name": "ObjectInterpolator", "size": 1629, "imports": ["animate.interpolate.Interpolator"]},
          {"name": "PointInterpolator", "size": 1675, "imports": ["animate.interpolate.Interpolator"]},
          {"name": "RectangleInterpolator", "size": 2042, "imports": ["animate.interpolate.Interpolator"]}
        ]},
        {"name": "ISchedulable", "size": 1041, "imports": []},
        {"name": "Parallel", "size": 5176, "imports": ["animate.Transition"]},
        {"name": "Pause", "size": 449, "imports": ["animate.Transition"]},
        {"name": "Scheduler", "size": 5593, "imports": ["animate.ISchedulable"]},
        {"name": "Sequence", "size": 5534, "imports": ["animate.Transition"]},
        {"name": "Transition", "size": 9201, "imports": ["animate.Transitioner"]},
        {"name": "Transitioner", "size": 19975, "imports": ["animate.Scheduler"]},
        {"name": "TransitionEvent", "size": 1116, "imports": ["animate.Transition"]},
        {"name": "Tween", "size": 6006, "imports": ["animate.Transition"]}
      ]
    },
    {
      "name": "data",
      "children": [
        {"name": "converters", "children": [
          {"name": "Converters", "size": 721, "imports": ["data.converters.DelimitedTextConverter"]},
          {"name": "DelimitedTextConverter", "size": 4294, "imports": ["data.DataUtil"]},
          {"name": "GraphMLConverter", "size": 9800, "imports": ["data.DataUtil"]},
          {"name": "IDataConverter", "size": 1314, "imports": []},
          {"name": "JSONConverter", "size": 2220, "imports": ["data.DataUtil"]}
        ]},
        {"name": "DataField", "size": 1759, "imports": []},
        {"name": "DataSchema", "size": 2165, "imports": ["data.DataField"]},
        {"name": "DataSet", "size": 586, "imports": ["data.DataSchema"]},
        {"name": "DataSource", "size": 3331, "imports": ["data.DataSet"]},
        {"name": "DataTable", "size": 772, "imports": ["data.DataSchema"]},
        {"name": "DataUtil", "size": 3322, "imports": []}
      ]
    },
    {
      "name": "display",
      "children": [
        {"name": "DirtySprite", "size": 8833, "imports": ["display.LineSprite"]},
        {"name": "LineSprite", "size": 1732, "imports": []},
        {"name": "RectSprite", "size": 3623, "imports": ["display.LineSprite"]},
        {"name": "TextSprite", "size": 10066, "imports": ["display.DirtySprite"]}
      ]
    },
    {
      "name": "flex",
      "children": [
        {"name": "FlareVis", "size": 4116, "imports": ["display.DirtySprite", "vis.Visualization"]}
      ]
    },
    {
      "name": "physics",
      "children": [
        {"name": "DragForce", "size": 1082, "imports": ["physics.IForce"]},
        {"name": "GravityForce", "size": 1336, "imports": ["physics.IForce"]},
        {"name": "IForce", "size": 319, "imports": []},
        {"name": "NBodyForce", "size": 10498, "imports": ["physics.IForce"]},
        {"name": "Particle", "size": 2822, "imports": []},
        {"name": "Simulation", "size": 9983, "imports": ["physics.Particle", "physics.IForce"]},
        {"name": "Spring", "size": 2213, "imports": ["physics.Particle"]},
        {"name": "SpringForce", "size": 1681, "imports": ["physics.IForce", "physics.Spring"]}
      ]
    },
    {
      "name": "query",
      "children": [
        {"name": "AggregateExpression", "size": 1616, "imports": []},
        {"name": "And", "size": 1027, "imports": ["query.CompositeExpression"]},
        {"name": "Arithmetic", "size": 3891, "imports": []},
        {"name": "Average", "size": 891, "imports": ["query.AggregateExpression"]},
        {"name": "BinaryExpression", "size": 2893, "imports": []},
        {"name": "Comparison", "size": 5103, "imports": ["query.BinaryExpression"]},
        {"name": "CompositeExpression", "size": 3677, "imports": []},
        {"name": "Count", "size": 781, "imports": ["query.AggregateExpression"]},
        {"name": "DateUtil", "size": 4141, "imports": []},
        {"name": "Distinct", "size": 933, "imports": ["query.AggregateExpression"]},
        {"name": "Expression", "size": 5130, "imports": []},
        {"name": "ExpressionIterator", "size": 3617, "imports": []},
        {"name": "Fn", "size": 3240, "imports": []},
        {"name": "If", "size": 2732, "imports": []},
        {"name": "IsA", "size": 2039, "imports": []},
        {"name": "Literal", "size": 1214, "imports": []},
        {"name": "Match", "size": 3748, "imports": []},
        {"name": "Maximum", "size": 843, "imports": ["query.AggregateExpression"]},
        {"name": "methods", "children": [
          {"name": "add", "size": 593, "imports": []},
          {"name": "and", "size": 330, "imports": ["query.And"]},
          {"name": "average", "size": 287, "imports": ["query.Average"]},
          {"name": "count", "size": 277, "imports": ["query.Count"]},
          {"name": "distinct", "size": 292, "imports": ["query.Distinct"]},
          {"name": "div", "size": 595, "imports": []},
          {"name": "eq", "size": 594, "imports": ["query.Comparison"]},
          {"name": "fn", "size": 460, "imports": ["query.Fn"]},
          {"name": "gt", "size": 603, "imports": ["query.Comparison"]},
          {"name": "gte", "size": 625, "imports": ["query.Comparison"]},
          {"name": "iff", "size": 748, "imports": ["query.If"]},
          {"name": "isa", "size": 461, "imports": ["query.IsA"]},
          {"name": "lt", "size": 597, "imports": ["query.Comparison"]},
          {"name": "lte", "size": 619, "imports": ["query.Comparison"]},
          {"name": "max", "size": 283, "imports": ["query.Maximum"]},
          {"name": "min", "size": 283, "imports": ["query.Minimum"]},
          {"name": "mod", "size": 591, "imports": []},
          {"name": "mul", "size": 603, "imports": []},
          {"name": "neq", "size": 599, "imports": ["query.Comparison"]},
          {"name": "not", "size": 386, "imports": ["query.Not"]},
          {"name": "or", "size": 323, "imports": ["query.Or"]},
          {"name": "orderby", "size": 307, "imports": []},
          {"name": "range", "size": 772, "imports": []},
          {"name": "select", "size": 296, "imports": []},
          {"name": "stddev", "size": 363, "imports": ["query.StandardDeviation"]},
          {"name": "sub", "size": 600, "imports": []},
          {"name": "sum", "size": 280, "imports": ["query.Sum"]},
          {"name": "update", "size": 307, "imports": []},
          {"name": "variance", "size": 335, "imports": ["query.Variance"]},
          {"name": "where", "size": 299, "imports": []},
          {"name": "xor", "size": 354, "imports": ["query.Xor"]},
          {"name": "_", "size": 264, "imports": []}
        ]},
        {"name": "Minimum", "size": 843, "imports": ["query.AggregateExpression"]},
        {"name": "Not", "size": 1554, "imports": []},
        {"name": "Or", "size": 970, "imports": ["query.CompositeExpression"]},
        {"name": "Query", "size": 13896, "imports": []},
        {"name": "Range", "size": 1594, "imports": []},
        {"name": "StringUtil", "size": 4130, "imports": []},
        {"name": "Sum", "size": 791, "imports": ["query.AggregateExpression"]},
        {"name": "Variable", "size": 1124, "imports": []},
        {"name": "Variance", "size": 1876, "imports": ["query.AggregateExpression"]},
        {"name": "Xor", "size": 1101, "imports": ["query.CompositeExpression"]}
      ]
    },
    {
      "name": "scale",
      "children": [
        {"name": "IScaleMap", "size": 2105, "imports": []},
        {"name": "LinearScale", "size": 1316, "imports": ["scale.Scale"]},
        {"name": "LogScale", "size": 3151, "imports": ["scale.Scale"]},
        {"name": "OrdinalScale", "size": 3770, "imports": ["scale.Scale"]},
        {"name": "QuantileScale", "size": 2435, "imports": ["scale.Scale"]},
        {"name": "QuantitativeScale", "size": 4839, "imports": ["scale.Scale"]},
        {"name": "RootScale", "size": 1756, "imports": ["scale.Scale"]},
        {"name": "Scale", "size": 4268, "imports": []},
        {"name": "ScaleType", "size": 1821, "imports": []},
        {"name": "TimeScale", "size": 5833, "imports": ["scale.Scale"]}
      ]
    },
    {
      "name": "util",
      "children": [
        {"name": "Arrays", "size": 8258, "imports": []},
        {"name": "Colors", "size": 10001, "imports": []},
        {"name": "Dates", "size": 8217, "imports": []},
        {"name": "Displays", "size": 12555, "imports": []},
        {"name": "Filter", "size": 2324, "imports": []},
        {"name": "Geometry", "size": 10993, "imports": []},
        {"name": "heap", "children": [
          {"name": "FibonacciHeap", "size": 9354, "imports": ["util.heap.HeapNode"]},
          {"name": "HeapNode", "size": 1233, "imports": []}
        ]},
        {"name": "IEvaluable", "size": 335, "imports": []},
        {"name": "IPredicate", "size": 383, "imports": []},
        {"name": "IValueProxy", "size": 874, "imports": []},
        {"name": "math", "children": [
          {"name": "DenseMatrix", "size": 3165, "imports": ["util.math.IMatrix"]},
          {"name": "IMatrix", "size": 2815, "imports": []},
          {"name": "SparseMatrix", "size": 3366, "imports": ["util.math.IMatrix"]}
        ]},
        {"name": "Maths", "size": 17705, "imports": []},
        {"name": "Orientation", "size": 1486, "imports": []},
        {"name": "palette", "children": [
          {"name": "ColorPalette", "size": 6367, "imports": []},
          {"name": "Palette", "size": 1229, "imports": []},
          {"name": "ShapePalette", "size": 2059, "imports": ["util.palette.Palette"]},
          {"name": "SizePalette", "size": 2291, "imports": ["util.palette.Palette"]}
        ]},
        {"name": "Property", "size": 5559, "imports": []},
        {"name": "Shapes", "size": 19118, "imports": []},
        {"name": "Sort", "size": 6887, "imports": []},
        {"name": "Stats", "size": 6557, "imports": []},
        {"name": "Strings", "size": 22026, "imports": []}
      ]
    },
    {
      "name": "vis",
      "children": [
        {"name": "axis", "children": [
          {"name": "Axes", "size": 1302, "imports": ["vis.axis.Axis"]},
          {"name": "Axis", "size": 24593, "imports": ["display.DirtySprite"]},
          {"name": "AxisGridLine", "size": 652, "imports": []},
          {"name": "AxisLabel", "size": 636, "imports": []},
          {"name": "CartesianAxes", "size": 6703, "imports": ["vis.axis.Axes"]}
        ]},
        {"name": "controls", "children": [
          {"name": "AnchorControl", "size": 2138, "imports": ["vis.controls.IControl"]},
          {"name": "ClickControl", "size": 3824, "imports": ["vis.controls.IControl"]},
          {"name": "Control", "size": 1353, "imports": ["vis.controls.IControl"]},
          {"name": "ControlList", "size": 4665, "imports": ["vis.controls.IControl"]},
          {"name": "DragControl", "size": 2649, "imports": ["vis.controls.IControl"]},
          {"name": "ExpandControl", "size": 2832, "imports": ["vis.controls.IControl"]},
          {"name": "HoverControl", "size": 4896, "imports": ["vis.controls.IControl"]},
          {"name": "IControl", "size": 763, "imports": []},
          {"name": "PanZoomControl", "size": 5222, "imports": ["vis.controls.IControl"]},
          {"name": "SelectionControl", "size": 7862, "imports": ["vis.controls.IControl"]},
          {"name": "TooltipControl", "size": 8435, "imports": ["vis.controls.IControl"]}
        ]},
        {"name": "data", "children": [
          {"name": "Data", "size": 20544, "imports": ["data.DataSet"]},
          {"name": "DataList", "size": 19788, "imports": ["vis.data.Data"]},
          {"name": "DataSprite", "size": 10349, "imports": ["display.DirtySprite"]},
          {"name": "EdgeSprite", "size": 3301, "imports": ["vis.data.DataSprite"]},
          {"name": "NodeSprite", "size": 19382, "imports": ["vis.data.DataSprite"]},
          {"name": "render", "children": [
            {"name": "ArrowType", "size": 698, "imports": []},
            {"name": "EdgeRenderer", "size": 5569, "imports": ["vis.data.render.IRenderer"]},
            {"name": "IRenderer", "size": 353, "imports": []},
            {"name": "ShapeRenderer", "size": 2247, "imports": ["vis.data.render.IRenderer"]}
          ]},
          {"name": "ScaleBinding", "size": 11275, "imports": ["scale.Scale"]},
          {"name": "Tree", "size": 7147, "imports": ["vis.data.Data"]},
          {"name": "TreeBuilder", "size": 9930, "imports": ["vis.data.Tree"]}
        ]},
        {"name": "events", "children": [
          {"name": "DataEvent", "size": 2313, "imports": []},
          {"name": "SelectionEvent", "size": 1880, "imports": []},
          {"name": "TooltipEvent", "size": 1701, "imports": []},
          {"name": "VisualizationEvent", "size": 1117, "imports": []}
        ]},
        {"name": "legend", "children": [
          {"name": "Legend", "size": 20859, "imports": ["display.DirtySprite"]},
          {"name": "LegendItem", "size": 4614, "imports": ["display.DirtySprite"]},
          {"name": "LegendRange", "size": 10530, "imports": ["vis.legend.Legend"]}
        ]},
        {"name": "operator", "children": [
          {"name": "distortion", "children": [
            {"name": "BifocalDistortion", "size": 4461, "imports": ["vis.operator.distortion.Distortion"]},
            {"name": "Distortion", "size": 6314, "imports": []},
            {"name": "FisheyeDistortion", "size": 3444, "imports": ["vis.operator.distortion.Distortion"]}
          ]},
          {"name": "encoder", "children": [
            {"name": "ColorEncoder", "size": 3179, "imports": ["vis.operator.encoder.Encoder"]},
            {"name": "Encoder", "size": 4060, "imports": []},
            {"name": "PropertyEncoder", "size": 4138, "imports": ["vis.operator.encoder.Encoder"]},
            {"name": "ShapeEncoder", "size": 1690, "imports": ["vis.operator.encoder.Encoder"]},
            {"name": "SizeEncoder", "size": 1830, "imports": ["vis.operator.encoder.Encoder"]}
          ]},
          {"name": "filter", "children": [
            {"name": "FisheyeTreeFilter", "size": 5219, "imports": ["vis.operator.filter.GraphDistanceFilter"]},
            {"name": "GraphDistanceFilter", "size": 3165, "imports": []},
            {"name": "VisibilityFilter", "size": 3509, "imports": []}
          ]},
          {"name": "IOperator", "size": 1286, "imports": []},
          {"name": "label", "children": [
            {"name": "Labeler", "size": 9956, "imports": []},
            {"name": "RadialLabeler", "size": 3899, "imports": ["vis.operator.label.Labeler"]},
            {"name": "StackedAreaLabeler", "size": 3202, "imports": ["vis.operator.label.Labeler"]}
          ]},
          {"name": "layout", "children": [
            {"name": "AxisLayout", "size": 6725, "imports": ["vis.operator.layout.Layout"]},
            {"name": "BundledEdgeRouter", "size": 3727, "imports": []},
            {"name": "CircleLayout", "size": 9317, "imports": ["vis.operator.layout.Layout"]},
            {"name": "CirclePackingLayout", "size": 12003, "imports": ["vis.operator.layout.Layout"]},
            {"name": "DendrogramLayout", "size": 4853, "imports": ["vis.operator.layout.Layout"]},
            {"name": "ForceDirectedLayout", "size": 8411, "imports": ["vis.operator.layout.Layout"]},
            {"name": "IcicleTreeLayout", "size": 4864, "imports": ["vis.operator.layout.Layout"]},
            {"name": "IndentedTreeLayout", "size": 3174, "imports": ["vis.operator.layout.Layout"]},
            {"name": "Layout", "size": 7881, "imports": []},
            {"name": "NodeLinkTreeLayout", "size": 12870, "imports": ["vis.operator.layout.Layout"]},
            {"name": "PieLayout", "size": 2728, "imports": ["vis.operator.layout.Layout"]},
            {"name": "RadialTreeLayout", "size": 12348, "imports": ["vis.operator.layout.Layout"]},
            {"name": "RandomLayout", "size": 870, "imports": ["vis.operator.layout.Layout"]},
            {"name": "StackedAreaLayout", "size": 9121, "imports": ["vis.operator.layout.Layout"]},
            {"name": "TreeMapLayout", "size": 9191, "imports": ["vis.operator.layout.Layout"]}
          ]},
          {"name": "Operator", "size": 2490, "imports": ["vis.operator.IOperator"]},
          {"name": "OperatorList", "size": 5248, "imports": ["vis.operator.IOperator"]},
          {"name": "OperatorSequence", "size": 4190, "imports": ["vis.operator.IOperator"]},
          {"name": "OperatorSwitch", "size": 2581, "imports": ["vis.operator.IOperator"]},
          {"name": "SortOperator", "size": 2023, "imports": ["vis.operator.Operator"]}
        ]},
        {"name": "Visualization", "size": 16540, "imports": ["vis.data.Data"]}
      ]
    }
  ]
};

const HierarchicalEdgeBundling = () => {
  const svgRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const width = Math.min(1200, window.innerWidth - 40);
    const height = Math.min(900, window.innerHeight - 100);
    const radius = Math.min(width, height) / 2 - 150;

    // Create cluster layout
    const cluster = d3.cluster().size([2 * Math.PI, radius]);

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .style("width", "100%")
      .style("height", "auto")
      .style("font", "10px sans-serif");

    // Add a function to each node to calculate paths to other nodes
    function bilink(root) {
      const map = new Map(root.leaves().map(d => [d.data.fullName, d]));
      
      // Add path method to each node - this is crucial for edge bundling!
      root.each(d => {
        d.path = function(end) {
          const start = this;
          const a = [];
          const b = [];
          
          // Trace path from start to root
          let current = start;
          while (current.parent) {
            a.push(current);
            current = current.parent;
          }
          a.push(current); // Include root
          
          // Trace path from end to root
          current = end;
          while (current.parent) {
            b.push(current);
            current = current.parent;
          }
          b.push(current); // Include root
          
          // Find common ancestor
          let i = a.length - 1;
          let j = b.length - 1;
          while (i >= 0 && j >= 0 && a[i] === b[j]) {
            i--;
            j--;
          }
          
          // Build path: start -> ... -> common ancestor -> ... -> end
          return a.slice(0, i + 2).concat(b.slice(0, j + 1).reverse());
        };
      });
      
      // Add incoming/outgoing for interactivity
      root.leaves().forEach(d => {
        d.incoming = [];
        d.outgoing = [];
        if (d.data.imports) {
          d.data.imports.forEach(imp => {
            const target = map.get(imp);
            if (target) {
              d.outgoing.push(target);
              target.incoming.push(d);
            }
          });
        }
      });
      
      return root;
    }

    // Add bilink functionality
    bilink(root);

    // Create line generator for bundled edges
    const line = d3.lineRadial()
      .curve(d3.curveBundle.beta(0.85))
      .radius(d => d.y)
      .angle(d => d.x);

    // Add links with bundling
    const link = svg.append("g")
      .attr("stroke", "#4a90e2")
      .attr("fill", "none")
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("d", d => {
        try {
          // Create path from source to target through their common ancestor
          const path = d.source.path(d.target);
          console.log("Path found:", path ? path.length : "null");
          
          if (!path || path.length < 2) {
            // Fallback: direct line if path method fails
            const sx = d.source.y * Math.cos(d.source.x - Math.PI/2);
            const sy = d.source.y * Math.sin(d.source.x - Math.PI/2);
            const tx = d.target.y * Math.cos(d.target.x - Math.PI/2);
            const ty = d.target.y * Math.sin(d.target.x - Math.PI/2);
            return `M ${sx} ${sy} L ${tx} ${ty}`;
          }
          return line(path);
        } catch (error) {
          console.log("Path error:", error);
          // Fallback: direct line
          const sx = d.source.y * Math.cos(d.source.x - Math.PI/2);
          const sy = d.source.y * Math.sin(d.source.x - Math.PI/2);
          const tx = d.target.y * Math.cos(d.target.x - Math.PI/2);
          const ty = d.target.y * Math.sin(d.target.x - Math.PI/2);
          return `M ${sx} ${sy} L ${tx} ${ty}`;
        }
      })
      .style("opacity", 0.8)
      .style("stroke-width", 2)
      .each(function(d) { d.path = this; });

    // Add nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

    node.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI ? "start" : "end")
      .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
      .text(d => d.data.key || d.data.name)
      .style("fill", "#fff")
      .style("font-size", "11px")
      .style("cursor", "pointer")
      .each(function(d) { d.text = this; });

    // Add interactivity
    node
      .on("mouseover", function(event, d) {
        // Fade out all links and nodes
        link.style("opacity", 0.1);
        node.selectAll("text").style("fill", "rgba(255,255,255,0.3)");
        
        // Highlight this node
        d3.select(this).select("text").style("fill", "#4ecdc4").style("font-weight", "bold");
        
        // Highlight incoming links and their source nodes
        d.incoming.forEach(source => {
          link.filter(linkData => linkData.source === source && linkData.target === d)
            .style("opacity", 1)
            .style("stroke", "#ff6b6b")
            .style("stroke-width", 2);
          source.text.style.fill = "#ff6b6b";
        });
        
        // Highlight outgoing links and their target nodes
        d.outgoing.forEach(target => {
          link.filter(linkData => linkData.source === d && linkData.target === target)
            .style("opacity", 1)
            .style("stroke", "#4ecdc4")
            .style("stroke-width", 2);
          target.text.style.fill = "#4ecdc4";
        });
      })
      .on("mouseout", function() {
        // Reset all styles
        link.style("opacity", 0.7)
           .style("stroke", "rgba(255,255,255,0.6)")
           .style("stroke-width", 1.5);
        node.selectAll("text")
           .style("fill", "#fff")
           .style("font-weight", "normal");
      });

  }, []);

  return (
    <Box w="100%" display="flex" justifyContent="center" alignItems="center" py={8}>
      <svg ref={svgRef}></svg>
    </Box>
  );
};

const Playground = () => {
  return (
    <Layout title="Playground">
      <Head>
        <title>Playground - Mukil</title>
        <meta name="description" content="Mukil's creative playground. Interactive data visualizations and experimental projects." />
      </Head>
      <Box 
        w="100%" 
        maxW="100vw" 
        overflowX="hidden" 
        minH="100vh" 
        style={{
          backgroundColor: '#718096 !important' // Force gray color in both themes
        }}
      >
        {/* Header section */}
        <Box 
          w="100%" 
          pt={20}
          pb={8}
          display="flex" 
          flexDirection="column"
          alignItems="center" 
          justifyContent="center"
          color="white"
        >
          <Heading as="h1" size="2xl" color="white" mb={4} textAlign="center">
            Data Visualization Playground
          </Heading>
          <Text fontSize="xl" color="gray.200" textAlign="center" mb={2}>
            Hierarchical Edge Bundling
          </Text>
          <Text fontSize="md" color="gray.300" textAlign="center" maxW="600px">
            Interactive visualization showing relationships between different data clusters. 
            Hover over nodes to highlight connections.
          </Text>
        </Box>

        {/* Visualization container */}
        <Box 
          w="100%" 
          display="flex" 
          justifyContent="center"
          alignItems="center"
          px={4}
        >
          <HierarchicalEdgeBundling />
        </Box>
      </Box>
    </Layout>
  );
};

export default Playground;
