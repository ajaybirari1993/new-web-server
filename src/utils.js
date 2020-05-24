const axios = require("axios");

// Get Lat, long for the given address
const getLatLong = (loc) => {
  const mapboxBaseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(loc)}.json`;
  const mapBoxParams = {
    access_token: "pk.eyJ1IjoiYWpheWJpcmFyaTE5OTMiLCJhIjoiY2thaWUza2YxMDlqMjJ5czBpOXdmajM4NiJ9.LzUpZuZmpUjIarXePGpWuQ",
    limit: 1
  }
  return axios({
    method: "GET",
    url: mapboxBaseUrl,
    params: mapBoxParams
  }).then(res => {
    if(res.data.features.length > 0){
      const lat = res.data.features[0].center[1];
      const long = res.data.features[0].center[0];
      const placeName = res.data.features[0].place_name;

      console.log(`${placeName} : ${lat},${long}`);
      // getTemprature(lat,long);
      return Promise.resolve({lat: lat, long:long});
    }else{
      console.log("Please enter the valid Location");
      return Promise.reject("Please enter the valid Location");
    }
    
  }).catch(error => {
    console.error("Mapbox url fails");
  })
}

// get the temprature for the given lat,long
const getTemprature =  (lat,long)=>{
  const url = "http://api.weatherstack.com/current";
  const params = {
    access_key: "14776b9745692d3f89ae8b197d313802",
    query: `${lat},${long}`,
  };
  return axios({
    method: "GET",
    url: url,
    params: params,
  }).then((response) => {
    if(response.data.current){
      const data= response.data.current;
      console.log(`It is ${data.temperature} degrees out, but feels like ${data.feelslike} degrees out.`)
      return Promise.resolve({temperature: data.temperature});
    }else if(response.data.error){
      console.error(response.data.error.info);
      return Promise.reject(response.data.error.info);
    }
  
  }).catch(error => {
    console.log(error);
  });
}

module.exports = {
  getLatLong: getLatLong,
  getTemprature: getTemprature
} 