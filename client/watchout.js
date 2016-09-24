var enemyRadius = 20;
var playerRadius = 10;

var gameBoard = d3.select('.board').append('svg')
  .attr('width', window.innerWidth * 0.75)
  .attr('height', window.innerHeight * 0.75);


var initialData = [];



var randomRange = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generateData = function(n) {
  var results = [];
  for (var i = 0; i < n; i++) {
    results.push({x: randomRange(enemyRadius, window.innerWidth * 0.75 - enemyRadius), y: randomRange(enemyRadius, window.innerHeight * 0.75 - enemyRadius)});
  }
  return results;
};

var sampleData = generateData(30);
var currentScore = 0;

var incrementScore = function(){
  currentScore++;
};

d3.select('svg').append("rect")
  .attr('width', '100%')
  .attr('height', '100%')
  .attr('fill', 'white');
  
d3.select('svg').append("defs")
 .append("pattern")
  .attr("id", "image")
  .attr("width", enemyRadius)
  .attr("height", enemyRadius)
 .append("image")
  .attr("xlink:href", 'http://vignette2.wikia.nocookie.net/the-paper-puppets-wiki-object-show/images/a/ac/Shuriken.png/revision/latest?cb=20140727162741')
  .attr("width", enemyRadius)
  .attr("height", enemyRadius)
  .attr("x", 10)
  .attr("y", 10);

// ENEMIES //////////////////////////////////////////////////////////////////////////////////////////////
var update = function(data) { 
  var enemies = d3.select('svg').selectAll('.enemies').data(data);
  // debugger;
  // UPDATE
  enemies.transition().duration(1000).attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
    //.each("end", incrementScore);

  // ENTER
  enemies.enter().append('circle')
    .attr('class', 'enemies')
    .style('fill', 'url(#image)')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', enemyRadius);

};

setInterval(function() {
  var newData = sampleData.map(function(enemy) {
    return {x: randomRange(enemyRadius, window.innerWidth * 0.75 - enemyRadius), y: randomRange(enemyRadius, window.innerHeight * 0.75 - enemyRadius)};
  });
  update(newData);

  currentScore++;

  d3.select('.current').selectAll('span')
  .data([currentScore])
  .text(function(d) { return d; });

}, 1500);

// PLAYER //////////////////////////////////////////////////////////////////////////////////////////////

var player = d3.select('svg').selectAll('.players').data([{x: window.innerWidth / 2 * 0.75, y: window.innerHeight / 2 * 0.75}]);


// var dragstarted = function(d) {
//   d3.event.sourceEvent.stopPropagation();
//   d3.select(this).classed("dragging", true);
// };

var dragged = function(d) {
  d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
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
  .attr('r', playerRadius )
  .call(drag);

var highScore = 0;
var count = 0;  
setInterval(function() {
  var enemies = d3.select('svg').selectAll('.enemies')[0];
  var currDist;
  for (var enemy of enemies) {
    currDist = Math.sqrt(Math.pow((enemy.cx.baseVal.value - player[0][0].cx.baseVal.value), 2) 
      + Math.pow((enemy.cy.baseVal.value - player[0][0].cy.baseVal.value), 2));
    if (currDist < enemyRadius + playerRadius) {
      if (currentScore > highScore) {
        highScore = currentScore;
      }
      currentScore = -1;
      count++;

    }
  }

  d3.select('.collisions').selectAll('span')
  .data([count])
  .text(function(d){return d;});

  d3.select('.highscore').selectAll('span')
  .data([highScore])
  .text(function(d){return d;});

}, 200);


  
