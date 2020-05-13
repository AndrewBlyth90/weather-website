const request = require("postman-request");

const forecast = (long, lat, callback) => {

  const url =
    "http://api.weatherstack.com/current?access_key=7b65974db2b5453bed1869bbd0a54f44&query=" +
    lat +
    "," +
    long;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees outside. It feels like " +
          body.current.feelslike +
          " degrees outside."
      );
    }
  });
};

module.exports = forecast;
