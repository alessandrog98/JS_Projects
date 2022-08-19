$(document).ready(function(){

    var ctx = $("#myChart");

    var bubble = new Chart(ctx,
        {
            type:"bubble",
            data:{
                datasets:[ {
                            label: [],
                            color: "rgb(255,250,250)",
                            backgroundColor:"rgb(0, 189, 45,0.3)",
                            borderColor:"rgb(0, 189, 45)",
                            borderWidth: 1,
                            data:[]
                            },
                            {
                            label: [],
                            color: "rgb(255,250,250)",
                            backgroundColor:"rgb(231, 47, 2, 0.3)",
                            borderColor:"rgb(231, 47, 2)",
                            borderWidth: 1,
                            data:[]
                            }],
            },
            options:{
                legend: {
                    labels: {
                        fontColor: "rgb(255,250,250)",
                        fontSize: 12
                    }
                },
                tooltips: {
                    //tootlip per aggiungere alle labels le proprietà aggiuntive
                    callbacks: {
                        label: function(item, data) {
                            var label=data.datasets[item.datasetIndex].data[item["index"]];
                            return "Locality: "+label.locality+"; Magnitude: "+label.magnitude+"; Year: "+label.year;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Italian\'s Earthquakes map',
                    fontSize : "16",
                    fontColor : "rgb(255,250,250)"
                },
                scales:{
                    yAxes:[{
                        ticks:{
                            suggestedMax: 47,
                            suggestedMin: 36.5
                        }
                    }],
                    xAxes:[{
                        ticks:{
                            suggestedMax: 18.5,
                            suggestedMin: 6.5
                        }
                    }]
                }
            }
        })

    var datasets = [
        {
            label : "Minor earthquake",
            data : [{"x":13.24,"y":42.95,"r":9, "magnitude": 1.2, "locality": "L'Aquila", "year": 1994 },
                    {"x":10.31,"y":45.36,"r":10, "magnitude": 2.2, "locality": "Parma", "year": 1967 },
                    {"x":16.41, "y":40.25,"r":12, "magnitude": 3.1, "locality": "Potenza", "year": 1984 },
                    {"x":11.20, "y":47.25,"r":14, "magnitude": 3.7, "locality": "Trento", "year": 1984 },
                    {"x":8.22, "y":45.14, "r":15, "magnitude": 4.0, "locality": "Genova", "year": 2010 },]
        },
        {
            label : "Major earthquake",
            data : [{"x":12.39, "y":46.43, "r":20, "magnitude": 5.7, "locality": "Venezia", "year": 2020 },
                    {"x":13.65, "y":37.41, "r":22, "magnitude": 6.0, "locality": "Palermo", "year": 1990 },
                    {"x":7.22, "y":46.0, "r":25, "magnitude": 6.5, "locality": "Torino", "year": 2021 },
                    {"x":12.28, "y":42.21, "r":29, "magnitude": 7.2, "locality": "Roma", "year": 2004 },
                    {"x":14.55, "y":40.54, "r":32, "magnitude": 7.4, "locality": "Napoli", "year": 1992 },
                    {"x":17.45, "y":41.02, "r":35, "magnitude": 7.9, "locality": "Bari", "year": 2016 }]
    }];


    function addData(chart, data){
        let idx = 0;
        for(let x=0; x<data.length; x++) {
            let set = data[x].data;
            set.sort((a, b) => { return a.year - b.year; })
            chart.data.datasets[x].label.push(data[x].label);
            for (let i = 0; i < set.length; i++) {
                idx++
                setTimeout(function(){
                    chart.data.datasets[x].data.push(set[i]);
                    chart.update();
                }, (idx+1) * 1350, idx, set[idx]);
            }
        }
    }

    addData(bubble, datasets)

});