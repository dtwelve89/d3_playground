import React, { useRef } from 'react';
import * as d3 from 'd3';
import './Scatterplot.css';

const Scatterplot = ({
  color,
  width,
  height,
  radius,
  margin,
  title,
  xTitle,
  yTitle,
  data,
}) => {
  const chartAreaRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  // Graph width and height - accounting for margins
  const drawWidth = width - margin.left - margin.right;
  const drawHeight = height - margin.top - margin.bottom;

  // Calculate limits
  const xMin = d3.min(data, d => +d.x * 0.9);
  const xMax = d3.max(data, d => +d.x * 1.1);
  const yMin = d3.min(data, d => +d.y * 0.9);
  const yMax = d3.max(data, d => +d.y * 1.1);

  // Define scales
  const xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, drawWidth]);
  const yScale = d3.scaleLinear().domain([yMax, yMin]).range([0, drawHeight]);

  // Select all circles and bind data
  const circles = d3
    .select(chartAreaRef.current)
    .selectAll('circle')
    .data(data);

  // Use the .enter() method to get your entering elements, and assign their positions
  circles
    .enter()
    .append('circle')
    .merge(circles)
    .attr('r', d => radius)
    .attr('fill', d => color)
    .style('fill-opacity', 0.3)
    .transition()
    .duration(500)
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .style('stroke', 'black')
    .style('stroke-width', d => (d.selected === true ? '2px' : '0px'));

  // Use the .exit() and .remove() methods to remove elements that are no longer in the data
  circles.exit().remove();

  // Define Axes
  const xAxisFunction = d3.axisBottom().scale(xScale).ticks(5, 's');
  const yAxisFunction = d3.axisLeft().scale(yScale).ticks(5, 's');

  d3.select(xAxisRef.current).call(xAxisFunction);
  d3.select(yAxisRef.current).call(yAxisFunction);

  return (
    <div className='chart-wrapper'>
      <h1 className='vs-axes'>
        {xTitle} vs. {yTitle}
      </h1>
      <svg className='chart' width={width} height={height}>
        <text transform={`translate(${margin.left},15)`}>{title}</text>
        <g
          ref={chartAreaRef}
          transform={`translate(${margin.left}, ${margin.top})`}
        />

        <g
          ref={xAxisRef}
          transform={`translate(${margin.left}, ${height - margin.bottom})`}
        ></g>
        <g
          ref={yAxisRef}
          transform={`translate(${margin.left}, ${margin.top})`}
        ></g>

        <text
          className='axis-label'
          transform={`translate(${margin.left + drawWidth / 2}, ${
            height - margin.bottom + 30
          })`}
        >
          {xTitle}
        </text>

        <text
          className='axis-label'
          transform={`translate(${margin.left - 30}, ${
            drawHeight / 2 + margin.top
          }) rotate(-90)`}
        >
          {yTitle}
        </text>
      </svg>
    </div>
  );
};

Scatterplot.defaultProps = {
  width: 800,
  height: 500,
  radius: 3,
  color: 'var(--secondary-color)',
  margin: {
    left: 50,
    right: 10,
    top: 20,
    bottom: 50,
  },
};

export default Scatterplot;
