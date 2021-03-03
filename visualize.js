let xyz = ()=>{
    console.log("hello")
}

let Plot = (activations,elementId) => {
       
    activations = activations.map((p,i)=>{
        let s = Math.floor(i/14)*14;
        let e = Math.floor((i/14) + 1 ) * 14;

        return {
            variable: s.toString() +" - " + e.toString(),
            group: Math.floor((i%14)).toString(),
            value: p.toString()
        }
    })

// set the dimensions and margins of the graph
var margin = {top: 80, right: 25, bottom: 30, left: 40},
  width = 250 - margin.left - margin.right,
  height = 250 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(elementId)
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + 50 + "," + 40 + ")");

//Read the data
let data = activations;

console.log(data)
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups = d3.map(data, function(d){return d.group;}).keys()
  var myVars = d3.map(data, function(d){return d.variable;}).keys()

  // Build X scales and axis:
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0.05);
  

  // Build Y scales and axis:
  var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.001);
  

  // Build color scale
  var myColor = d3.scaleLinear()
    .range(['#4cb4c6','#54a5ae','#193b44','#b74c4c','#49160b'].reverse())
    .domain([0,0.25,0.5,0.75,1])

  // create a tooltip
  var tooltip = d3.select(elementId)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .html("Activation: " + d.value)
      .style("position","absolute")
      .style('z-index',"100")
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  // add the squares
  svg.selectAll()
    .data(data, function(d) {return d.group+':'+d.variable;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)




}

