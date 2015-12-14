function gen_map(){

var feature;
var data1;
var data2;

var projection = d3.geo.azimuthal()
    .scale(230)
    .origin([-71.03,42.37])
    .mode("orthographic")
    .translate([250, 250]);

var circle = d3.geo.greatCircle()
    .origin(projection.origin());

// TODO fix d3.geo.azimuthal to be consistent with scale
var scale = {
  orthographic: 230,
  stereographic: 380,
  gnomonic: 380,
  equidistant: 380 / Math.PI * 2,
  equalarea: 380 / Math.SQRT2
};

var path = d3.geo.path()
    .projection(projection);

var svg1 = d3.select("#mapvis").append("svg:svg")
    .attr("width", 500)
    .attr("height", 500)
    .on("mousedown", mousedown);

d3.json("data/world_countries.json", function(collection) {
  feature = svg1.selectAll("path")
      .data(collection.features)
    .enter().append("svg:path")
      .attr("d", clip);

  feature.append("svg:title")
      .text(function(d) { return d.properties.name; });
});

/*
d3.csv("data/CountryPositions.csv", function(d1) {
  data1 = d1;

  //probably won't be used


});


d3.csv("data/Trade_Partners.csv", function(d2) {
  data2 = d2;


  d3.csv("tops/1997.csv", function(error, data) {
  headerNames = d3.keys(data[0]);
  matchedRow = data.filter(function(d) { return d.country == countryToDisplay; });
  country = matchedRow[0].country;
  top1 = +matchedRow[0].top1;
  top2 = +matchedRow[0].top2;
  top3 = +matchedRow[0].top3;
  top4 = +matchedRow[0].top4;
  top5 = +matchedRow[0].top5;
  val1 = (+matchedRow[0].val1).toFixed(4);
  val2 = (+matchedRow[0].val2).toFixed(4);
  val3 = (+matchedRow[0].val3).toFixed(4);
  val4 = (+matchedRow[0].val4).toFixed(4);
  val5 = (+matchedRow[0].val5).toFixed(4);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];
     rangeBars(returnedArray);
});

  svg.selectAll("path")
      .data(data2.origin)
    .enter().append("svg:path")
      .on("Click", function() {

		var x = {};
		x.add(data2.destination);
		//on country click,  reset map to original color, color clicked country in orange abd color partners (data2.destination) in black;

      })
});

*/

d3.select(window)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup);

/*d3.select("select").on("change", function() {
  projection.mode(this.value).scale(scale[this.value]);
  refresh(750);
});*/

var m0,
    o0;

function mousedown() {
  m0 = [d3.event.pageX, d3.event.pageY];
  o0 = projection.origin();
  d3.event.preventDefault();
}

function mousemove() {
  if (m0) {
    var m1 = [d3.event.pageX, d3.event.pageY],
        o1 = [o0[0] + (m0[0] - m1[0]) / 8, o0[1] + (m1[1] - m0[1]) / 8];
    projection.origin(o1);
    circle.origin(o1)
    refresh();
  }
}

function mouseup() {
  if (m0) {
    mousemove();
    m0 = null;
  }
}

function refresh(duration) {
  (duration ? feature.transition().duration(duration) : feature).attr("d", clip);
}

function clip(d) {
  return path(circle.clip(d));
}

}
