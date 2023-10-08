function getPlot(id){
    d3.json("samples.json").then (sampledata=>{
        console.log(sampledata)
        var ids= sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValyes= sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var lables= sampledata.samples[0].otu_labels.slice(0,10);
        console.log(lables)
        var OTU_top=(sampledata.samples[0].otu_ids.slice(0,10)).reverse();
        var OTU_ids= OTU_top.map(d=> "OTU" +d);
        console.log('OTU_lables: ${OTU_ids}' )
        var lables=sampledata.samples[0].otu_lables.slice(0,10);
        console.log('OTU_lables: ${lables}' )
        var trace={
            x: sampleValues,
            y: OTU_ids,
            text: lables,
            marker: {color: 'blue'},
            type: "bar",
        }
            var data= [trace];
            var layout={
                yaxis:{tickmode: "linear",},
            };
        Ploty.newPlot("bar", data, layout);
            var trace1= {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                marker: {size: sampledata.samples[0].sample_values, color: sampledata.samples[0].otu_ids},
                text: sampledata.samples[0].otu_labels
            };
            var data1= [trace1];

            })
        Ploty.newPlot("bubble", data1);
        };
    
function getDemoInfo(id){
    d3.json("samples.json").then (sampledata=>{
        var metadata= data.metadata;
        console.log(metadata)
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
       var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

function init() {
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then((data)=> {
        console.log(data)
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}

init();