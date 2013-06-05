$(document).ready(function() {
  var badgeScans = gon.badge_scans;
  var doorCoords = {"Atrium Door (In)": {x: 260, y: 360, fill: "green"},
                    "Back Door (In)": {x: 765, y: 215, fill: "red"},
                    "Front Door (In)": {x: 50, y: 725, fill: "purple"},
                    "Knoll Door (In)": {x: 50, y: 300, fill: "blue"}};
  var compCoords = {"Student": {x: 400, y: 400},
                    "gSchool": {x: 300, y: 500},
                    "Roximity": {x: 800, y: 200}};

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
 
      // set up and transition the circle
      group
        .append('circle')
        .attr('class', 'scan')
        .attr('r', 30)
        .style("fill", function(d){return doorCoords[d.door].fill;})
        .attr("cx", function(d){return doorCoords[d.door].x;})
        .attr("cy", function(d){return doorCoords[d.door].y;})
        .transition()
        .duration(1000)
        .attr("cx", function(d){return compCoords[d.company].x;})
        .attr("cy", function(d){return compCoords[d.company].y;});
 
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
        .attr("x", function(d){return compCoords[d.company].x;})
        .attr("y", function(d){return compCoords[d.company].y;});
 
      window.setTimeout(getNext, 2000);
      index++;
    } else {
      alert("Mission complete")
      svgContainer.selectAll("g").remove();
    };
  };

  getNext();
});