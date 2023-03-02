// https://www.youtube.com/watch?v=TOJ9yjvlapY
const DUMMY_DATA = [
  { id: 'd1', value: 10, region: 'USA' },
  { id: 'd2', value: 11, region: 'India' },
  { id: 'd3', value: 12, region: 'China' },
  { id: 'd4', value: 6, region: 'Germany' },
];

/**************************/
// SIMPLE DATA TEST 
/**
 * Example1: Find the first div on the page, select all paragraphs which don't exit, 
 * bind the 'data", then tell me which paragraphs are missing with "enter";
 * append a paragraph to each missing div
 * text add a text node inside the paragraph elements that will be created.
 */
// const div1 = d3.select('div')
// .selectAll('p')
// // .data([1, 2, 3])
// .data(DUMMY_DATA)
// .enter()
// .append('p')
// // .text(data => data);
// .text(data => data.region);

/**
 * Set inline styles with styles method
 * attache css classes with the classed method
 */
const div2 = d3.select('div')
.classed('test-container', true)
.style('border', '1px solid red')

/**
 * Example 2: Render DIV:
 * Create divs that don't currently exist
 * Selecting a div will also include the container
 * Select the element by css class "bar"
 *  and make sure the css element has that class
 * Bind the dummy data with .data(DUMMY_DATA);
 * Call enter() to see what was loaded yet
 * Append a div for every missing element
 * Add a .bar class for each div, with "classed"
 * Use "style" or "attr".attr('height', '250px');
 * to set the width and height attributes
 * How do I make div display next to each other?
 * add display: flex and justify-content: space-around in css
 * Dynamically set the Height: Pass in a function to get acces
 * the data point, allows you to cycle through data for each element
 */
// Step1: select the container
const container1 = d3.select('div')
.classed('bar-container', true)
.style('border', '1px solid red');

const bars1 = container1.selectAll('.bar1')
.data(DUMMY_DATA)
.enter()
.append('div')
.classed('bar1', true)
.style('width', '50px')
.style('height', data => (data.value * 15) + 'px');

// How do we update datapoints?
/**************************/
/**
 * Example 3: Render SVG
 * Render a Rect instead of Div
 * Set width and height with attr
 * Note value is automatically treated as pixels (no + 'px")
 * svg - background color uses fill
 * Don't use flex-box to layout svg
 * coord in svg start in top left corner
 * Use d3 to render element position, with d3js/scale(d3-scale)
 * -calculate positions of diffeerent related data points
 * xScale - calculate position on x azis (gives us the position of the x axis in relation to the other elements rendered.)
 * d3.scaleBand() - A scale where every item has the same width
 * .rangeRound([0, 250])-chain with the amout of space available.
 * padding(0.1) - how much padding between the bars
 * yScale - calculate height of the datapoint ( gives us the position of the y axis of the object, in relation to the other elements rendered.)
 * d3.scaleLinear() - calculate the right height for the data points based on value prop
 * Allows us to translate a value to a with or height.  Gives us info about were an element
 * should be positioned on the x and y axis. scaleBand and scaleLinear allow us to generate
 * coordinates within the coord range d3 will be aware of.
 * .domain() - specifies which min and max value we want mapped to our chart 
 * .domain() for xScale should include the range of data points, so d3 will know how much data will be represented.
 * ( smallest value is 0, were x and y axis cross)
 * .range() - Feed in the actual height and width of our container 
 * (start with larger value first, since coord system start at top left corner, for x start at top and move to the bottom).
 * when setting width and height use xScale.bandwidth() and yScale, that takes into account range and max an min scale, respectively.
 * set x and y attr with help from scaling functions
 * by defaunt d3 coord system start at top level, so we calulate height my take our max height and subtracting from the max y range (200)
 * 
 **/
// 

const xScale = d3.scaleBand().domain(DUMMY_DATA.map((dataPoint) => dataPoint.region)).rangeRound([0, 250]).padding(0.1);
const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);

// const xScale = d3
//   .scaleBand()
//   .domain(DUMMY_DATA.map((dataPoint) => dataPoint.region))
//   .rangeRound([0, 250])
//   .padding(0.1);
// const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);
// Step1: select the container
const container2 = d3.select('svg')
.classed('bar-container', true);

const bars2 = container2
  // .selectAll('.bar')
  .data(DUMMY_DATA)
  .enter()
  .append('rect')
  .classed('bar', true)
  .attr('width', xScale.bandwidth())
  .attr('height', (data) => 200 - yScale(data.value))
  .attr('x', data => xScale(data.region))
  .attr('y', data => yScale(data.value));

  // Use a setTimeout to reset the data, with half the data. 
  // Exit give us all the data that should be removed.
  // Give you the data tha was rendered but are not longer in the data
  // call remove to remove them.
setTimeout(() => {
  bars2.data(DUMMY_DATA.slice(0, 2)).exit().remove();
}, 2000);