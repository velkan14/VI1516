var dataset;
var data_sitcut;
var data_names;
var sitc;
var data_sitc;
d3.tsv("data/country_names.tsv", function (data2) {
        data_names = data2;
})

d3.tsv("data/SITC4_english_structure.tsv", function (data){
    sitc = data;
    var array = [];
    var root = {"parent":null, "children": array,"value": "Products", "depth": 0};
    for(var i = 0; i < data.length; i++){
        if(data[i].code.length == 1){
            var children = [];
            var obj = {"parent":root, "children": null, "value": data[i].description, "depth": 1};
            for(var j = 0; j < data.length; j++){
                if(data[j].code.length == 2 && data[j].code[0] == data[i].code){
                    var child = {"parent":obj, "children": null, "value": data[j].description, "depth": 2}
                    children.push(child);
                }
            }
            obj.children = children;
            array.push(obj);
        }
    }
    data_sitc = root;
})

d3.tsv("data/year_origin_sitc2_final.tsv", function (data) {
    dataset = data;

    data_sitcut = d3.nest()
    .key(function(d){return d.origin;})
    .key(function(d){return d.sitc.substring(0, 1);})
    .rollup(function(d) { return {"import": d3.sum(d, function(g) {return g.import_val;}), "export": d3.sum(d, function(g) {return g.export_val; })};})
    .entries(data);

    var arr = [];
    for (var i = 0; i < data_sitcut.length; i++) {
        var arr2 = [];
        var max_imports = 0;
        var max_exports = 0;
        for(var j = 0; j<data_sitcut[i].values.length; j++){
            max_imports = max_imports + data_sitcut[i].values[j].values.import;
            max_exports =  max_exports + data_sitcut[i].values[j].values.export;
            arr2.push(
            {
                "sitc": data_sitcut[i].values[j].key,
                "import": data_sitcut[i].values[j].values.import,
                "export": data_sitcut[i].values[j].values.export,
            }
            );
        }
        arr.push(
        {
            "origin": data_sitcut[i].key,
            "max_imports": max_imports,
            "max_exports": max_exports,
            "values": arr2
        }
        );
    }
    data_sitcut = arr;
    dataset.forEach(function(d) {
        d.year = +d.year;
        d.import_val = +d.import_val;
        d.export_val = +d.export_val;
        d["sitc_string"] = d["sitc"];
        d["sitc"] = +d["sitc"];
    });
    //gen_vis();
    gen_tree();
    genChord();
    genScatterPlot();
})

//onmouseover
//ter espaço para os idiomas
//bastam dois idiomas
function getNameFromCode(code){
    for(var i = 0; i < data_names.length; i++) if(data_names[i].id_3char == code) return data_names[i].name;
}

function getNameFromSitc(code){
    for(var i = 0; i < sitc.length; i++){
        if(sitc[i].code == code){
          return sitc[i].description;
        }
    }
}

function gen_vis() {
	var w = 800;
    var h = 400;
    var padding=60;
    var numRows = 9;
    var ORIGIN_NUMBER = 0;

    var drop = d3.select("#country");

    drop.selectAll("country")
    .data(data_sitcut)
    .enter().append("option")
        .attr("value",function(d) {
      return d.origin;})
    .text(function(d) {
        return getNameFromCode(d.origin);
    });

    var hscale = d3.scale.linear()
    .domain([0,numRows])
    .range([padding,h-padding]);

    var xscale = d3.scale.linear()
    .domain([0, 1]);

    var svg = d3.select("#the_chart")
    .append("svg")
    .attr("width",w)
    .attr("height",h);

    svg.selectAll("rect")
    .data(data_sitcut[ORIGIN_NUMBER].values)
    .enter().append("rect")
    .attr("class", "export")
    .attr("width",function(d) {
      return xscale(d.export*100/data_sitcut[ORIGIN_NUMBER].max_exports)*10;})
    .attr("height", 20)
    .attr("fill","green")
    .attr("x",function(d) {
      return 400;})
    .attr("y",function(d, i) {
       return hscale(i)-10;})
    .append("title")
    .text(function(d) { return Math.round((d.export*100/data_sitcut[ORIGIN_NUMBER].max_exports)*100)/100;});

    svg.selectAll(".rect")
    .data(data_sitcut[ORIGIN_NUMBER].values)
    .enter().append("rect")
    .attr("class", "import")
    .attr("width",function(d) {
      return xscale(d.import*100/data_sitcut[ORIGIN_NUMBER].max_imports)*10;})
    .attr("height", 20)
    .attr("fill","red")
    .attr("x",function(d) {
      return 400-xscale(d.import*100/data_sitcut[ORIGIN_NUMBER].max_imports)*10;})
    .attr("y",function(d, i) {
      return hscale(i)-10;})
    .append("title")
    .text(function(d) { return Math.round((d.import*100/data_sitcut[ORIGIN_NUMBER].max_imports)*100)/100;});

    var yaxis = d3.svg.axis()
    .scale(hscale)
    .orient("left");

    svg.append("g")
    .attr("transform","translate(400,0)")
    .attr("class","axis")
    .call(yaxis);


    /***************LIST*****************/
    d3.selectAll("#country").on("change",function(){

        var e = document.getElementById("country");
        ORIGIN_NUMBER=e.selectedIndex;

        svg.selectAll("rect.export")
        .data(data_sitcut[ORIGIN_NUMBER].values)
        .transition()
        .duration(1000)
        .attr("width",function(d) {
          return xscale(d.export*100/data_sitcut[ORIGIN_NUMBER].max_exports)*10;})
        .attr("fill","green")
        .select("title")
        .text(function(d) { return Math.round((d.export*100/data_sitcut[ORIGIN_NUMBER].max_exports)*100)/100;});

        svg.selectAll("rect.import")
        .data(data_sitcut[ORIGIN_NUMBER].values)
        .transition()
        .duration(1000)
        .attr("width",function(d) {
          return xscale(d.import*100/data_sitcut[ORIGIN_NUMBER].max_imports)*10;})
        .attr("fill","red")
        .attr("x",function(d) {
          return 400-xscale(d.import*100/data_sitcut[ORIGIN_NUMBER].max_imports)*10;})
        .select("title")
        .text(function(d) { return Math.round((d.import*100/data_sitcut[ORIGIN_NUMBER].max_imports)*100)/100;});
    });
}


function gen_tree() {
    var w = 380;
    var h = 250;
    var i = 0;
    var duration = 750;
    var svg = d3.select("#tabs-2")
    .append("svg")
    .attr("width",w)
    .attr("height",h);
    console.log(svg);

    var tree = d3.layout.tree().size([w/2,h/2]);
    var diagonal = d3.svg.diagonal().projection(function projection(d) { return [d.y, d.x];});

    var root = data_sitc;
    root.x0 = h / 2;
    root.y0 = 0;

    update(root);

    function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
          links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 180;});

      // Update the nodes…
      var node = svg.selectAll("g.node")
          .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
          .on("click", click);

      nodeEnter.append("circle")
          .attr("r", 1e-6)
          .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeEnter.append("text")
          .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
          .attr("dy", ".35em")
          .attr("dx", "2.5em")
          //.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
          .attr("text-anchor", "start")
          .text(function(d) { return d.value; })
          .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

      nodeUpdate.select("circle")
          .attr("r", 10)
          .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeUpdate.select("text")
          .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
          .remove();

      nodeExit.select("circle")
          .attr("r", 1e-6);

      nodeExit.select("text")
          .style("fill-opacity", 1e-6);

      // Update the links…
      var link = svg.selectAll("path.link")
          .data(links, function(d) { return d.target.id; });

      // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
          .attr("class", "link")
          .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          });

      // Transition links to their new position.
      link.transition()
          .duration(duration)
          .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
          })
          .remove();

      // Stash the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
}

function genScatterPlot(){
var margin = {top: 20, right: 100, bottom: 30, left: 40},
    width = 650 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// load data
  var yeardata = [];
  dataset.forEach(function(d) {
        if(d.year == 2013){
          yeardata.push(d);
        }
  });
  var data = [];
  yeardata.forEach(function(d) {
        if(d.sitc < 10){
          data.push(d);
        }
  });
  // change string (from CSV) into number format

/*
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */

// setup x
var xValue = function(d) { return d.sitc_string;}, // data -> value
    xScale = d3.scale.ordinal().domain(data.map(function(d){return d.sitc_string;})).rangePoints([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale)
    //.ticks(10)
    .tickFormat(function (d) {
        return getNameFromSitc(d);
    })
    .orient("bottom");

// setup y
var yValue = function(d) { return d.import_val;}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale)
    .tickFormat(function (d) {
        var prefix = d3.formatPrefix(d);
        return prefix.scale(d);// + prefix.symbol;
    })
    .orient("left");

// setup fill color
var cValue = function(d) { return d.sitc;},
    color = d3.scale.category10();

// add the graph canvas to the body of the webpage
var svg = d3.select("#vistabs-2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // don't want dots overlapping axis, so add in buffer to data domain
  //xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Products");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Imports");

  // draw dots
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));})
      .on("mouseover", function(d) {
        d3.select(this.parentNode.appendChild(this)).transition().duration(300)
        .style({'stroke-opacity':1,'stroke':'#F00'});

          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html( getNameFromCode(d["origin"]) + "<br/>" + getNameFromSitc(d.sitc_string) + "<br/>" +(yValue(d)/1000000000).toFixed(1)+" billions")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        d3.select(this.parentNode.appendChild(this)).transition().duration(300)
        .style({'stroke-opacity':0,'stroke':'#F00'});
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

  // draw legend
  /*var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;});*/
}

function genChord(){
  // From http://mkweb.bcgsc.ca/circos/guide/tables/
var matrix = [
[0,100,200, 44, 20, 220, 30],
[0,0,200, 44, 20, 220, 30],
[0,100,0, 44, 20, 220, 30],
[0,100,200, 0, 20, 220, 30],
[0,100,23, 44, 0, 220, 30],
[91,190,200, 44, 20, 0, 30],
[0,100,200, 44, 20, 220, 0],
];

var chord = d3.layout.chord()
    .padding(.05)
    .sortSubgroups(d3.descending)
    .matrix(matrix);

var width = 380,
    height = 300,
    innerRadius = Math.min(width, height) * .45,
    outerRadius = innerRadius * 1.1;

var fill = d3.scale.ordinal()
    .domain(d3.range(4))
    .range(["#957244"]);

var svg = d3.select("#tabs-1").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("g").selectAll("path")
    .data(chord.groups)
  .enter().append("path")
    .style("fill", function(d) { return fill(d.index); })
    .style("stroke", function(d) { return fill(d.index); })
    .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
    .on("mouseover", fade(.1))
    .on("mouseout", fade(1));

var ticks = svg.append("g").selectAll("g")
    .data(chord.groups)
  .enter().append("g").selectAll("g")
    .data(groupTicks)
  .enter().append("g")
    .attr("transform", function(d) {
      return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
          + "translate(" + outerRadius + ",0)";
    });

ticks.append("line")
    .attr("x1", 1)
    .attr("y1", 0)
    .attr("x2", 5)
    .attr("y2", 0)
    .style("stroke", "#000");

ticks.append("text")
    .attr("x", 8)
    .attr("dy", ".35em")
    .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
    .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
    .text(function(d) { return d.label; });


svg.append("g")
    .attr("class", "chord")
  .selectAll("path")
    .data(chord.chords)
  .enter().append("path")
    .attr("d", d3.svg.chord().radius(innerRadius))
    .style("fill", function(d) { return "rgb(" + d.target.value + ",0,0)"; })
    .style("opacity", 1);
}

// Returns an array of tick angles and labels, given a group.
function groupTicks(d) {
  var k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, 1000).map(function(v, i) {
    return {
      angle: v * k + d.startAngle,
      label: i % 5 ? null : v / 1000 + "k"
    };
  });
}

// Returns an event handler for fading a given chord group.
function fade(opacity) {
  return function(g, i) {
    svg.selectAll(".chord path")
        .filter(function(d) { return d.source.index != i && d.target.index != i; })
      .transition()
        .style("opacity", opacity);
  };
}
