$(document).ready(function() {
  // var badgeScans = gon.badge_scans;
  // debugger
  var badgeScans = [{company: "Student",
                    door: "Atrium Door (In)",
                    first_name: "Geoffrey",
                    guest: false,
                    last_name: "Schorkopf",
                    scan_time: "11111"},
                    {company: "Roximity",
                    door: "Front Door (In)",
                    first_name: "Geoffrey",
                    guest: false,
                    last_name: "Schorkopf",
                    scan_time: "22222"},
                    {company: "gSchool",
                    door: "Back Door (In)",
                    first_name: "Geoffrey",
                    guest: false,
                    last_name: "Schorkopf",
                    scan_time: "33333"}
                    ];

  
  var doorCoords = {"Atrium Door (In)": {x: 260, y: 360, fill: "green"},
                    "Back Door (In)": {x: 765, y: 215, fill: "red"},
                    "Front Door (In)": {x: 50, y: 725, fill: "purple"}};
                    // {x: 50, y: 300, door: "Knoll Door (In)", fill: "blue"}];
  var compCoords = {"Student": {x: 400, y: 400},
                    "gSchool": {x: 300, y: 500},
                    "Roximity": {x: 800, y: 200}};

  var svgContainer = d3.select("#svg");

  // var doors = svgContainer
  //   .selectAll("circle")
  //   .data(doorCoords);
  
  // doors.enter()
  //   .append("circle")
  //   .text(function(d){return d.door})
  //   .attr("cx", function(d){return d.x;})
  //   .attr("cy", function(d){return d.y;})
  //   .attr("r", 15)
  //   .style("fill", function(d){return d.fill;});

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
        console.log("entered through door: " + d.door);
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