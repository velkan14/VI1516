   

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
	
	      
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-36251023-1']);
    _gaq.push(['_setDomainName', 'jqueryscript.net']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

    
//menu clicks
	
	function showMap() {
      if (document.getElementById("mapvis").style.display == "none"){
        document.getElementById("mapvis").style.display = "block";
		document.getElementById("chordvis").style.display = "none";
		document.getElementById("treevis").style.display = "none";}

        else{
          document.getElementById("mapvis").style.display = "none";
        }};


    function showChord() {
      if (document.getElementById("chordvis").style.display == "none"){
        document.getElementById("chordvis").style.display = "block";
		document.getElementById("mapvis").style.display = "none";
		document.getElementById("treevis").style.display = "none";}

        else{
          document.getElementById("chordvis").style.display = "none";
        }};
		
    function showTree() {
      if (document.getElementById("treevis").style.display == "none"){
        document.getElementById("treevis").style.display = "block";
		document.getElementById("mapvis").style.display = "none";
		document.getElementById("chordvis").style.display = "none";}
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
 