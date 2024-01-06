const readXlsxFile = require("read-excel-file/node");
const fs = require("fs");
const { ObjectId } = require("mongodb");

function main() {
  var location = [];
  readXlsxFile("./Airport1.7.xlsx").then((rows) => {
    
    for (var i = 1; i < rows.length; i++) {
      location.push({
        _id: {
          $oid: new ObjectId(),
        },
        latitude: rows[i][8],
        longitude: rows[i][9],
        name: rows[i][1],
        number: "",
        street: "",
        ward: "",
        district: "",
        city: rows[i][5],
        province: rows[i][6],
        country: rows[i][7],
        postal_code: "",
        suburban: "",
        full_address: "",
        city_code: rows[i][2],
        country_code: rows[i][4],
        created_at: Date.now(),
        updated_at: Date.now(),
        tags: ["tripbooking", "location_import"],
        partnership_id: "6555895d91edf2deb796c5db",
        updated_by: "655589da91edf2deb796c5dd",
        updated_by_email: "tripbooking@gmail.com",
        updated_by_name: "Admin",
        created_by: "655589da91edf2deb796c5dd",
        created_by_email: "tripbooking@gmail.com",
        created_by_name: "Admin",
      });
    }

    fs.writeFileSync("assets_prod/location.json", JSON.stringify(location));
  });
}

main();
