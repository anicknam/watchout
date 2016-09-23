var radius = 10;

var gameBoard = d3.select('.board').append('svg:svg')
  .attr('width', window.innerWidth * 0.75)
  .attr('height', window.innerHeight * 0.75);


var initialData = [];



var randomRange = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generateData = function(n) {
  var results = [];
  for (var i = 0; i < n; i++) {
    results.push({x: randomRange(radius, window.innerWidth * 0.75 - radius), y: randomRange(radius, window.innerHeight * 0.75 - radius)});
  }
  return results;
};

var sampleData = generateData(30);


// ENEMIES //////////////////////////////////////////////////////////////////////////////////////////////
var update = function(data) { 
  var enemies = d3.select('svg').selectAll('.enemies').data(data);
  
  // UPDATE
  enemies.transition().duration(1000).attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
  
  // ENTER
  enemies.enter().append('circle')
    .attr('class', 'enemies')
    .attr('fill', 'red')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', radius);
};

setInterval(function() {
  var newData = sampleData.map(function(enemy) {
    return {x: randomRange(radius, window.innerWidth * 0.75 - radius), y: randomRange(radius, window.innerHeight * 0.75 - radius)};
  });
  update(newData);
}, 1500);

// PLAYER //////////////////////////////////////////////////////////////////////////////////////////////

var player = d3.select('svg').selectAll('.players').data([{x: window.innerWidth / 2, y: window.innerHeight / 2}]);


// var dragstarted = function(d) {
//   d3.event.sourceEvent.stopPropagation();
//   d3.select(this).classed("dragging", true);
// };

var dragged = function(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
};

// var dragended = function(d) {
//   d3.select(this).classed("dragging", false);
// };

var drag = d3.behavior.drag()
  .origin(function(d) { return d; })
  // .on('dragstart', dragstarted)
  .on('drag', dragged);
  // .on('dragend', dragended);

  // player enter
player.enter().append('circle')
  .attr('class', 'players')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', radius)
  .call(drag);




  
