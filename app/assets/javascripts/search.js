$(document).ready(function() {
  function getRand(min, max) {
    return Math.random() * (max - min) + min;
  };
  var badgeScans = gon.badge_scans;
  var doorCoords = {"Atrium Door (In)": {x: 260, y: 360, fill: "green"},
                    "Back Door (In)": {x: 765, y: 215, fill: "red"},
                    "Front Door (In)": {x: 50, y: 725, fill: "purple"},
                    "Knoll Door (In)": {x: 50, y: 300, fill: "blue"}};
  var compCoords = {"gSchool": {x: 870, y: 390},
                    "Roximity": {x: 550, y: 100},
                     "Uber": {x: 460, y: 100},
                     "ThoughtBot": {x: 460, y: 180},
                     "Pivotal Labs": {x: 550, y: 180},
                     "Active Junky": {x: 350, y: 170},
                     "Knoll": {x: 200, y: 100},
                     "Gather Employee": {x: 250, y: 600},
                     "GoSpotCheck": {x: 360, y: 670},
                     "One Reach": {x: 470, y: 670},
                     "Slice of Lime": {x: 565, y: 670},
                     "Support Local": {x: 670, y: 670},
                     "Rentbits": {x: 830, y: 670},
                     "Closely": {x: 870, y: 510}}

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
      
      var xValue = getRand(660, 440);
      var yValue = getRand(380, 280);

      var scanDate = new Date(scan.scan_time);

      $("#current-object").find(".data-entry").text(scan.door);
      $("#current-object").find(".data-entrant").text((scan.first_name + " " + scan.last_name));
      $("#current-object").find(".data-time").text(scanDate.toDateString());
      $("#current-object").find(".data-company").text(scan.company);

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
      $(".current-title").text("Most Recent Badge Scan");
      $('#svg-cover').show();
      $('#svg-again').show();
    };
  };

  $('#svg-start').on('click', function(){
    $('#svg-cover').hide();
    this.remove();
    $(".current-title").text("Current Badge Scan");
    getNext();
  });

  // $('#svg-again').on('click', function(){
  //   $('#svg-again').hide();
  //   $('#svg-cover').hide();
  //   getNext();
  // });
});