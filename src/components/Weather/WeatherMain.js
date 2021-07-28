import React,{useState,useEffect} from 'react'
import classes from "./WeatherMain.module.css"
import DateNow from "../Date/Date";
import Loading from '../Loading/Loading';
import MoreInfo from "./WeatherInfo"
import Chart from '../chart/Chart';


  const API_KEY = "f32cfa0133a992d042027732e48eae99";

function WeatherApp() {
    const [query, setQuery] = useState("bangalore");
    const [isLoading, setLoading] = useState(false);
    const [weather, setWeather] = useState({});
    const [showMore, setShowMore] = useState(false);
    const [showGraph, setShowGraph] = useState(false);

    const fetchWeatherData = () => {
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`)
              .then(res => res.json())
              .then(data => {
                  setQuery('');
                  console.log(data);
                  setWeather(data);
                  setLoading(false);
              });
    }

    const search = e => {
        if(e.key === "Enter") {
            fetchWeatherData()
        }
    }

    useEffect(() => {
        fetchWeatherData()
    },[])

    if(isLoading){
      return <Loading/>
    }

   const handleShowMore = () => {
       setShowMore(!showMore)
   }

  const handleShowGraph = () => {
       setShowGraph(!showGraph)
  }
  

    return (
    <div className={classes.container}>
        <main className={classes.main}>
          <div className={classes.search_box}>
            <input 
            type="text" 
            className="search-bar" 
            placeholder="search" 
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
            /> 
          </div>
          {(typeof weather.main != "undefined") ? (<div>
            <article>
            <div className={classes.dateLocation}>
              <div className={classes.location}>
                  {weather.name},{weather.sys.country}
              </div>
              <div className={classes.date}>
                  <DateNow/>
              </div>
            </div>
            <div className={classes.weatherbox}>
                  <div className={classes.temp}>
                      {Math.round(weather.main.temp - 273.15)}°c
                  </div>
                  <div className={classes.desc}>
                      <h5>{weather.weather[0].main}</h5>
                      <p>{weather.weather[0].description}</p>
                  </div>
            </div>
            </article>
            <div className={classes.highLow}>
                  <div className={classes.high}>Todays's High : {Math.round(weather.main.temp_max - 273.15)}°c</div>
                  <div className={classes.low}>Todays's Low : {Math.round(weather.main.temp_min - 273.15)}°c</div>
              </div>
            {showMore ? <MoreInfo 
                    windSpeed={weather.wind.speed} 
                    pressure={weather.main.pressure} 
                    sunrise={weather.sys.sunrise} 
                    sunset={weather.sys.sunset}
                    humidity={weather.main.humidity}
            /> : null}
        </div>) : ('')}
        <div className={classes.btn}>
          <button onClick={handleShowMore}>{showMore ? "Hide Details" : "Show Details"}</button>
          <button className={classes.graphBtn} onClick={handleShowGraph}>{showGraph ? "Hide Graph" : "Show Graph"}</button>
        </div>
        {showGraph ? <Chart city={query}/> : null}
        </main>
    </div>
    )
}

export default WeatherApp
