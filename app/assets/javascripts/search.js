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
  var timeLapse = 0;

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
      var dateString = scanDate.toDateString() + ", " + scanDate.toTimeString().split(" ")[0]

      $("#current-object").find(".data-entry").text(scan.door);
      $("#current-object").find(".data-entrant").text((scan.first_name + " " + scan.last_name));
      $("#current-object").find(".data-time").text(dateString);
      $("#current-object").find(".data-company").text(scan.company);

      timeLapse = (gon.time_lapses[(index+1)]*5)

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
        .duration(timeLapse) //1000
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
        .duration(timeLapse) //1000
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
 
      
      window.setTimeout(getNext, (timeLapse*1.5)); //2000
      index++;
    } else {
      svgContainer.selectAll("g").remove();
      svgContainer.selectAll("text").remove();
      $("#timer").remove();
      $(".current-title").text("Most Recent Badge Scan");
      $('#svg-cover').show();
      $('#svg-again').show();
    };
  };

  $('#svg-start').on('click', function(){
    $('#svg-cover').hide();
    this.remove();
    $(".current-title").text("Currently Graphed Badge Scan");
    startClock(24852);
    getNext();
  });

  $('#svg-again').on('click', function(){
    index = 0;
    scan = null;
    badgeScans = gon.badge_scans;
    $('#svg-again').hide();
    $('#svg-cover').hide();
    $('#current-object').append('<div id="timer" class="pull-right"></div>');
    startClock(24852);
    getNext();
  });

  function get_elapsed_time_string(total_seconds) {
    function pretty_time_string(num) {
      return ( num < 10 ? "0" : "" ) + num;
    }

    var hours = Math.floor(total_seconds / 3600);
    total_seconds = total_seconds % 3600;

    var minutes = Math.floor(total_seconds / 60);
    total_seconds = total_seconds % 60;

    var seconds = Math.floor(total_seconds);

    // Pad the minutes and seconds with leading zeros, if required
    hours = pretty_time_string(hours);
    minutes = pretty_time_string(minutes);
    seconds = pretty_time_string(seconds);

    // Compose the string for display
    var currentTimeString = hours + ":" + minutes + ":" + seconds;

    return currentTimeString;
  };

  var elapsed_seconds = 0;
  function startClock(elapsed_seconds) {
    setInterval(function() {
      elapsed_seconds = elapsed_seconds + 1;
      $('#timer').text(get_elapsed_time_string(elapsed_seconds));
    }, (1000/150));
  };
});