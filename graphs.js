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
