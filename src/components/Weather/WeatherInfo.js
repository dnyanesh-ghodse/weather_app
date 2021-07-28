import React from 'react';
import classes from "./WeatherInfo.module.css";
import { FiSunrise,FiSunset } from 'react-icons/fi'
import {WiHumidity} from "react-icons/wi"
import {GiPaperWindmill} from "react-icons/gi";
import {CgCompressV} from "react-icons/cg";


function WeatherInfo(props) {
    //converting seconds into date
    let rise = props.sunrise;
    let set = props.sunset;
    let SunsetDate = new Date(set * 1000)
    let SunriseDate = new Date(rise * 1000)
    return (
        <div className={classes.weatherInfo}>
            <div className={classes.humi}>
                <li className={classes.icon}> <GiPaperWindmill /> Wind Speed : {props.windSpeed} m/s</li>
                <li className={classes.icon}> <WiHumidity/> Humidity : {props.humidity} g.kg<sup>-1</sup></li>
                <li className={classes.icon}> <CgCompressV /> Pressure : {props.pressure} Pa</li>
            </div>
            <div className={classes.sun}>
                <li  className={classes.icon}> <FiSunrise/> Sunrise : {`${SunriseDate.getHours()} : ${SunriseDate.getMinutes()} : ${SunriseDate.getSeconds()}`}</li>
                <li className={classes.icon}> <FiSunset /> Sunset : {`${SunsetDate.getHours()} : ${SunsetDate.getMinutes()} : ${SunsetDate.getSeconds()}`}</li>
            </div>

        </div>
    )
}

export default WeatherInfo;
