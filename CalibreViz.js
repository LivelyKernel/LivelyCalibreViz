
System.import("https://d3js.org/d3.v3.js").then( () => {


var diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#d3root").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");


d3.csv("https://lively4//books/Library/books.csv",(d) => { 
  d.year = d.date.replace(/-.*/,"")
  d.value = Math.sqrt(d.ratings)
  return d
}, (error, rows) => {
  if (error) throw error;

  rows = rows.slice(0,1000) // for dev

  var node = svg.selectAll(".node")
      .data(bubble.nodes( {children: rows} )
        .filter(function(d) { return !d.children }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.author + " ["+d.year + "]\n" + d.title +"\n"+ d.genre + " "  + d.rating + " " + d.ratings + "(" + d.id + ")"  });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.genre); });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("font-size", d => "" + Math.sqrt(d.r)*2 + 10 + "px")
      .text(d => d.title.substring(0, d.r / 3) );
});


d3.select(self.frameElement).style("height", diameter + "px");


})


