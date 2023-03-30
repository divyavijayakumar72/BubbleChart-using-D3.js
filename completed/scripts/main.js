// Hint: This is a good place to declare your global variables
var maxEarnings = [];
var maxReviews = [];
var dummyData;

var divToolTipHM;

var margin = ({ top: 50, right: 50, bottom: 50, left: 200 })
var width = 1100 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;


// This function is called once the HTML page is fully loaded by the browser
document.addEventListener('DOMContentLoaded', function () {

    divToolTipHM = d3.select("body").append("div")
    .attr("class", "tooltipHM")
    .style("opacity", 0);

    // Hint: create or set your svg element inside this function

    // This will load your two CSV files and store them into two arrays.
    Promise.all([d3.csv('data/Box_Office_Movies.csv')])
        .then(function (values) {
            console.log('new loaded females_data.csv and males_data.csv', values[0]);
            // Hint: This is a good spot for doing data wrangling

            // row conversion function in D3
            values[0].forEach(function (d) {
                d.Earning = +d.Earning.substr(1).replaceAll(',', '');
                d.Rating = +d.Rating;
                d.Country = d.Country;
                d.Reviews = +d["Total rewies"];
            });

            dummyData = values[0];
            dummyData.forEach(function (d) {
                maxEarnings.push(d.Earning);
                maxReviews.push(d.Reviews);
            });

            drawBubbleChart();
        });
});

// Use this function to draw the lollipop chart.
function drawBubbleChart() {
    console.log('trace:drawBubbleChart()');

    var hmax = 0;
    var hmin = 0;
    hmax = d3.max(maxEarnings);
    hmin = d3.min(maxEarnings);
    // console.log('hmax',hmax, hmin)

    var bubbleSmall = 0;
    var bubbleLarge = 0;
    bubbleSmall = d3.min(maxReviews);
    bubbleLarge = d3.max(maxReviews);

    // console.log('bubble size', bubbleSmall, bubbleLarge)

    var svg;
    // Redraw svg on dropdown change
    d3.select("svg").remove();

    // append the svg object to the body of the page
    svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X axis
    const x = d3.scaleLinear()
        .domain([0, 10])
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width/2+90)
        .attr("y", height + 50)
        .text("IMDB Ratings for Movies");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([hmin, hmax])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", -height/2 - 50)
        .attr("y", -90)
        .attr("transform", "rotate(-90)")
        .text("Earnings of Movies")
        .attr("text-anchor", "start")

    // Add a scale for bubble size
    const z = d3.scaleLinear()
        .domain([471, 612075])
        .range([3, 40]);


    // Add a scale for bubble color
    const myColor = d3.scaleOrdinal()
        .domain(["United States", "Japan", "India", "Canada", "Spain", "South Korea", "China", "Australia"])
        .range(["#3982D2", "#6c25be", "#be4d25", "#E27E97", "#FFBF00", "#900C3F", "#008000", "#E8A40C"]);

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(dummyData)
        .join("circle")
        .attr("class", "bubbles")
        .attr("cx", d => x(d.Rating))
        .attr("cy", d => y(d.Earning))
        .attr("r", d => z(d.Reviews))
        .style("fill", d => myColor(d.Country))
        .style('stroke-width', 0)
        .on('mouseover', function (d, i) {
            d3.select(this).style('stroke', 'black')
            d3.select(this).style('stroke-width', 2)
            console.log('mouseover')
        })
        .on('mousemove', function (event, d) {
            d3.select(this).style('stroke', 'black')
            d3.select(this).style('stroke-width', 2)
            console.log('d', d.Reviews)
           
        })
        .on("mouseout", function (d) {
            // divToolTipHM.style("opacity", 0);
            d3.select(this).style('stroke-width', 0)
        })


    // Define legend for the chart
    svg.append("circle")
        .attr("cx",806)
        .attr("cy",8)
        .attr("r", 10)
        .style("fill", "#3982D2");
    svg.append("text")
        .attr("class", "axis")
        .attr("x", 820)
        .attr("y", 13)
        .text("United States")
        .attr("text-anchor","start")
        .style("font-weight","bold")
        .style("font-size", "14px")
        .style("font-family","sans-serif")
        
    svg.append("circle")
    .attr("cx",806)
    .attr("cy",31)
    .attr("r", 10)
        .style("fill", "#6c25be");
    svg.append("text")
        .attr("class", "axis")
        .attr("x", 820)
        .attr("y", 36)
        .text("Japan")
        .attr("text-anchor","start")
        .style("font-weight","bold")
        .style("font-size", "14px")
        .style("font-family","sans-serif")
    
    svg.append("circle")
    .attr("cx",806)
    .attr("cy",54)
    .attr("r", 10)
        .style("fill", "#E8A40C");
    svg.append("text")
        .attr("class", "axis")
        .attr("x", 820)
        .attr("y", 58.3)
        .text("Australia")
        .attr("text-anchor","start")
        .style("font-weight","bold")
        .style("font-size", "14px")
        .style("font-family","sans-serif")
        
    svg.append("circle")
    .attr("cx",806)
    .attr("cy",77)
    .attr("r", 10)
        .style("fill", "#be4d25");
    svg.append("text")
        .attr("class", "axis")
        .attr("x", 820)
        .attr("y", 80.6)
        .text("India")
        .attr("text-anchor","start")
        .style("font-weight","bold")
        .style("font-size", "14px")
        .style("font-family","sans-serif")

    svg.append("circle")
    .attr("cx",806)
    .attr("cy",100)
    .attr("r", 10)
        .style("fill", "#E27E97");
    svg.append("text")
        .attr("class", "axis")
        .attr("x", 820)
        .attr("y", 103.9)
        .text("Canada")
        .attr("text-anchor","start")
        .style("font-weight","bold")
        .style("font-size", "14px")
        .style("font-family","sans-serif")

    svg.append("circle")
    .attr("cx",806)
    .attr("cy",123)
    .attr("r", 10)
        .style("fill", "#FFBF00");
    svg.append("text")
        .attr("class", "axis")
        .attr("x", 820)
        .attr("y", 128.2)
        .text("Spain")
        .attr("text-anchor","start")
        .style("font-weight","bold")
        .style("font-size", "14px")
        .style("font-family","sans-serif")

    svg.append("circle")
    .attr("cx",806)
    .attr("cy",146)
    .attr("r", 10)
        .style("fill", "#900C3F");
    svg.append("text")
        .attr("class", "axis")
        .attr("x", 820)
        .attr("y", 151.5)
        .text("South Korea")
        .attr("text-anchor","start")
        .style("font-weight","bold")
        .style("font-size", "14px")
        .style("font-family","sans-serif")

    svg.append("circle")
    .attr("cx",806)
    .attr("cy",169)
    .attr("r", 10)
        .style("fill", "#008000");
    svg.append("text")
        .attr("class", "axis")
        .attr("x", 820)
        .attr("y", 173.8)
        .text("China")
        .attr("text-anchor","start")
        .style("font-weight","bold")
        .style("font-size", "14px")
        .style("font-family","sans-serif")


}

