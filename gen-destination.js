const readXlsxFile = require("read-excel-file/node");
const fs = require("fs");
const { ObjectId } = require("mongodb");

function main() {
  var desMongo = [];
  var desEs = [];

  var data = fs.readFileSync("assets_prod/location.json", "utf8");

  var locations = JSON.parse(data);

  var dataXls = []
  readXlsxFile("./Airport1.7.xlsx").then((rows) => {
    for (var i = 1; i < rows.length; i++) {
      dataXls.push({
        vi: {
          name: rows[i][1],
        },
        en: {
          name: rows[i][3],
        },
      })
    }

    for (var i = 0; i < locations.length; i++) {
      var id = new ObjectId();
  
      desMongo.push({
        _id: {
          $oid: id,
        },
        title: locations[i].name,
        type: 2,
        location_id: locations[i]._id.$oid,
        status: 1,
        localizer: {
          vi: {
            title: dataXls[i].vi.name,
          },
          en: {
            title: dataXls[i].en.name,
          },
        },
        time_zone: "+7",
        created_at: Date.now(),
        updated_at: Date.now(),
        tags: ["tripbooking", "destination_import"],
        partnership_id: "6555895d91edf2deb796c5db",
        updated_by: "655589da91edf2deb796c5dd",
        updated_by_email: "tripbooking@gmail.com",
        updated_by_name: "Admin",
        created_by: "655589da91edf2deb796c5dd",
        created_by_email: "tripbooking@gmail.com",
        created_by_name: "Admin",
      });
  
      let keywords = []
      keywords.push("tripbooking", "destination_import")
      keywords.push(locations[i].name)
      keywords.push(locations[i].city)
      keywords.push(locations[i].country)
  
      let instant_search_field = keywords.join(" ")
  
      desEs.push({
        id: id,
        title: locations[i].name,
        type: 2,
        location_id: locations[i]._id.$oid,
        location: {
          id: locations[i]._id.$oid,
          name: locations[i].name,
          full_address: locations[i].full_address,
          address: locations[i].address,
          street: locations[i].street,
          ward: locations[i].ward,
          district: locations[i].district,
          city: locations[i].city,
          country: locations[i].country,
          postal_code: locations[i].postal_code,
          lat: locations[i].lat,
          lon: locations[i].lon,
          city_code:locations[i].city_code,
          country_code: locations[i].country_code,
        },
        status: 1,
        localizer: {
          vi: {
            title: dataXls[i].vi.name,
          },
          en: {
            title: dataXls[i].en.name,
          },
        },
        time_zone: "+7",
        instant_search_field:instant_search_field,
        created_at: Date.now(),
        updated_at: Date.now(),
        geo_point: {
          lat: locations[i].lat,
          lon: locations[i].lon,
        },
        tags: ["tripbooking", "destination_import"],
        partnership_id: "6555895d91edf2deb796c5db",
        updated_by: "655589da91edf2deb796c5dd",
        updated_by_email: "tripbooking@gmail.com",
        updated_by_name: "Admin",
        created_by: "655589da91edf2deb796c5dd",
        created_by_email: "tripbooking@gmail.com",
        created_by_name: "Admin",
      });
    }
  
    fs.writeFileSync("assets_prod/destination_mongo.json", JSON.stringify(desMongo));
    fs.writeFileSync("assets_prod/destination_es.json", JSON.stringify(desEs));
  })

 

 
}

main();
