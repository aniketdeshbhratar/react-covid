import React , {useState, useEffect} from 'react';
// import {Line} from 'react-chartjs-2';

function LineGraph() {
    const [data, setItem] = useState({});

    // api to get last 200 data
    const historiacalAPI = 'https://disease.sh/v3/covid-19/historical/all?lastdays=200';

    useEffect(() => {
        fetch(historiacalAPI)
            .then(response => response.json())
            .then(data => {
                    console.log(data)
            })
    },[])

    const buildChartData = data => {
        const chartData = [];
        let lastDataPoint ;

        data.cases.forEach((date) => {
            if(lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data['cases'][date]- lastDataPoint
                }
                lastDataPoint = data['case'][date]
            }   
        })
    }

    return (
        <div>
            {/* <Line 
                data
                option
            /> */}
        </div>
    )
}

export default LineGraph
