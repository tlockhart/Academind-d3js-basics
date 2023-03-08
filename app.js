const DUMMY_DATA = [
  { id: "d1", value: 10, region: "USA", value: 10 },
  { id: "d2", value: 11, region: "India", value: 12 },
  { id: "d3", value: 12, region: "China", value: 11 },
  { id: "d4", value: 6, region: "Germany", value: 6 },
];
const MARGINS = { top: 20, bottom: 10};
const CHART_WIDTH = 600;
const CHART_HEIGHT = 400 - MARGINS.top - MARGINS.bottom;

let selectedData = DUMMY_DATA;

// scaleBand - equally distributed space along the x axis, 10% of space is for padding
const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1);

// linearScale - reflect the band values in relationship to the elements on the y axis
const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);

// create chart and set attributes
const chartContainer = d3
  .select("svg")
  .attr("width", CHART_WIDTH)
  .attr("height", CHART_HEIGHT + MARGINS.top + MARGINS.bottom);

  // Define the X domains to specify how many items should be positioned on the x axis
x.domain(DUMMY_DATA.map((d) => d.region));

// Define the Y domain
y.domain([0, d3.max(DUMMY_DATA, (d) => d.value) + 3]);

// create a (g svg element - group used to group all bars together)
const chart = chartContainer.append("g");

/**
 * Add Axis to your chart: Call is a js function that 
 * can call a function object.
 * Note: axisBottom refers to where the labels are 
 * placed on the line
 * use the transform attribute to move the axis down.
 * tickSizeOuter - controls the outter ticks on the axis.
 */
chart.append('g')
.call(d3.axisBottom(x).tickSizeOuter(0))
.attr('transform', `translate(0, ${CHART_HEIGHT})`)
.attr('color', '#4f009e');

/**
 * Controls the display of the bar data
 */
function renderChart() {
  /**
 * select all elements with a .bar class ( they don't exist yet, d3js will create them)
 * join the elements with .bar with the Dummy Data
 * append a rect svg element - rectangle, with the class
 * bar for all the missing data points
 * derive the width and the height from
 * the num of data points and their data values
 * to let d3js translate the scales for the space available
 */
chart.selectAll(".bar")
.data(selectedData, data => data.id)
.enter()
.append("rect")
.classed("bar", true)
.attr("width", x.bandwidth())
.attr("height",  (data) => CHART_HEIGHT - y(data.value))
.attr("x", (data) => x(data.region))
.attr("y", (data) => y(data.value));

// Logic to remove bars:
chart.selectAll('.bar')
.data(selectedData, data => data.id)
.exit()
.remove();

// add labels above the bars
chart
.selectAll(".label")
.data(selectedData, data => data.id)
.enter()
.append("text")
.text((data) => data.value)
.attr("x", data => x(data.region) + x.bandwidth()/2)
.attr("y", data => y(data.value) - 20)
.attr('text-anchor', 'middle')
.classed('label', true);

// Logic to remove labels
chart.selectAll('.label')
.data(selectedData, data => data.id)
.exit()
.remove();
}

  /**
   * Add controls to add and remove bars
   */

  // Select the div->ul->li
const listItems = d3
.select('#data')
.select('ul')
.selectAll('li')
.data(DUMMY_DATA)
.enter()
.append('li');

// Add region text to spans
listItems.append('span').text((data) => data.region);

// Initialize Chart Data
renderChart();

// keep track of unselected vars
let unselectedIds = [];

// Add checkbox to add or remove bars, register a change event listerner
listItems
.append('input')
.attr('type', 'checkbox')
.attr('checked', true)
.on('change', (data) => {
  console.log("Data:", data);
  if(unselectedIds.indexOf(data.id) === -1) {
    // add the items because it is not dislayed
    unselectedIds.push(data.id);
  } else {
    // remove the item because it is displayed
    unselectedIds = unselectedIds.filter( id => id !== data.id);
  }
  // change selected data to
  selectedData = DUMMY_DATA.filter(data => unselectedIds.indexOf(data.id) === -1);

  console.log("SelectedData:", selectedData);

  // rerender chart after selection have been made
  renderChart();
});





