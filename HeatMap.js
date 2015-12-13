
function genHeatMap(){
    var margin = { top: 30, right: 0, bottom: 100, left: 100 },
      width = 600 - margin.left - margin.right,
      height = 480 - margin.top - margin.bottom,
      gridSize = Math.floor(width / 21),
      legendElementWidth = gridSize*2,
      buckets = 9,
      colorsGreen = ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"],
      colorsRed = ["#fff5f0","#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
      days = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      times = ["'93", "'94", "'95", "'96", "'97", "'98", "'99", "'00", "'01", "'02", "'03", "'04", "'05", "'06", "'07", "'08", "'09", "'10", "'11", "'12", "'13"];
      datasets = ["FinalData1993.tsv", "FinalData1994.tsv", "FinalData1995.tsv","FinalData1996.tsv","FinalData1997.tsv","FinalData1998.tsv","FinalData1999.tsv","FinalData2000.tsv","FinalData2001.tsv","FinalData2002.tsv","FinalData2003.tsv","FinalData2004.tsv","FinalData2005.tsv","FinalData2006.tsv","FinalData2007.tsv","FinalData2008.tsv","FinalData2010.tsv","FinalData2011.tsv","FinalData2012.tsv","FinalData2013.tsv"];

      var origin = "prt";
      var destination = "ago";

      var selectOrigin  = d3.select("#heatmapvis").append("select").on("change", changeOrigin),
          optionsOrigin = selectOrigin.selectAll('option').data(data_names); // Data join
      // Enter selection
      optionsOrigin.enter().append("option").text(function(d) { return d.name; });

      var selectDestination  = d3.select("#heatmapvis").append("select").on("change", changeDestination),
          optionsDestination = selectDestination.selectAll('option').data(data_names); // Data join
      // Enter selection
      optionsDestination.enter().append("option").text(function(d) { return d.name; });

  var svg = d3.select("#heatmapvis").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var sitcLabels = svg.selectAll(".sitcLabel")
      .data(days)
      .enter().append("text")
        .text(function (d) { var s = getNameFromSitc(d); if(s.length > 13) return s.substring(0,10) + "..."; return s; })
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
          .attr("y", height - 115)
          .attr("width", legendElementWidth)
          .attr("height", gridSize / 2)
          .style("fill", function(d, i) { return colorsRed[i]; });

        legendImport.append("text")
          .attr("class", "mono")
          .text(function(d) { return "≥ " + (d/1000000000).toFixed(1); })
          .attr("x", function(d, i) { return legendElementWidth * i; })
          .attr("y", height + gridSize -100);

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
          .attr("y", height - 100)
          .attr("width", legendElementWidth)
          .attr("height", gridSize / 2)
          .style("fill", function(d, i) { return colorsGreen[i]; });

        legend.append("text")
          .attr("class", "mono")
          .text(function(d) { return "≥ " + (d/1000000000).toFixed(1); })
          .attr("x", function(d, i) { return legendElementWidth * i; })
          .attr("y", height + gridSize);

        legend.exit().remove();

      });
    };

    //heatmapChart("data/Bilateral/"+datasets[0], "prt", "and");
    heatmapChart("data/FinalData1.tsv", origin, destination);

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



      function changeOrigin() {
          var si   = selectOrigin.property('selectedIndex'),
              s    = optionsOrigin.filter(function (d, i) { return i === si }),
              data = s.datum();
              origin = data.id_3char;
              heatmapChart("data/FinalData1.tsv", origin, destination);
      }

      function changeDestination() {
          var si   = selectDestination.property('selectedIndex'),
              s    = optionsDestination.filter(function (d, i) { return i === si }),
              data = s.datum();
              destination = data.id_3char;
              heatmapChart("data/FinalData1.tsv", origin, destination);
      }


}
