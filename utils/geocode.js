const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYW5kcmV3Ymx5dGg5MCIsImEiOiJjazl3ejMxd3cwMzR6M2xyb3RhcjVlN3VsIn0.oruN33NnLe3XifUBHlOikQ&limit=1";

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find location, please try another search.",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;