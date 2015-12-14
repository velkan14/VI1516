 	//slider 
        $(function () {
          $("#range").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 1993,
            max: 2013,
            from: 1993,
            to: 2013,
            type: 'double',
            step: 1,
            drag_interval: true,
            grid: true,
            grid_num: 20
          });
        });
	
	      
//menu clicks
	
	function showMap() {
      if (document.getElementById("mapvis").style.display == "none"){
        document.getElementById("mapvis").style.display = "block";
		document.getElementById("intro").style.display = "none";
		document.getElementById("treevis").style.display = "none";}

        else{
          document.getElementById("mapvis").style.display = "none";
        }};


    function showIntro() {
      if (document.getElementById("intro").style.display == "none"){
        document.getElementById("intro").style.display = "block";
		document.getElementById("mapvis").style.display = "none";
		document.getElementById("treevis").style.display = "none";}

        else{
          document.getElementById("intro").style.display = "none";
        }};
		
    function showTree() {
      if (document.getElementById("treevis").style.display == "none"){
        document.getElementById("treevis").style.display = "block";
		document.getElementById("mapvis").style.display = "none";
		document.getElementById("intro").style.display = "none";}
        else{
          document.getElementById("treevis").style.display = "none";
        }};
		
		
		
		function showCountry() {
      if (document.getElementById("countryvis").style.display == "none"){
        document.getElementById("countryvis").style.display = "display";
		document.getElementById("productvis").style.display = "none";
		document.getElementById("rankvis").style.display = "none";}
        else{
          document.getElementById("countryvis").style.display = "none";
        }};

		
		
		function showProduct() {
      if (document.getElementById("productvis").style.display == "none"){
        document.getElementById("productvis").style.display = "block";
		document.getElementById("countryvis").style.display = "none";
		document.getElementById("rankvis").style.display = "none";}
        else{
          document.getElementById("productvis").style.display = "none";
        }};

		
		
		function showRank() {
      if (document.getElementById("rankvis").style.display == "none"){
        document.getElementById("rankvis").style.display = "block";
		document.getElementById("countryvis").style.display = "none";
		document.getElementById("productvis").style.display = "none";}
        else{
          document.getElementById("rankvis").style.display = "none";
        }};
 
// $(function () {
    // $('#search').on('keyup', function () {
        // var pattern = $(this).val();
        // $('.items-collection .items').hide();
        // $('.items-collection .items').filter(function () {
            // return $(this).text().match(new RegExp(pattern, 'i'));
        // }).show();
    // });
// });
 