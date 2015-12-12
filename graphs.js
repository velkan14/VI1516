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
    //genScatterPlot();
    genHeatMap();
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

function genHeatMap(){
    var margin = { top: 50, right: 0, bottom: 100, left: 100 },
      width = 620 - margin.left - margin.right,
      height = 480 - margin.top - margin.bottom,
      gridSize = Math.floor(width / 21),
      legendElementWidth = gridSize*2,
      buckets = 9,
      colorsGreen = ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"],
      colorsRed = ["#fff5f0","#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
      days = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      times = ["'93", "'94", "'95", "'96", "'97", "'98", "'99", "'00", "'01", "'02", "'03", "'04", "'05", "'06", "'07", "'08", "'09", "'10", "'11", "'12", "'13"];
      datasets = ["FinalData1993.tsv", "FinalData1994.tsv", "FinalData1995.tsv","FinalData1996.tsv","FinalData1997.tsv","FinalData1998.tsv","FinalData1999.tsv","FinalData2000.tsv","FinalData2001.tsv","FinalData2002.tsv","FinalData2003.tsv","FinalData2004.tsv","FinalData2005.tsv","FinalData2006.tsv","FinalData2007.tsv","FinalData2008.tsv","FinalData2010.tsv","FinalData2011.tsv","FinalData2012.tsv","FinalData2013.tsv"];

  var svg = d3.select("#rightSide").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var sitcLabels = svg.selectAll(".sitcLabel")
      .data(days)
      .enter().append("text")
        .text(function (d) { return getNameFromSitc(d).substring(0,10) + "..."; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

  var timeLabels = svg.selectAll(".timeLabel")
      .data(times)
      .enter().append("text")
        .text(function(d) { return d; })
        .attr("x", function(d, i) { return i * gridSize; })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + gridSize / 2 + ", -6)")
        .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

  var heatmapChart = function(tsvFile, origin, destination) {
      d3.tsv(tsvFile,
      function(d) {
        if(d.origin == origin && d.destination == destination)
          return {
            year: +d.year,	origin: d.origin, destination: d.destination, sitc:	d.sitc_rev2.substring(0,1),
            export: +d.export_val,
            import:	+d.import_val
          };
          else if(d.origin == destination && d.destination == origin)
          return {
            year: +d.year,	origin: d.destination, destination: d.origin, sitc:	d.sitc_rev2.substring(0,1),
            export: +d.import_val,
            import:	+d.export_val
          };
      },
      function(error, data) {
        console.log(data);
        var maxImport = d3.max(data, function (d) { return d.import; });
        var maxExport = d3.max(data, function (d) { return d.export; });
        var max = Math.max(maxImport, maxExport);
//---------------------------Imports
        var colorScaleImports = d3.scale.quantile()
            .domain([0, max/6, max])
            .range(colorsRed);

        var cardsImport = svg.selectAll(".import")
            .data(data, function(d) {return d.sitc+':'+d.year;});

        cardsImport.append("title");

        cardsImport.enter().append("rect")
            .attr("x", function(d) { return (d.year - 1993) * gridSize; })
            .attr("y", function(d) { return (d.sitc) * gridSize; })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("class", "import bordered")
            .attr("width", gridSize)
            .attr("height", gridSize/2)
            .style("fill", colorsRed[0]);

        cardsImport.transition().duration(1000)
            .style("fill", function(d) { return colorScaleImports(d.import); });

        cardsImport.select("title").text(function(d) { return d.import; });

        cardsImport.exit().remove();

        var legendImport = svg.selectAll(".legendImport")
            .data([0].concat(colorScaleImports.quantiles()), function(d) { return d; });

        legendImport.enter().append("g")
            .attr("class", "legendImport");

        legendImport.append("rect")
          .attr("x", function(d, i) { return legendElementWidth * i; })
          .attr("y", height)
          .attr("width", legendElementWidth)
          .attr("height", gridSize / 2)
          .style("fill", function(d, i) { return colorsRed[i]; });

        legendImport.append("text")
          .attr("class", "mono")
          .text(function(d) { return "≥ " + Math.round(d); })
          .attr("x", function(d, i) { return legendElementWidth * i; })
          .attr("y", height + gridSize);

        legendImport.exit().remove();

//-----------------------------Exports
        var colorScaleExports = d3.scale.quantile()
            .domain([0, max/6, max])
            .range(colorsGreen);

        var cardsExport = svg.selectAll(".export")
            .data(data, function(d) {return d.sitc+':'+d.year;});

        cardsExport.append("title");

        cardsExport.enter().append("rect")
            .attr("x", function(d) { return (d.year - 1993) * gridSize; })
            .attr("y", function(d) { return (d.sitc) * gridSize + gridSize/2; })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("class", "export bordered")
            .attr("width", gridSize)
            .attr("height", gridSize/2)
            .style("fill", colorsGreen[0]);

        cardsExport.transition().duration(1000)
            .style("fill", function(d) { return colorScaleExports(d.export); });

        cardsExport.select("title").text(function(d) { return d.import; });

        cardsExport.exit().remove();


        var legend = svg.selectAll(".legendExport")
            .data([0].concat(colorScaleExports.quantiles()), function(d) { return d; });

        legend.enter().append("g")
            .attr("class", "legendExport");

        legend.append("rect")
          .attr("x", function(d, i) { return legendElementWidth * i; })
          .attr("y", height - 15)
          .attr("width", legendElementWidth)
          .attr("height", gridSize / 2)
          .style("fill", function(d, i) { return colorsGreen[i]; });

        legend.append("text")
          .attr("class", "mono")
          .text(function(d) { return "≥ " + Math.round(d); })
          .attr("x", function(d, i) { return legendElementWidth * i; })
          .attr("y", height + gridSize);

        legend.exit().remove();

      });
    };

    //heatmapChart("data/Bilateral/"+datasets[0], "prt", "and");
    heatmapChart("data/FinalData1.tsv", "prt", "aus");

    /*var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
      .data(datasets);

    datasetpicker.enter()
      .append("input")
      .attr("value", function(d){ return "Dataset " + d })
      .attr("type", "button")
      .attr("class", "dataset-button")
      .on("click", function(d) {
        heatmapChart(d);
      });*/
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
    var w = 600;
    var h = 600;
    var i = 0;
    var duration = 750;
    var svg = d3.select("#leftSide")
    .append("svg")
    .attr("width",w)
    .attr("height",h);

    // add the tooltip area to the webpage
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var tree = d3.layout.tree().size([w, h]);
    var diagonal = d3.svg.diagonal().projection(function projection(d) { return [d.y, d.x];});

    var root = data_sitc;
    root.x0 = h/2;
    root.y0 = 0;
    root.children.forEach(closeAll);
    update(root);

    function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
          links = tree.links(nodes);

      // Normalize for fixed-depth.
      var colors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a'];
      var j = 0;
      nodes.forEach(function(d, i) { d.y = d.depth * 180; if(d.depth == 1){ d.color = colors[j++]; }});

      // Update the nodes…
      var node = svg.selectAll("g.node")
          .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
          .on("click", click)
          .on("mouseover", function(d){
              tooltip.transition()
                 .duration(200)
                 .style("opacity", .9);
              tooltip.html(d.value)
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");})
          .on("mouseout", function(d) {
                       tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);
                   })
          ;

      nodeEnter.append("circle")
          .attr("r", 1e-6)
          .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeEnter.append("text")
          .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
          .attr("dy", ".35em")
          .attr("dx", "2.5em")
          .attr("text-anchor", "start")
          .text(function(d) { var s = d.value; if(s.length > 30)return s.substring(0, 30) + "..."; else return s; })
          .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

      nodeUpdate.select("circle")
          .attr("r", 10)
          .style("fill", function(d) { if(d.depth == 1) return d.color; else if (d.depth == 2) return d.parent.color; else return "white"; });

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
        //fechar
        d._children = d.children;
        d.children = null;
      } else {
        //abrir
        d.children = d._children;
        d._children = null;
      }
      if(d.parent) d.parent.children.forEach(function(n,i,a)
      {
        if(n != d)
        if (n.children) {
          //fechar
          n._children = n.children;
          n.children = null;
        }
      });
      update(d);
    }

    function closeAll(d, i, a){
      if(i != 0)
      if (d.children) {
        //fechar
        d._children = d.children;
        d.children = null;
      }
      //update(d);
    }
}

function genScatterPlot(){
  var i = 0;
  var duration = 700;
  var margin = {top: 20, right: 100, bottom: 30, left: 40},
      width = 650 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

      var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  // load data
    var dddd = dataset;
    var yeardata = [];
    dataset.forEach(function(d) {
          if(d.year == 2013){
            yeardata.push(d);
          }
    });
    var data = [];
    yeardata.forEach(function(d) {
          if(d.sitc < width/100){
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
      xScale = d3.scale.ordinal().domain(data.map(function(d){return d.sitc_string;})).rangePoints([20, width-10]), // value -> display CHANGED
      xMap = function(d) { return xScale(xValue(d));}, // data -> display
      xAxis = d3.svg.axis().scale(xScale)
      //.ticks(10)
      .tickFormat(function (d) {
          var s = getNameFromSitc(d);
          if(s.length > 12){
            return s.substring(0, 12) + "...";
          }
          else return s;
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
      color = d3.scale.ordinal()
    .domain(["Food and live animals", "Beverages and tobacco", "Crude materials"])
    .range(["#3ADF00", "#FE9A2E" , "#8A4B08"]);

  // add the graph canvas to the body of the webpage
  var svg = d3.select("#rightSide").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

        update(2000,2002);
        function update(minYear, maxYear){
          // load data
            var yeardata = [];
            dddd.forEach(function(d) {
                //FIXME: Não sei se deve ser menor ou igual
                  if(d.year >= minYear && d.year <= maxYear){
                    yeardata.push(d);
                  }
            });
            var data = [];
            yeardata.forEach(function(d) {
              //FIXME: Provavelmente devo receber os nºs de sitc num array
                  if(d.sitc < width/100){
                    data.push(d);
                  }
            });
            updateDots(data);
        }


      function updateDots(data){
        // Update the nodes…
        var dot = svg.selectAll("g.dot")
            .data(data, function(d) { return d.id || (d.id = ++i); });

        // Enter any new nodes at the parent's previous position.
        var dotEnter = dot.enter().append("g")
            .attr("class", "dot")
            .attr("transform", function(d) { return "translate(" + xMap(d) + "," + height + ")"; })
            .on("mouseover", function(d) {
              d3.select(this.parentNode.appendChild(this)).transition().duration(300)
              .style({'stroke-opacity':1,'stroke':'#F00'});

                tooltip.transition()
                     .duration(200)
                     .style("opacity", .9);
                tooltip.html( getNameFromCode(d["origin"]) +"<br/>"+ d.year +"<br/>"+ getNameFromSitc(d.sitc_string) + "<br/>" +(yValue(d)/1000000000).toFixed(1)+" billions")
                     .style("left", (d3.event.pageX + 5) + "px")
                     .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
              d3.select(this.parentNode.appendChild(this)).transition().duration(300)
              .style({'stroke-opacity':0,'stroke':'#F00'});
                tooltip.transition()
                     .duration(500)
                     .style("opacity", 0);
            })
            ;

        dotEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function(d) { return color(cValue(d));})

        // Transition nodes to their new position.
        var dotUpdate = dot.transition()
            .duration(duration)
            //.attr("cx", xMap)
            //.attr("cy", yMap)
            .attr("transform", function(d) { return "translate(" + xMap(d) + "," + yMap(d) + ")"; });

        dotUpdate.select("circle")
            .attr("r", 3.5);

        // Transition exiting nodes to the parent's new position.
        var dotExit = dot.exit().transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + xMap(d) + "," + height + ")"; })
            .remove();

        dotExit.select("circle")
            .attr("r", 1e-6);
      }
}




function genChord(){

    var margin      = {top: -50, right: 10, bottom: 10, left: -50},
        width       = 450 - margin.left - margin.right,
        height      = 450 - margin.top  - margin.bottom,
        innerRadius = Math.min(width, height) * .25,
        outerRadius = innerRadius * 1.1;

    var svg = d3.select("#tabs-1").append("svg")
        .attr("width",  450)
        .attr("height", 450)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .append("g")
        .attr("class", "chordgraph")
        .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

    var div1 = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


    d3.csv("data/trade.csv", function(d){


        //file name
        var firstColumn = "loo";

        //store coloumn names
        var fc = d.map(function(d){ return d[firstColumn]; }),
            fo = fc.slice(0),
            maxtrix_size = (Object.keys(d[0]).length - 1) + fc.length,
            matrix  = [];

        //Create an empty square matrix of zero placeholders, the size of the ata
        for(var i=0; i < maxtrix_size; i++){
            matrix.push(new Array(maxtrix_size+1).join('0').split('').map(parseFloat));
        }

        //go through the data and convert all to numbers except "first_column"
        for(var i=0; i < d.length; i++){

            var j = d.length;//counter

            for(var prop in d[i]){
                if(prop != firstColumn){
                    fc.push(prop);
                    matrix[i][j] = +d[i][prop];
                    matrix[j][i] = +d[i][prop];
                    j++;
                }
            }
        }

        var chord = d3.layout.chord()
            .padding(.1)
            .sortSubgroups(d3.descending)
            .matrix(matrix);

        var chordgroups = chord.groups()
            .map(function(d){ d.angle = (d.startAngle + d.endAngle)/2; return d; });

        var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        var fill = d3.scale.ordinal()
         .domain(d3.range(4))
         .range(["#957244"]);

        svg.selectAll("path")
            .data(chord.groups)
            .enter()
            .append("path")
            .style("stroke", function(d, i) { return "#000"; })
            .style("cursor", "pointer")
            .attr("d", arc)
            .on("mouseover", function(d, i){
                chords.classed("fade", function(d){
                    return d.source.index != i && d.target.index != i;
                  })
                div1.transition()
                .duration(200)
                .style("opacity", .9);

                div1.html("<text> Valor de exportações:<br>" + d3.round(d.value) + "</text>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("opacity", 1)
            })
            .on("mouseout", function(d) {
            div1.transition()
                .duration(500)
                .style("opacity", 0)});


        var chords = svg.append("g")
            .attr("class", "chord")
            .selectAll("path")
            .data(chord.chords)
            .enter()
            .append("path")
            //set the starting node. Change index from zero here.
            //to start with a target dataset, change d.source.index to d.target.index
            .attr("d", d3.svg.chord().radius(innerRadius))
            .style("fill", function(d) { return "rgb(" + (255-d.target.value*15) + ",0,0)"; })
            .style("stroke", function(d){ return "#000";});

        svg.selectAll(".text")
            .data(chordgroups)
            .enter()
            .append("text")
            .attr("class", "text")
            .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
            .attr("transform", function(d){

                //rotate each label around the circle
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                       "translate(" + (outerRadius + 10) + ")" +
                       (d.angle > Math.PI ? "rotate(180)" : "");

            })
            .text(function(d,i){
                //set the text content
                return fc[i];
            })
            .style({
                "font-family":"sans-serif",
                "font-size"  :"12px"
            })

    });
}
