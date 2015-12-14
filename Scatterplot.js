function genScatterPlot(){
  var i = 0;
  var duration = 700;
  var margin = {top: 5, right: 100, bottom: 30, left: 40},
      width = 650 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

      var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  // load data
    var dddd = dataset;
    var yeardata = [];
    dataset.forEach(function(d) {
          if(d.year == 2012){
            yeardata.push(d);
          }
    });
    var sitcList = [1, 3, 4, 5, 6];
    var data = [];
    yeardata.forEach(function(d) {
      sitcList.forEach(function(s){
        if(d.sitc == s){
          data.push(d);
        }
      })

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


    var select  = d3.select("#scatterplotvis").append("select").on("change", change),
        options = select.selectAll('option').data(["Imports", "Exports"]); // Data join
    // Enter selection
    options.enter().append("option").text(function(d) { return d; });
    var typeTrade = "Imports";


  // add the graph canvas to the body of the webpage
  var svg = d3.select("#scatterplotvis").append("svg")
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


        function change() {
            var si   = select.property('selectedIndex'),
                s    = options.filter(function (d, i) { return i === si }),
                data = s.datum();
                if(data == "Imports"){
                  yValue = function(d) { return d.import_val;}
                  typeTrade = "Imports";
                } else {
                  yValue = function(d) { return d.export_val;}
                  typeTrade = "Exports";
                }
                update(minYear,maxYear);
        }
        var minYear = 1993, maxYear = 2013;
        update(minYear,maxYear);

        //jQuery ---------------------------------------------------//
        var $range = $("#range");//.data("ionRangeSlider");
        $range.on("change", function (d) {
          var $this = $(this),
              value = $this.prop("value").split(';');
          minYear = value[0];
          maxYear = value[1];
          update(minYear,maxYear);
          //updateAxis(data);
          //updateDots(data);
        });
        //-----------------------------------------------------------//
        function update(minYear, maxYear){
          // load data
            var yeardata = [];
            dddd.forEach(function(d) {
                //FIXME: Não sei se deve ser menor ou igual
                  if(d.year >= minYear && d.year <= maxYear){
                    yeardata.push(d);
                  }
            });
            var sitcList = ["1", "2", "3", "4", "8"];
            var data = [];
            yeardata.forEach(function(d) {
              sitcList.forEach(function(s){
                if(d.sitc_string == s){
                  data.push(d);
                }
              })

            });
            updateAxis(data);
            updateDots(data);
        }

        function updateAxis(data){
          xScale.domain(data.map(function(d){return d.sitc_string;}));
          yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);
          svg.select(".x.axis").call(xAxis);
          var y = svg.select(".y.axis");
          y.call(yAxis);
          y.select("text.label").text(typeTrade);
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
