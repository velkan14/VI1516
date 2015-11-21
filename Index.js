var dataset;
var data_sitcut;
var data_names;
var data_sitc;
d3.tsv("country_names.tsv", function (data2) {
        data_names = data2;
})

d3.tsv("SITC4_english_structure.tsv", function (data){

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

d3.tsv("year_origin_sitc2_final.tsv", function (data) {
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

    gen_vis();
    gen_tree();
})

//onmouseover
//ter espaço para os idiomas
//bastam dois idiomas

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
        for(var i = 0; i < data_names.length; i++) if(data_names[i].id_3char == d.origin) return data_names[i].name;
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
    var svg = d3.select("#second_chart")
    .append("svg")
    .attr("width",1000)
    .attr("height",1000);

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