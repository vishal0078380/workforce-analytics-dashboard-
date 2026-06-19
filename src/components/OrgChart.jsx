import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const OrgChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const width = 900;
    const height = 600;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .call(d3.zoom().scaleExtent([0.3, 2]).on("zoom", (event) => {
        g.attr("transform", event.transform);
      }))
      .append("g");

    const g = svg.append("g").attr("transform", "translate(50,50)");

    // Convert API response to D3 hierarchy
    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().nodeSize([200, 120]);
    treeLayout(root);

    // Draw links (lines between nodes)
    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#CBD5E1")
      .attr("stroke-width", 2)
      .attr("d", d3.linkVertical()
        .x((d) => d.x)
        .y((d) => d.y)
      );

    // Draw nodes
    const node = g.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    // Node card background
    node.append("rect")
      .attr("x", -80).attr("y", -30)
      .attr("width", 160).attr("height", 60)
      .attr("rx", 8)
      .attr("fill", (d) => d.depth === 0 ? "#4F46E5" : "#EEF2FF")
      .attr("stroke", "#C7D2FE")
      .attr("stroke-width", 1.5);

    // Name text
    node.append("text")
      .attr("dy", "-5")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "600")
      .attr("fill", (d) => d.depth === 0 ? "#fff" : "#1E1B4B")
      .text((d) => d.data.name);

    // Title text
    node.append("text")
      .attr("dy", "12")
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", (d) => d.depth === 0 ? "#C7D2FE" : "#6366F1")
      .text((d) => d.data.title?.substring(0, 24));

    // Department badge
    node.append("text")
      .attr("dy", "26")
      .attr("text-anchor", "middle")
      .attr("font-size", "9px")
      .attr("fill", "#9CA3AF")
      .text((d) => d.data.department);

  }, [data]);

  return (
    <div style={{ overflowX: "auto", border: "1px solid #E5E7EB", borderRadius: "8px" }}>
      <svg ref={svgRef} style={{ display: "block", margin: "0 auto" }} />
      <p style={{ textAlign: "center", fontSize: "12px", color: "#9CA3AF", paddingBottom: "8px" }}>
        Scroll to zoom • Drag to pan
      </p>
    </div>
  );
};

export default OrgChart;