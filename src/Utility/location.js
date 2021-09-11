const chalk = require("chalk");
const request = require("request");

const location = function (name, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json?limit=2&access_token=pk.eyJ1IjoiZHVtbXlvcGxrIiwiYSI6ImNrc3czZnRuMTF3ZDAydG1kMTQyYjBkdjAifQ.jCwWbCM4rk_kzjQt05ph9A`;

  request({ url, json: true }, function (error, response) {
    if (error) {
      callback("something went wrong OR Please check the Internet", undefined);
    } else if (response.body.features.length === 0) {
      callback("Please enter valid Name", undefined);
    } else {
      const coordinates = {
        lat: response.body.features[0].center[1],
        lon: response.body.features[0].center[0],
        place: response.body.features[0].place_name,
      };

      callback(undefined, coordinates);
    }
  });
};

module.exports = location;
