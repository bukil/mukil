import React, { useEffect, useRef } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import Head from 'next/head';
import * as d3 from 'd3';

// Simplified sample data for hierarchical edge bundling
const sampleData = {
  "name": "root",
  "children": [
    {
      "name": "cluster",
      "children": [
        {"name": "AgglomerativeCluster", "size": 3938, "imports": ["cluster.CommunityStructure"]},
        {"name": "CommunityStructure", "size": 3812, "imports": ["cluster.HierarchicalCluster"]},
        {"name": "HierarchicalCluster", "size": 6714, "imports": ["cluster.MergeEdge"]},
        {"name": "MergeEdge", "size": 743, "imports": []}
      ]
    },
    {
      "name": "graph",
      "children": [
        {"name": "BetweennessCentrality", "size": 3534, "imports": ["graph.LinkDistance"]},
        {"name": "LinkDistance", "size": 5731, "imports": ["graph.MaxFlowMinCut"]},
        {"name": "MaxFlowMinCut", "size": 7840, "imports": ["graph.ShortestPaths"]},
        {"name": "ShortestPaths", "size": 5914, "imports": ["graph.SpanningTree"]},
        {"name": "SpanningTree", "size": 3416, "imports": []}
      ]
    },
    {
      "name": "animate",
      "children": [
        {"name": "Easing", "size": 17010, "imports": ["animate.Transition"]},
        {"name": "Transition", "size": 9201, "imports": ["animate.Tween"]},
        {"name": "Tween", "size": 6006, "imports": []}
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

    const width = Math.min(1000, window.innerWidth - 40);
    const height = Math.min(800, window.innerHeight - 100);
    const radius = Math.min(width, height) / 2 - 120;

    // Helper functions
    function packageHierarchy(classes) {
      let map = {};
      
      function find(name, data) {
        let node = map[name], i;
        if (!node) {
          node = map[name] = data || {name: name, children: []};
          if (name.length) {
            node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
            node.parent.children.push(node);
            node.key = name.substring(i + 1);
          }
        }
        return node;
      }
      
      classes.forEach(function(d) {
        find(d.name, d);
      });
      
      return map[""];
    }

    function packageImports(nodes) {
      let map = {},
          imports = [];

      // Compute a map from name to node.
      nodes.forEach(function(d) {
        map[d.name] = d;
      });

      // For each import, construct a link from the source to target node.
      nodes.forEach(function(d) {
        if (d.imports) d.imports.forEach(function(i) {
          if (map[i]) {
            imports.push({source: map[d.name], target: map[i]});
          }
        });
      });

      return imports;
    }

    // Flatten the hierarchy to get all leaf nodes
    function getLeafNodes(node, result = []) {
      if (!node.children || node.children.length === 0) {
        result.push(node);
      } else {
        node.children.forEach(child => getLeafNodes(child, result));
      }
      return result;
    }

    // Create cluster layout
    const cluster = d3.cluster().size([2 * Math.PI, radius]);
    
    const root = d3.hierarchy(sampleData);
    cluster(root);

    const leafNodes = root.leaves();
    const links = packageImports(leafNodes.map(d => ({
      name: d.data.name,
      imports: d.data.imports || []
    })));

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .style("width", "100%")
      .style("height", "auto")
      .style("font", "10px sans-serif");

    // Create path generator for bundled edges
    const line = d3.lineRadial()
      .curve(d3.curveBundle.beta(0.85))
      .radius(d => d.y)
      .angle(d => d.x);

    // Add links
    const link = svg.append("g")
      .attr("stroke", "rgba(255,255,255,0.4)")
      .attr("fill", "none")
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("d", d => {
        // Create a simple curved path between source and target
        const source = d.source;
        const target = d.target;
        if (!source || !target) return null;
        
        // Find the corresponding nodes in the cluster layout
        const sourceNode = leafNodes.find(n => n.data.name === source.name);
        const targetNode = leafNodes.find(n => n.data.name === target.name);
        
        if (!sourceNode || !targetNode) return null;
        
        // Create a path that goes through the common ancestor
        const path = sourceNode.path(targetNode);
        return line(path);
      })
      .style("opacity", 0.6)
      .style("stroke-width", 1.5);

    // Add nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(leafNodes)
      .join("g")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI ? "start" : "end")
      .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
      .text(d => d.data.name)
      .style("fill", "#fff")
      .style("font-size", "12px")
      .style("cursor", "pointer")
      .each(function(d) { d.text = this; });

    // Add interactivity
    node
      .on("mouseover", function(event, d) {
        // Highlight connected links
        link.style("stroke", linkData => {
          const sourceNode = leafNodes.find(n => n.data.name === linkData.source.name);
          const targetNode = leafNodes.find(n => n.data.name === linkData.target.name);
          if (sourceNode === d || targetNode === d) {
            return sourceNode === d ? "#4ecdc4" : "#ff6b6b";
          }
          return "rgba(255,255,255,0.1)";
        }).style("opacity", linkData => {
          const sourceNode = leafNodes.find(n => n.data.name === linkData.source.name);
          const targetNode = leafNodes.find(n => n.data.name === linkData.target.name);
          return (sourceNode === d || targetNode === d) ? 1 : 0.1;
        });
        
        d3.select(this).style("font-weight", "bold").style("fill", "#4ecdc4");
      })
      .on("mouseout", function(event, d) {
        // Reset all styles
        link.style("stroke", "rgba(255,255,255,0.4)")
           .style("opacity", 0.6);
        d3.select(this).style("font-weight", "normal").style("fill", "#fff");
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

        {/* Trust and AI Panel */}
        <Box
          w={{ base: '95%', md: '70%', lg: '50%' }}
          mx="auto"
          mb={8}
          p={6}
          borderRadius="2xl"
          boxShadow="lg"
          bg="rgba(255,255,255,0.08)"
          border="1px solid rgba(255,255,255,0.18)"
          backdropFilter="blur(2px)"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Heading as="h2" size="lg" color="white" mb={2} letterSpacing="wide">
            Trust and AI
          </Heading>
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
