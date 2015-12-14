function gen_tree() {
    var w = 500;
    var h = 500;
    var i = 0;
    var duration = 750;
    var svg = d3.select("#treevis")
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
          ;

      nodeEnter.append("circle")
          .attr("r", 1e-6)
          .on("click", click)
          .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeEnter.append("path")
          .attr("class", "product add")
          .attr("transform", function(d) { return "translate(" + 11 + "," + 17 + ")"; })
          .attr("d", 'M0,-5 V5 M-5,0 H5')
          .style("stroke-width", "0");

      nodeEnter.append("text")
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
          .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
          .attr("dy", ".35em")
          .attr("dx", "3.5em")
          .attr("text-anchor", "start")
          .text(function(d) { var s = d.value; if(s.length > 30)return s.substring(0, 30) + "..."; else return s; })
          .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

      nodeUpdate.select("circle")
          .attr("r", 10)
          .style("fill", function(d) { if(d.depth == 0) return "white"; else return getColorFromSitc(d.sitc); });

      nodeUpdate.select("path")
          .style("stroke-width", "4")
          .style("stroke", function(d) { if(d.depth == 0) return "white"; else return getColorFromSitc(d.sitc); });

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
      //if(i != 0)
      if (d.children) {
        //fechar
        d._children = d.children;
        d.children = null;
      }
      //update(d);
    }
}
