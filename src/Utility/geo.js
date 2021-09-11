const chalk = require("chalk");
const request = require("request");

const Geo = function (lat, lon, callback) {
  const url = `http://api.weatherstack.com/current?access_key=cd3320af9d206a75d897dec60b12718d&query=${lat},${lon}&units=f`;

  request({ url, json: true }, function (error, response) {
    if (error) {
      callback("something went wrong OR Please check the Internet", undefined);
    } else if (response.body.error) {
      callback("Please check your latitude and longitude", undefined);
    } else {
      const data = {
        name: response.body.location.name,
        temperature: response.body.current.temperature,
        visibility: response.body.current.visibility,
        descriptin: response.body.current.weather_descriptions[0],
      };
      callback(undefined, data);

      // callback(undefined, data);

      // console.log(
      //   "Your selected Location is " +
      //     chalk.green.inverse(data.location.name) +
      //     ". The current temperature hers is " +
      //     data.current.temperature +
      //     " and the visibility is " +
      //     data.current.visibility +
      //     ". The weather description is " +
      //     data.current.weather_descriptions[0]
      // );
    }
  });
};

module.exports = Geo;
