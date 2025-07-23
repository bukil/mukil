import React, { useEffect, useRef } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import Head from 'next/head';

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
    // const cluster = d3.cluster().size([2 * Math.PI, radius]); // Removed unused variable

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
