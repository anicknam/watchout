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
    results.push({x: randomRange(radius, window.innerWidth * 0.75 - radius), y: randomRange(radius, window.innerHeight * 0.75 -radius)});
  }
  return results;
};

var sampleData = generateData(30);

var update = function(data){ 
  var enemies = d3.select('svg').selectAll('.enemies').data(data);
  
  // UPDATE

  enemies.transition().duration(1000).attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
  
  // ENTER
  enemies.enter().append('circle')
    .attr('class', 'enemies')
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