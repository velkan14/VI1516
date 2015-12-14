
function genBars(){

//Chamada incial á funcao que processa o ficheiro e o apresenta
bars("prt", 2000, 2013);






function bars(vis_title, years2, years)
{
//CAREFULL
//d3.select("#countryvis").select("svg").remove();


  var country,
      headerNames,
      top1,top2,top3,
      top4,top5,val1,
      val2,val3,val4,val5;

  //O nome do ficheiro csv a ler
  var fileName = "data/tops/1993.csv";

  d3.csv(fileName, function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  var data = [];
  data[0] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/1994.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[1] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/1995.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[2] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/1996.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[3] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/1997.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[4] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/1998.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[5] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/1999.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[6] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/2000.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[7] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/2001.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[8] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/2002.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[9] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/2003.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[10] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/2004.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[11] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/2005.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[12] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/2006.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[13] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/2007.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[14] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/2008.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[15] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/2009.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[16] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/2010.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[17] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/2011.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[18] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/2012.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[19] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  d3.csv("data/tops/2013.csv", function(error, d) {

      headerNames = d3.keys(d[0]);
      matchedRow  = d.filter(function(d) { return d.country == vis_title; });

      country =   matchedRow[0].country;
      top1    =  +matchedRow[0].top1;
      top2    =  +matchedRow[0].top2;
      top3    =  +matchedRow[0].top3;
      top4    =  +matchedRow[0].top4;
      top5    =  +matchedRow[0].top5;
      val1    = (+matchedRow[0].val1).toFixed(2);//4 casas decimais
      val2    = (+matchedRow[0].val2).toFixed(2);
      val3    = (+matchedRow[0].val3).toFixed(2);
      val4    = (+matchedRow[0].val4).toFixed(2);
      val5    = (+matchedRow[0].val5).toFixed(2);

  var returnedArray = [top1, top2, top3, top4, top5, val1, val2, val3, val4, val5];

  data[20] =
  {
    labels: [ top1, top2, top3, top4, top5  ],
    series:
    [
      {
        label: years,
        values: [returnedArray[5],returnedArray[6],returnedArray[7],returnedArray[8],returnedArray[9]]
      },
    ]
  };

  rangeBars(data, years, years2);

   });});});});});});});});});});});});});});});});});});});});
});






function zipData(data){
  var zippedData = [];
  for (var i=0; i<data.labels.length; i++) {
  for (var j=0; j<data.series.length; j++) {
    zippedData.push(data.series[j].values[i]);
  }
}
return zippedData;
}


function rangeBars(input, years, years2){

data = input[years-1993];
data2 = input[years2-1993];



var m = d3.map();

m.set("ago","Angola"); m.set("bdi","Burundi"); m.set("ben","Benin"); m.set("bfa","Burkina Faso"); m.set("bwa","Botswana"); m.set("caf","Central African Republic"); m.set("civ","Cote d'Ivoire"); m.set("cmr","Cameroon"); m.set("cod","Democratic Republic of the Congo"); m.set("cog","Republic of the Congo"); m.set("com","Comoros"); m.set("cpv","Cape Verde"); m.set("dji","Djibouti"); m.set("dza","Algeria"); m.set("egy","Egypt"); m.set("eri","Eritrea"); m.set("esh","Western Sahara"); m.set("eth","Ethiopia"); m.set("gab","Gabon"); m.set("gha","Ghana"); m.set("gin","Guinea"); m.set("gmb","Gambia"); m.set("gnb","Guinea-Bissau"); m.set("gnq","Equatorial Guinea"); m.set("ken","Kenya"); m.set("lbr","Liberia"); m.set("lby","Libya"); m.set("lso","Lesotho"); m.set("mar","Morocco"); m.set("mdg","Madagascar"); m.set("mli","Mali"); m.set("moz","Mozambique"); m.set("mrt","Mauritania"); m.set("mus","Mauritius"); m.set("mwi","Malawi"); m.set("myt","Mayotte"); m.set("nam","Namibia"); m.set("ner","Niger"); m.set("nga","Nigeria"); m.set("reu","Reunion"); m.set("rwa","Rwanda"); m.set("sdn","Sudan"); m.set("sen","Senegal"); m.set("shn","Saint Helena"); m.set("sle","Sierra Leone"); m.set("som","Somalia"); m.set("ssd","South Sudan"); m.set("stp","Sao Tome and Principe"); m.set("swz","Swaziland"); m.set("syc","Seychelles"); m.set("tcd","Chad"); m.set("tgo","Togo"); m.set("tun","Tunisia"); m.set("tza","Tanzania"); m.set("uga","Uganda"); m.set("zaf","South Africa"); m.set("zmb","Zambia"); m.set("zwe","Zimbabwe"); m.set("ata","Antarctica"); m.set("atf","French South Antarctic Territory"); m.set("bvt","Bouvet Island"); m.set("hmd","Heard Island and McDonald Islands"); m.set("sgs","South Georgia South Sandwich Islands"); m.set("afg","Afghanistan"); m.set("are","United Arab Emirates"); m.set("arm","Armenia"); m.set("aze","Azerbaijan"); m.set("bgd","Bangladesh"); m.set("bhr","Bahrain"); m.set("brn","Brunei"); m.set("btn","Bhutan"); m.set("cck","Cocos (Keeling) Islands"); m.set("chn","China"); m.set("cxr","Christmas Island"); m.set("cyp","Cyprus"); m.set("geo","Georgia"); m.set("hkg","Hong Kong"); m.set("idn","Indonesia"); m.set("ind","India"); m.set("iot","British Indian Ocean Territory"); m.set("irn","Iran"); m.set("irq","Iraq"); m.set("isr","Israel"); m.set("jor","Jordan"); m.set("jpn","Japan"); m.set("kaz","Kazakhstan"); m.set("kgz","Kyrgyzstan"); m.set("khm","Cambodia"); m.set("kor","South Korea"); m.set("kwt","Kuwait"); m.set("lao","Laos"); m.set("lbn","Lebanon"); m.set("lka","Sri Lanka"); m.set("mac","Macau"); m.set("mdv","Maldives"); m.set("mid","Midway"); m.set("mmr","Burma"); m.set("mng","Mongolia"); m.set("mys","Malaysia"); m.set("npl","Nepal"); m.set("omn","Oman"); m.set("pak","Pakistan"); m.set("phl","Philippines"); m.set("prk","North Korea"); m.set("pse","Palestine"); m.set("qat","Qatar"); m.set("sau","Saudi Arabia"); m.set("sgp","Singapore"); m.set("syr","Syria"); m.set("tha","Thailand"); m.set("tjk","Tajikistan"); m.set("tkm","Turkmenistan"); m.set("tls","Timor-Leste"); m.set("tur","Turkey"); m.set("twn","Taiwan"); m.set("uzb","Uzbekistan"); m.set("vnm","Vietnam"); m.set("yar","Yemen Arab Republic"); m.set("yem","Yemen"); m.set("ymd","Democratic Yemen"); m.set("alb","Albania"); m.set("and","Andorra"); m.set("aut","Austria"); m.set("bel","Belgium"); m.set("bgr","Bulgaria"); m.set("bih","Bosnia and Herzegovina"); m.set("blr","Belarus"); m.set("blx","Belgium-Luxembourg"); m.set("che","Switzerland"); m.set("chi","Channel Islands"); m.set("csk","Czechoslovakia"); m.set("cze","Czech Republic"); m.set("ddr","Democratic Republic of Germany"); m.set("deu","Germany"); m.set("dnk","Denmark"); m.set("esp","Spain"); m.set("est","Estonia"); m.set("fdr","Federal Republic of Germany"); m.set("fin","Finland"); m.set("fra","France"); m.set("fro","Faroe Islands"); m.set("gbr","United Kingdom"); m.set("gib","Gibraltar"); m.set("grc","Greece"); m.set("hrv","Croatia"); m.set("hun","Hungary"); m.set("imn","Isle of Man"); m.set("irl","Ireland"); m.set("isl","Iceland"); m.set("ita","Italy"); m.set("ksv","Kosovo"); m.set("lie","Liechtenstein"); m.set("ltu","Lithuania"); m.set("lux","Luxembourg"); m.set("lva","Latvia"); m.set("mco","Monaco"); m.set("mda","Moldova"); m.set("mkd","Macedonia"); m.set("mlt","Malta"); m.set("mne","Montenegro"); m.set("nld","Netherlands"); m.set("nor","Norway"); m.set("pol","Poland"); m.set("prt","Portugal"); m.set("rou","Romania"); m.set("rus","Russia"); m.set("scg","Serbia and Montenegro"); m.set("sjm","Svalbard"); m.set("smr","San Marino"); m.set("srb","Serbia"); m.set("sun","USSR"); m.set("svk","Slovakia"); m.set("svn","Slovenia"); m.set("swe","Sweden"); m.set("ukr","Ukraine"); m.set("vat","Holy See (Vatican City)"); m.set("yug","Yugoslavia"); m.set("abw","Aruba"); m.set("aia","Anguilla"); m.set("ant","Netherlands Antilles"); m.set("atg","Antigua and Barbuda"); m.set("bes","Bonaire"); m.set("bhs","Bahamas"); m.set("blm","Saint Barth√©lemy"); m.set("blz","Belize"); m.set("bmu","Bermuda"); m.set("brb","Barbados"); m.set("can","Canada"); m.set("cri","Costa Rica"); m.set("cub","Cuba"); m.set("cuw","Cura√ßao"); m.set("cym","Cayman Islands"); m.set("dma","Dominica"); m.set("dom","Dominican Republic"); m.set("grd","Grenada"); m.set("grl","Greenland"); m.set("gtm","Guatemala"); m.set("hnd","Honduras"); m.set("hti","Haiti"); m.set("jam","Jamaica"); m.set("kna","Saint Kitts and Nevis"); m.set("lca","Saint Lucia"); m.set("maf","Saint Maarten"); m.set("mex","Mexico"); m.set("msr","Montserrat"); m.set("mtq","Martinique"); m.set("naa","Netherland Antilles and Aruba"); m.set("nic","Nicaragua"); m.set("pan","Panama"); m.set("pci","Pacific Island (US)"); m.set("pcz","Panama Canal Zone"); m.set("pri","Puerto Rico"); m.set("slv","El Salvador"); m.set("spm","Saint Pierre and Miquelon"); m.set("tca","Turks and Caicos Islands"); m.set("tto","Trinidad and Tobago"); m.set("umi","United States Minor Outlying Islands"); m.set("usa","United States"); m.set("vct","Saint Vincent and the Grenadines"); m.set("vgb","British Virgin Islands"); m.set("vir","Virgin Islands"); m.set("asm","American Samoa"); m.set("aus","Australia"); m.set("cok","Cook Islands"); m.set("fji","Fiji"); m.set("fsm","Micronesia"); m.set("glp","Guadeloupe"); m.set("gum","Guam"); m.set("kir","Kiribati"); m.set("mhl","Marshall Islands"); m.set("mnp","Northern Mariana Islands"); m.set("ncl","New Caledonia"); m.set("nfk","Norfolk Island"); m.set("niu","Niue"); m.set("nru","Nauru"); m.set("nzl","New Zealand"); m.set("pcn","Pitcairn Islands"); m.set("plw","Palau"); m.set("png","Papua New Guinea"); m.set("pyf","French Polynesia"); m.set("slb","Solomon Islands"); m.set("tkl","Tokelau"); m.set("ton","Tonga"); m.set("tuv","Tuvalu"); m.set("vut","Vanuatu"); m.set("wlf","Wallis and Futuna"); m.set("wsm","Samoa"); m.set("arg","Argentina"); m.set("bol","Bolivia"); m.set("bra","Brazil"); m.set("chl","Chile"); m.set("col","Colombia"); m.set("ecu","Ecuador"); m.set("flk","Falkland Islands"); m.set("guf","French Guiana"); m.set("guy","Guyana"); m.set("per","Peru"); m.set("pry","Paraguay"); m.set("sur","Suriname"); m.set("ury","Uruguay"); m.set("ven","Venezuela"); m.set("wld","World"); m.set("xxa","Areas");

var p = d3.map();

p.set("0","Food and live animals"); p.set("0","Live animals other than animals of division 03"); p.set("1","Meat and meat preparations"); p.set("2","Dairy products and birdsí eggs"); p.set("3","Fish (not marine mammals), crustaceans, molluscs and aquatic invertebrates, and preparations thereof"); p.set("4","Cereals and cereal preparations"); p.set("5","Vegetables and fruit"); p.set("6","Sugars, sugar preparations and honey"); p.set("7","Coffee, tea, cocoa, spices, and manufactures thereof"); p.set("8","Feeding stuff for animals (not including unmilled cereals)"); p.set("9","Miscellaneous edible products and preparations"); p.set("1","Beverages and tobacco"); p.set("11","Beverages"); p.set("12","Tobacco and tobacco manufactures"); p.set("2","Crude materials, inedible, except fuels"); p.set("21","Hides, skins and furskins, raw"); p.set("22","Oil-seeds and oleaginous fruits"); p.set("23","Crude rubber (including synthetic and reclaimed)"); p.set("24","Cork and wood"); p.set("25","Pulp and waste paper"); p.set("26","Textile fibres (other than wool tops and other combed wool) and their wastes (not manufactured into yarn or fabric)"); p.set("27","Crude fertilizers, other than those of Division 56, and crude minerals (excluding coal, petroleum and precious stones)"); p.set("28","Metalliferous ores and metal scrap"); p.set("29","Crude animal and vegetable materials, n.e.s."); p.set("3","Mineral fuels, lubricants and related materials"); p.set("32","Coal, coke and briquettes"); p.set("33","Petroleum, petroleum products and related materials"); p.set("34","Gas, natural and manufactured"); p.set("35","Electric current"); p.set("4","Animal and vegetable oils, fats and waxes"); p.set("41","Animal oils and fats"); p.set("42","Fixed vegetable fats and oils, crude, refined or fractionated"); p.set("43","Animal or vegetable fats and oils, processed; waxes of animal or vegetable origin; inedible mixtures or preparations of animal or vegetable fats or oils, n.e.s."); p.set("5","Chemicals and related products, n.e.s."); p.set("51","Organic chemicals"); p.set("52","Inorganic chemicals"); p.set("53","Dyeing, tanning and colouring materials"); p.set("54","Medicinal and pharmaceutical products"); p.set("55","Essential oils and resinoids and perfume materials; toilet, polishing and cleansing preparations"); p.set("56","Fertilizers (other than those of group 272)"); p.set("57","Plastics in primary forms"); p.set("58","Plastics in non-primary forms"); p.set("59","Chemical materials and products, n.e.s."); p.set("6","Manufactured goods classified chiefly by material"); p.set("61","Leather, leather manufactures, n.e.s., and dressed furskins"); p.set("62","Rubber manufactures, n.e.s."); p.set("63","Cork and wood manufactures (excluding furniture)"); p.set("64","Paper, paperboard and articles of paper pulp, of paper or of paperboard"); p.set("65","Textile yarn, fabrics, made-up articles, n.e.s., and related products"); p.set("66","Non-metallic mineral manufactures, n.e.s."); p.set("67","Iron and steel"); p.set("68","Non-ferrous metals"); p.set("69","Manufactures of metals, n.e.s."); p.set("7","Machinery and transport equipment"); p.set("71","Power-generating machinery and equipment"); p.set("72","Machinery specialized for particular industries"); p.set("73","Metalworking machinery"); p.set("74","General industrial machinery and equipment, n.e.s., and machine parts, n.e.s."); p.set("75","Office machines and automatic data-processing machines"); p.set("76","Telecommunications and sound-recording and reproducing apparatus and equipment"); p.set("77","Electrical machinery, apparatus and appliances, n.e.s., and electrical parts thereof (including non-electrical counterparts, n.e.s., of electrical household-type equipment)"); p.set("78","Road vehicles (including air-cushion vehicles)"); p.set("79","Other transport equipment"); p.set("8","Miscellaneous manufactured articles"); p.set("81","Prefabricated buildings; sanitary, plumbing, heating and lighting fixtures and fittings, n.e.s."); p.set("82","Furniture and parts thereof; bedding, mattresses, mattress supports, cushions and similar stuffed furnishings"); p.set("83","Travel goods, handbags and similar containers"); p.set("84","Articles of apparel and clothing accessories"); p.set("85","Footwear"); p.set("87","Professional, scientific and controlling instruments and apparatus, n.e.s."); p.set("88","Photographic apparatus, equipment and supplies and optical goods, n.e.s.; watches and clocks"); p.set("89","Miscellaneous manufactured articles, n.e.s."); p.set("9","Commodities and transactions not classified elsewhere in the SITC"); p.set("91","Postal packages not classified according to kind"); p.set("93","Special transactions and commodities not classified according to kind"); p.set("96","Coin (other than gold coin), not being legal tender"); p.set("97","Gold, non-monetary (excluding gold ores and concentrates)");




var chartWidth       = 300,
    barHeight        = 40,
    groupHeight      = barHeight * 10,
    gapBetweenGroups = 30,
    spaceForLabels   = 500,
    spaceForTitle    = 100,
    marginWidth      = 0,
    marginHeight     = 130,
    titleX           = 290,
    titleY           = -110;

var svg = d3.select("#rankvis").append("svg")
    .attr("class", "chartBar")
    .attr("width", marginWidth + chartWidth)
    .attr("height", marginHeight + groupHeight)
    .attr("transform", "translate(" + marginWidth + "," + marginHeight + ")");


d3.select("body").append("chartArea").append("select").attr("class", "demoSelection");
d3.select("body").append("chartArea2").append("select").attr("class", "demoSelection2");




labels = ["1993","1994","1995","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
options = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];



sel1 = d3.select(".demoSelection2")
    .style("visibility", "hidden")
    .selectAll("option")
    .data(options)
    .enter()
    .append("option")
    // Provide available text for the dropdown options
    .text(function(d) {return labels[d];});
sel2 = d3.select(".demoSelection")
    .style("visibility", "hidden")
    .selectAll("option")
    .data(options)
    .enter()
    .append("option")
    // Provide available text for the dropdown options
    .text(function(d) {return labels[d];});




// Zip the series data together (first values, second values, etc.)
zippedData = zipData(data);
zippedData2 = zipData(data2);

// Color scale
var color = d3.scale.category20();
var chartHeight = barHeight * 10 + gapBetweenGroups * 10;


maxX = d3.max(zippedData);
maxXX = d3.max(zippedData2);

max = Math.max(maxX, maxXX);

var x = d3.scale.linear()
    .domain([0, max])
    .range([0, 300]);



var y = d3.scale.linear()
    .range([chartHeight/2 + gapBetweenGroups/2, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat('')
    .tickSize(0)
    .orient("left");



// Specify the chart area and dimensions
var chartBar = d3.select(".chartBar")
    .attr("width", spaceForLabels + chartWidth)
    .attr("height", chartHeight + marginHeight);// + espaco para o titulo

// Create bars
var bar = chartBar.selectAll("g")
    .data(zippedData)
    .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
    });


var bar2 = chartBar.selectAll("g2")
    .data(zippedData2)
    .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(" + spaceForLabels + "," + (barHeight-1 +(i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data2.series.length)))) + ") rotate(180)";

    });



var div = d3.select("#rankvis").append("div")
         .attr("class", "tooltip")
        .style("opacity", 0);



// Create rectangles of the correct width
bar.append("rect")
    .attr("fill", function(d,i) { return color(i % data.series.length); })
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar2v = bar2.append("rect")
    .attr("fill", function(d,i) { return color(i % data2.series.length); })
    .attr("class", "bar2")
    .attr("width", x)
    .attr("height", barHeight - 1)
    .style("visibility", "hidden");



// LABEL IN BAR

bar.append("text")
    .attr("class", "insideText")
    .attr("x", 10)
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .style("font-size", "14px")//Tamanho do texto dentro das barras
    .style("fill", "white")
    .text(function(d) { return "$"+d+"MM"; });

insideText2 = bar2.append("text")
    .data(zippedData2)
    .attr("class", "insideText2")
    .attr("x", 0)
    .attr("y", barHeight / 2 + 20)
    .attr("dy", ".35em")
    .attr("transform", function(d, i) {
      return "translate(10,60) rotate(180)";
    })
    .style("visibility", "hidden")
    .style("text-anchor", "end")
    .style("font-size", "14px")//Tamanho do texto dentro das barras
    .style("fill", "white")
    .text(function(d) { return "$"+d+"MM"; });


// LABEL

bar.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return 20; })
    .attr("y", -12)
    .attr("dy", ".35em")
    .text(function(d,i) {
      if (i % data.series.length === 0)
        return p.get(data.labels[Math.floor(i/data.series.length)]).substring(0,12)+'...';
      else
        return ""})
        .on("mouseover", function(d, i) {
                div.transition()
                .duration(200)
                .style("opacity", .9);
                div.html(p.get(data.labels[Math.floor(i/data.series.length)]))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("opacity", 1);
              })
        .on("mouseout", function(d) {
                div.transition()
                .duration(200)
                .style("opacity", 0);
        });


label2 = bar.append("text")
    .attr("class", "label2")
    .attr("x", function(d) { return -130  ; })
    .attr("y", -12)
    .attr("dy", ".35em")
    .style("visibility", "hidden")
    .text(function(d,i) {
      if (i % data2.series.length === 0)
        return p.get(data2.labels[Math.floor(i/data2.series.length)]).substring(0,12)+'...';
      else
        return ""})
        .on("mouseover", function(d, i) {
                div.transition()
                .duration(200)
                .style("opacity", .9);
                div.html(p.get(data2.labels[Math.floor(i/data2.series.length)]))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("opacity", 1);
              })
        .on("mouseout", function(d) {
                div.transition()
                .duration(200)
                .style("opacity", 0);
        });





// VERTICAL LINE

chartBar.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
      .call(yAxis);






//Titulo

chartBar.append("text")
      .attr("class", "titleCountry")
      .attr("x", titleX + 200)
      .attr("y", titleY+25)
      .style("fill", "black")
      .style("font", "40px sans-serif")
      .style("text-anchor", "middle")
      .text(m.get(vis_title));






titleYear2 = chartBar.append("text")
    .attr("class", "titleYear2")
    .attr("x", titleX + 20)
    .attr("y", titleY +40)
    .attr("text-anchor", "middle")
    .text("+Add")
    .on("click", function(d) {
         d3.select(".demoSelection").style("visibility", "visible");
         bar2v.style("visibility", "visible");
         insideText2.style("visibility", "visible");
         label2.style("visibility", "visible");
         titleClose.style("visibility", "visible");
         titleYear2.style("visibility", "hidden")
    });

titleClose = chartBar.append("text")
    .attr("class", "titleClose")
    .attr("x", titleX -30)
    .attr("y", titleY +400)
    .attr("visibility", "hidden")
    .attr("text-anchor", "middle")
    .text("Click to hide")
    .on("click", function(d) {
         titleYear2.text("+Add")
         .style("visibility", "visible")
         bar2v.style("visibility", "hidden");
         insideText2.style("visibility", "hidden");
         label2.style("visibility", "hidden");
         titleClose.style("visibility", "hidden");
         d3.select(".demoSelection")
         .style("visibility", "hidden")
    });






d3.select(".demoSelection")
    .on("click", function() {


      key = this.selectedIndex;

      years2 = 1993 +key;

        zippedData2 = zipData(input[years2-1993]);


         maxX = d3.max(zippedData);
maxXX = d3.max(zippedData2);

max = Math.max(maxX, maxXX);

var x2 = d3.scale.linear()
    .domain([0, max])
    .range([0, 300]);

           bar2v
               .data(zippedData2)

               .each(function(d, i) {
                d3.select(this).transition().delay(100).attr("width", x2(zippedData2[i]));
                });


        insideText2
            .each(function(d, i) {
                d3.select(this).text("$"+zippedData2[i]+"MM");
            });

        label2
            .each(function(d, i) {
                d3.select(this).text(p.get(input[years-1993].labels[i]).substring(0,12)+'...');
            });

        titleYear2
            .each(function(d, i) {
                d3.select(this).text(years2);
            });
     });







d3.select(".demoSelection2")
    .on("change", function() {

key = this.selectedIndex;


      years = 1993+key;
        zippedData = zipData(input[years-1993]);


maxX = d3.max(zippedData);
maxXX = d3.max(zippedData2);

max = Math.max(maxX, maxXX);
var x2 = d3.scale.linear()
    .domain([0, max])
    .range([0, 300]);


           svg.selectAll("g").select("rect")
               .data(zippedData)

               .each(function(d, i) {
                d3.select(this).transition().delay(100).attr("width", x2(zippedData[i]));
                });


        svg.selectAll("g").select("text.insideText")
            .each(function(d, i) {
                d3.select(this).text("$"+zippedData[i]+"MM");
            });

        svg.selectAll("g").select("text.label")
            .each(function(d, i) {
                d3.select(this).text(p.get(input[years-1993].labels[i]).substring(0,12)+'...');
            });

        svg.select("text.titleYear")
            .each(function(d, i) {
                d3.select(this).text(years);
            });
     });




}









};}
