let xyz = ()=>{
    console.log("hello")
}

let Plot = (activations,elementId) => {
       
    let h = activations.length;
    let w = activations[0].length;

    var colorscaleValue = [
        [0, '#F08080'],
        [1, 'crimson']
    ];

    var data = [{
    
        z: activations,
        type: 'heatmap',
        colorscale: colorscaleValue,
        showscale: true
    }];

    var layout = {
        title: 'Second Layer',
        annotations: [],
        xaxis: {visible: false},
        yaxis: {visible: false},
    };

    for ( var i = 0; i < h; i++ ) {
        
        for ( var j = 0; j < w; j++ ) {

            var currentValue = activations[i][j];
            if (currentValue != 0.0) {
                var textColor = 'white';
            }
            else{
                var textColor = 'black';
            }
            var result = {        
            text: activations[i][j],
            font: {
                family: 'Arial',
                size: 12,
                color: 'rgb(50, 171, 96)'
            },
            showarrow: false,
            font: {
                color: textColor
            }
            };
            layout.annotations.push(result);

        }
    }

    Plotly.newPlot(elementId, data, layout);
}

