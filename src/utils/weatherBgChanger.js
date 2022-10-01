import clear_sky_d from "../assets/day_bg/clear_sky_d.webp";
import clear_sky_n from "../assets/night_bg/clear_sky_n.webp";
import few_сlouds_d from "../assets/day_bg/few_сlouds_d.webp";
import few_сlouds_n from "../assets/night_bg/few_сlouds_n.webp";
import scattered_clouds_d from "../assets/day_bg/scattered_clouds_d.webp";
import scattered_clouds_n from "../assets/night_bg/scattered_clouds_n.webp";
import broken_clouds_d from "../assets/day_bg/broken_clouds_d.webp";
import broken_clouds_n from "../assets/night_bg/broken_clouds_n.webp";
import rain_d from "../assets/day_bg/rain_d.webp";
import rain_n from "../assets/night_bg/rain_n.webp";
import thunderstorm_d from "../assets/day_bg/thunderstorm_d.webp";
import thunderstorm_n from "../assets/night_bg/thunderstorm_n.webp";
import snow_d from "../assets/day_bg/snow_d.webp";
import snow_n from "../assets/night_bg/snow_n.webp";
import mist_d from "../assets/day_bg/mist_d.webp";
import mist_n from "../assets/night_bg/mist_n.webp";

function weatherBgChanger(weather){
  switch(weather){
    case "01d": {
      return clear_sky_d;
    } case "01n": {
      return clear_sky_n;
    } case "02d": {
      return few_сlouds_d;
    } case "02n": {
      return few_сlouds_n;
    } case "03d": {
      return scattered_clouds_d;
    } case "03n": {
      return scattered_clouds_n;
    } case "04d": {
      return broken_clouds_d;
    } case "04n": {
      return broken_clouds_n;
    } case "09d": {
      return rain_d;
    } case "09n": {
      return rain_n;
    } case "10d": {
      return rain_d;
    } case "10n": {
      return rain_n;
    } case "11d": {
      return thunderstorm_d;
    } case "11n": {
      return thunderstorm_n;
    } case "13d": {
      return snow_d;
    } case "13n": {
      return snow_n;
    } case "50d": {
      return mist_d;
    } case "50n": {
      return mist_n;
    } default: {
      break;
    }
  }
}

export default weatherBgChanger;