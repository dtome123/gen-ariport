const readXlsxFile = require("read-excel-file/node");
const { ObjectId } = require("mongodb");
const fs = require("fs");

function main() {
  var airportMongo = [];
  var airportEs = [];

  // File path.
  readXlsxFile("./Airport1.7.xlsx").then((rows) => {
    var data = fs.readFileSync("assets_prod/destination_es.json", "utf8");
    
    var destinations = JSON.parse(data);

    for (var i = 1; i < rows.length; i++) {
      var id = new ObjectId();

      var destination = destinations[i-1];

      airportMongo.push({
        _id: {
          $oid: id,
        },
        code: rows[i][0],
        name: rows[i][1],
        city_code: rows[i][2],
        country_code: rows[i][4],
        lat: rows[i][8],
        lon: rows[i][9],
        tags: ["tripbooking", "airport_import"],
        description: "",
        status: 1,
        localizer: {
          vi: {
            name: rows[i][1],
          },
          en: {
            name: rows[i][3],
          },
        },
        destination_id: destination.id,
        geo_point: {
          lat: rows[i][8],
          lon: rows[i][9],
        },
        partnership_id: "6555895d91edf2deb796c5db",
        updated_by: "655589da91edf2deb796c5dd",
        updated_by_email: "tripbooking@gmail.com",
        updated_by_name: "Admin",
        created_by: "655589da91edf2deb796c5dd",
        created_by_email: "tripbooking@gmail.com",
        created_by_name: "Admin",
      });

      let keywords = [];
      keywords.push("tripbooking", "airport_import");
      keywords.push(destination.location.name);
      keywords.push(destination.location.city);
      keywords.push(destination.location.country);

      let instant_search_field = keywords.join(" ");

      airportEs.push({
        id: id,
        code: rows[i][0],
        name: rows[i][1],
        city_code: rows[i][2],
        country_code: rows[i][4],
        lat: rows[i][8],
        lon: rows[i][9],
        tags: ["tripbooking", "airport_import"],
        description: "",
        status: 1,
        localizer: {
          vi: {
            name: rows[i][1],
          },
          en: {
            name: rows[i][3],
          },
        },
        destination_id: destination.id,
        airport_destination: {
          id: destination.id,
          name: destination.title,
          location: {
            id: destination.location.id,
            name: destination.location.name,
            full_address: destination.location.full_address,
            address: destination.location.address,
            street: destination.location.street,
            ward: destination.location.ward,
            district: destination.location.district,
            city: destination.location.city,
            country: destination.location.country,
            postal_code: destination.location.postal_code,
            lat: destination.location.lat,
            lon: destination.location.lon,
            city_code: destination.location.city_code,
            country_code: destination.location.country_code,
          },
        },
        geo_point: {
          lat: rows[i][8],
          lon: rows[i][9],
        },
        instant_search_field: instant_search_field,
        partnership_id: "6555895d91edf2deb796c5db",
        updated_by: "655589da91edf2deb796c5dd",
        updated_by_email: "tripbooking@gmail.com",
        updated_by_name: "Admin",
        created_by: "655589da91edf2deb796c5dd",
        created_by_email: "tripbooking@gmail.com",
        created_by_name: "Admin",
      });
    }

    fs.writeFileSync("assets_prod/airport.json", JSON.stringify(airportMongo));
    fs.writeFileSync("assets_prod/airport_es.json", JSON.stringify(airportEs));
  });
}

main();
