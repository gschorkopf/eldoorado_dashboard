$(document).ready(function() {
  function getRand(min, max) {
    return Math.random() * (max - min) + min;
  };
  var badgeScans = gon.badge_scans;
  var doorCoords = {"Atrium Door (In)": {x: 260, y: 360, fill: "green"},
                    "Back Door (In)": {x: 765, y: 215, fill: "red"},
                    "Front Door (In)": {x: 50, y: 725, fill: "purple"},
                    "Knoll Door (In)": {x: 50, y: 300, fill: "blue"}};
  var compCoords = {"gSchool": {x: 300, y: 500},
                    "Roximity": {x: 800, y: 200}}

  var svgContainer = d3.select("#svg");
  var index = 0;
  var scan = null;

  function getNext() {
    scan = badgeScans[index];
    console.log("got scan " + scan);
 
    if (scan) {
      var scanAction = svgContainer.selectAll("g")
        .data([scan], function(d){return d.scan_time});
 
      scanAction.exit().remove();
 
      var group = scanAction
        .enter()
        .append("g");
      
      var xValue = getRand(500, 200);
      var yValue = getRand(500, 200);

      // set up and transition the circle
      group
        .append('circle')
        .attr('class', 'scan')
        .attr('r', 30)
        .style("fill", "white")
        .attr("stroke", function(d){return doorCoords[d.door].fill;})
        .attr("stroke-width", 5)
        .attr("cx", function(d){return doorCoords[d.door].x;})
        .attr("cy", function(d){return doorCoords[d.door].y;})
        .transition()
        .duration(1000)
        .attr("cx", function(d){
          if (compCoords[d.company]){
            return compCoords[d.company].x;
          } else {
            return xValue;
          };})
        .attr("cy", function(d){
          if (compCoords[d.company]){
            return compCoords[d.company].y;
          } else {
            return yValue;
          };});
 
      // set up and transition the text
      group
        .append("text")
        .attr('class', 'scan')
        .text(function(d){return d.first_name})
        .attr("alignment-baseline", "middle")
        .attr("text-anchor", "middle")
        .attr("x", function(d){return doorCoords[d.door].x;})
        .attr("y", function(d){return doorCoords[d.door].y;})
        .transition()
        .duration(1000)
        .attr("x", function(d){
          if (compCoords[d.company]){
            return compCoords[d.company].x;
          } else {
            return xValue;
          };})
        .attr("y", function(d){
          if (compCoords[d.company]){
            return compCoords[d.company].y;
          } else {
            return yValue;
          };});
 
      window.setTimeout(getNext, 2000);
      index++;
    } else {
      svgContainer.selectAll("g").remove();
      svgContainer.selectAll("text").remove();
      $('#svg-cover').show();
      $('#svg-again').show();
    };
  };

  $('#svg-start').on('click', function(){
    $('#svg-cover').hide();
    this.remove();
    getNext();
  });

  // $('#svg-again').on('click', function(){
  //   $('#svg-again').hide();
  //   $('#svg-cover').hide();
  //   getNext();
  // });
});