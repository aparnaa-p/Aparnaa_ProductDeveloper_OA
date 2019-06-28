import React, { Component } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

export default class Viz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/shipmentsData')
            .then(res => {
                this.setState({ items: res.json });
            });
    }

    componentDidUpdate(prevProps) {
        if(this.props != prevProps) {
            d3.select('.viz > *').remove();
            let data = d3.stratify()
                .id(function(d) { return d.get(this.props.config.children_circle); })
                .parentId(function(d) { return d.get(this.props.config.parent_circle); })
                (this.state.items);
            data = d3.stratify()
                .id(function(d) { return d.get(this.props.config.parent.circle); })
                .parentId(function(d) { return d.get(this.props.config.master_circle); })
                (data);
            this.draw(this.props);
        }
    }

    render() {
        return(
            <div className="viz" />
        )
    }

    draw(props) {
        console.log(this.state.items);
        let margin = 20;
        let svg = d3.select('.viz').append('svg')
            .attr('height',480)
            .attr('width',480);
        let diameter = +svg.attr("width");
        let g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
        let color = d3.scaleLinear()
            .domain([-1, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(d3.interpolateHcl);
        let pack = d3.pack()
            .size([diameter - margin, diameter - margin])
            .padding(2);

        var root = d3.hierarchy(this.state.items)
            .sum(function(d) { return d.size; })
            .sort(function(a, b) { return b.value - a.value; });
        var focus = root,
            nodes = pack(root).descendants(),
            view;
        var circle = g.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
            .style("fill", function(d) { return d.children ? color(d.depth) : null; })
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);
        var text = g.selectAll("text")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
            .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
            .text(function(d) { return d.data.name; });
        var node = g.selectAll("circle,text");
        svg.style("background", color(-1));
        var v = [root.x, root.y, root.r * 2 + margin];
        var k = diameter / v[2]; view = v;
        node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
        circle.attr("r", function(d) { return d.r * k; });

    }

    handleMouseOver(d, i) {
        circle.append("text").attr({
            id: "t" + d.x + "-" + d.y + "-" + i,
            x: function() { return xScale(d.x) - 30; },
            y: function() { return yScale(d.y) - 15; }
        })
            .text(function(d) {
                return d.children ? d.get(this.props.config.parent_tooltip) : d.get(this.props.config.children_tooltip);
            });
    }

    handleMouseOut(d, i) {
        d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
    }

}