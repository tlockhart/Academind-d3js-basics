const countryData = {
    items: ['China', 'India', 'USA'],
    addItem(item) {
        // Add a new item to the array
        this.items.push(item);
    },
    removeItem(index) {
        // remove item at index index, and only 1 item removed
        this.items.splice(index, 1)
    },
    updateItem(index, newItem) {
        // Replace item by index with a new item
        this.items[index] = newItem;
    }
}

/**
 * Select the node we want to render our data in
 * selectAll = Used to add data in the orderedlist, 
 * and render a list item element for each data item.   
 * At first the data maybe empty
 * data() - Joins all elements in the list items in the 
 * orderedlist with the data we are passing in as params.
 * - data gives us a reference to a list of to be rendered 
 * elements.
 * enter - used to get the slices of data that are missing.
 * -Gives us a new selection that will hold missing list items. 
 * -Returns the  items we were expecting based on the data  
 * -items we joined.
 * append('li") - Append a list item (li) for every missing data pointt.
 * -Renders a new li for every missing data point.
 * text() - We can render text to the elements in the li.
 * - can render hardcoded items or attributes from the data.
 * 
 * exit - used to find which items are redundant.
 * 
 * 
 * 
 */

d3.select('ul')
.selectAll('li')
.data(countryData.items, data => data)
.enter()
.append('li')
.text(data => data);

/**
 * To Add an item an refresh our chart
 * enter -will all a new d3element to be
 * created for the data that was added 
 * append - will add the new d3element
 */
setTimeout(() => {
countryData.addItem('Germany');
 // Repeat the steps above to rerender
 d3.select('ul')
.selectAll('li')
.data(countryData.items, data => data)
.enter()
.append('li')
.classed("added", true)
.text(data => data);
}, 2000);

/**
 *  To Remove the  item data at index 0
 * (exit get acces to which d3js element had its data removed) 
 * calling remove() will remove it, but we will highlight instead
 * an refresh our chart
 * append - make sure not to append a new d3element on remove
 * wron index removed - since d3js is only concerned with differences
 * after an add, it selects the last item to remove because that is the
 *  difference, instead of the first
 * how do we change this behavior - When we pass in a function 
 * that returns a key that describes the data to the .data() method,
 * now d3js will compare the strings to locate which data item is 
 * missing, instead of just removing the redundant data.
 * -Note this must be done for all data methods.
 */
setTimeout(() => {
    countryData.removeItem(0);
     // Repeat the steps above to rerender
     d3.select('ul')
    .selectAll('li')
    .data(countryData.items, data => data)
    .exit()
    // .remove()
    .classed('redundant', true)
    .text(data => data);
    }, 4000);

    /**
     * How to Update the second item (USA) in the list:
     * Exit - when we update an item the old second item
     * USA is redundant, because the new item Russia replaces
     * it, so exit gives us access to element associated with
     * the changed (redundant) data.
     * Uncomment the remove above, so the China gets removed
     * and this will work.
     * text - we must hardcode the text name to the updated name,
     * - or d3js will leave the old text 'USA'
     */
    setTimeout(() => {
        countryData.updateItem(1, 'Russia');
         // Repeat the steps above to rerender
         d3.select('ul')
        .selectAll('li')
        .data(countryData.items, data => data)
        .exit()
        .classed('updated', true)
        // .text(data => data);
        .text('Russia')
        }, 6000);