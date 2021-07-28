import React,{useState,useEffect} from 'react';
import classes from "./Chart.module.css"
import {Line} from "react-chartjs-2";

function Chart(props) {
    const [forecast, setForecast] = useState({})
    const [loading, setLoading] = useState(true)

    const city = "bangalore";
    const API_KEY = "f32cfa0133a992d042027732e48eae99"
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`


    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setForecast(data)
            setLoading(false)
            console.log(data)
        })
    }, [])

    if(loading){
        return <h1>Loading</h1>
    }


    const forecastDays = [forecast.list[0],forecast.list[10],forecast.list[20],forecast.list[30],forecast.list[39]]
    const newDay = []

        forecastDays.forEach(d => {
            const dateN = new Date(d.dt * 1000).getDate();
            newDay.push(dateN)
        })

        console.log(newDay);
       
        
        const labels = [
            newDay[0]+" / 2021",
            newDay[1]+" / 2021" ,
            newDay[2]+" / 2021",
            newDay[3]+" / 2021",
            newDay[4]+" / 2021",
        ];
    const data = {
    labels: labels,
    datasets: [{
        label: 'High',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [  
            forecastDays[0].main.temp_max - 273,
            forecastDays[1].main.temp_max - 273, 
            forecastDays[2].main.temp_max - 273, 
            forecastDays[3].main.temp_max - 273, 
            forecastDays[4].main.temp_max- 273
             ],
        
    },{ label: "Low",
        borderColor: "#aba",
        backgroundColor: "#123",
        data: [
            forecastDays[0].main.temp_min - 273,
            forecastDays[1].main.temp_min - 273, 
            forecastDays[2].main.temp_min - 273, 
            forecastDays[3].main.temp_min - 273, 
            forecastDays[4].main.temp_min- 273]}]
    };

    return (
        <div className={classes.chart}>
            <Line data={data}/>
        </div>
    )
}

export default Chart
