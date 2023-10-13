function getPlot(id) {
    d3.json("samples.json").then((sampledata) => {
      var selector = d3.select("#selDataset");
      var sampleNames = sampledata.names;
  
      // Clear any existing dropdown options
      selector.html("");
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      buildCharts(id);
      getDemoInfo(id);
    });
  }
  
  function getDemoInfo(id) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == id);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
  
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
  }
  
  function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample)[0];
  
      var otu_ids = resultArray.otu_ids;
      var sampleValues = resultArray.sample_values;
      var labels = resultArray.otu_labels;
  
      var trace1 = {
        x: otu_ids,
        y: sampleValues,
        mode: "markers",
        marker: {
          size: sampleValues,
          color: otu_ids,
          colorscale: "Earth"
        },
        text: labels
      };
  
      var data1 = [trace1];
  
      var layout1 = {
        title: "Bacteria Cultures Per Sample",
        xaxis: { title: "OTU ID" },
      };
  
      Plotly.newPlot("bubble", data1, layout1);
    });
  }
  
  function optionChanged(newSample) {
    buildCharts(newSample);
    getDemoInfo(newSample);
  }
  
  function init() {
    var dropdown = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      data.names.forEach(function (name) {
        dropdown.append("option").text(name).property("value", name);
      });
  
      var initialSample = data.names[0];
      buildCharts(initialSample);
      getDemoInfo(initialSample);
    });
  }
  
  init();
