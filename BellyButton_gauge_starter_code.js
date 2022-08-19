// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var sampledata = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var sampleFilter = sampledata.filter(sampleObj => sampleObj.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var metadataFilter =  metadata.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    var sampleArray = sampleFilter[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var metadataArray = metadataFilter[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIDs = sampleArray.otu_ids;
    var otuLabels = sampleArray.otu_labels;
    var sampleValues = sampleArray.sample_values.map((value) => parseInt(value));

    // 3. Create a variable that holds the washing frequency.
   var washFreq = parseFloat(metadataArray.wfreq)
    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", [barData], barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot("bubble", [bubbleData], bubbleLayout); 
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = {
      value: washFreq,
      type: "indicator",
      mode: "gauge+number",
      title: {text: ""},
      gauge: {
        axis: {range: [0,10], dtick:2},
        bar: {color: "black"},
        steps: [
          {range: [0,2], color: "red"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "yellow"},
          {range: [6,8], color: "yellowgreen"},
          {range: [8,10], color: "green"}
        ],}
      }
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      title: {
        text: "Belly Button Washing Frequency</b><br>Scrubs per Week",
      },
      margin: {
        l: 50,
        r: 50,
        b: 0,
        t: 50,
        pad: 50
      },
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", [gaugeData], gaugeLayout);
  });
}
