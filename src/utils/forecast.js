const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=750b5ed267a938cbc52a5a007e2891b8&query=${latitude},${longitude}&units=f`;
  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `At ${body.current.observation_time}, ${body.current.weather_descriptions}, it is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees. Humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
