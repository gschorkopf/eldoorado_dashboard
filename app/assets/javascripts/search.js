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
      var scanCircle = svgContainer.selectAll("circle.scan")
        .data([scan], function(d) { return d.scan_time });

      scanCircle.exit().remove();
      
      scanCircle
        .enter()
        .append('circle')
        .attr('class', 'scan')
        .attr('r', 20)
        .text(function(d){return d.first_name;})
        .attr("cx", function(d){
        console.log("entered through door: " + d.door + " at " + d.scan_time);
        return doorCoords[d.door].x;
        })
        .attr("cy", function(d){return doorCoords[d.door].y;})
        .style("fill", function(d){return doorCoords[d.door].fill;})
        .transition()
        .duration(1000)
        .attr("cx", function(d){return compCoords[d.company].x;})
        .attr("cy", function(d){return compCoords[d.company].y;})

      window.setTimeout(getNext, 2000);

      index++;
    };
  };

  getNext();
});