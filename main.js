import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import scrollama from "https://cdn.jsdelivr.net/npm/scrollama@3/+esm";

// Data for the bar chart
const dataSteps = [
  [30, 80, 45, 60, 20],
  [70, 20, 60, 90, 50],
  [50, 50, 50, 50, 50]
];

// Set up SVG canvas dimensions
const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");
const barWidth = width / dataSteps[0].length;

// Y-axis scale
const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

// Create bars
const bars = svg.selectAll("rect")
  .data(dataSteps[0])
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * barWidth)
  .attr("y", d => yScale(d))
  .attr("width", barWidth - 5)
  .attr("height", d => height - yScale(d))
  .attr("fill", "steelblue");

// Initialize Scrollama
const scroller = scrollama();

scroller
  .setup({
    step: ".step", // These are the steps in the HTML
    offset: 0.3 // Adjust this to trigger steps earlier or later in the scroll
  })
  .onStepEnter(response => {
    const stepIndex = +response.element.dataset.index;

    // Update bar chart based on scroll position
    bars.data(dataSteps[stepIndex])
      .transition()
      .duration(600)
      .attr("y", d => yScale(d))
      .attr("height", d => height - yScale(d));

    // Highlight active step
    d3.selectAll(".step").classed("active", false);
    d3.select(response.element).classed("active", true);
  });
