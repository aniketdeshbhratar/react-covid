import React , {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import numeral from "numeral";


const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };
  

function LineGraph() {
    const [data, setItem] = useState({});

    // api to get last 200 data
    const historiacalAPI = 'https://disease.sh/v3/covid-19/historical/all?lastdays=200';

    const buildChartData = (data,caseType="cases") => {
        const chartData = [];
        let lastDataPoint ;

        for(let date in data.cases) {
            if(lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[caseType][date] - lastDataPoint
                };
                chartData.push(newDataPoint);
            }   
            lastDataPoint = data['cases'][date];
        }
        return chartData;
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetch(historiacalAPI)
                .then(response => response.json())
                .then(data => {
                        const chartData = buildChartData(data);
                        setItem(chartData);
                        
                        console.log(chartData);
                })
        }
        fetchData()
        
    },[]);

    
    return (
        <div>
            <h1>Graph</h1>
            {data?.length > 0 && (
                <Line 
                options={options}
                data={{
                    datasets: [{
                        data:data
                    }]
                }}
                />
            )}
            
        </div>
    )
}

export default LineGraph
