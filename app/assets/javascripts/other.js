// function getNext() {
//     scan = badgeScans[index];
//     console.log("got scan " + scan);

//     if (scan) {

//       var scanCircle = svgContainer.selectAll("circle.scan")
//       .data([scan], function(d) { return d.scan_time });

//       scanCircle.exit().remove();
//       scanCircle
//       .enter()
//       .append('circle')
//       .attr('class', 'scan')
//       .attr('r', 20)
//       .text(function(d){return d.first_name;})
//       .attr("cx", function(d){
//         console.log("entered through door: " + d.door + " at " + d.scan_time);
//         return doorCoords[d.door].x;
//       })
//       .attr("cy", function(d){return doorCoords[d.door].y;})
//       .style("fill", function(d){return doorCoords[d.door].fill;})
//       .transition()
//       .duration(1000)
//       .attr("cx", function(d){return compCoords[d.company].x;})
//       .attr("cy", function(d){return compCoords[d.company].y;})

//       window.setTimeout(getNext, 2000);

//       index++;
//     };
//   };

  