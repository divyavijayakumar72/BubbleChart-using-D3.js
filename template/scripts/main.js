// Hint: This is a good place to declare your global variables


// This function is called once the HTML page is fully loaded by the browser
document.addEventListener('DOMContentLoaded', function () {
    // Hint: create or set your svg element inside this function

    // This will load your you CSV file and store them into an array.
    Promise.all([d3.csv('data/Box_Office_Movies.csv')])
        .then(function (values) {
            console.log('new loaded Box_Office_Movies.csv', values[0]);

            // Hint: This is a good spot for doing data wrangling


            drawBubbleChart();
        });
});

// Use this function to draw the bubble chart.
function drawBubbleChart() {
    console.log('trace:drawBubbleChart()');
}

