jq -c '.[] | {"index": {"_index": "airports", "_id": .id}}, .' assets_prod/airport_es.json > assets_prod/import_airport_es.json

curl -s -u 'sng:sunnygarden6868' -H "Content-Type: application/x-ndjson" -XPOST https://es2.demen.vn/_bulk --data-binary @assets_prod/import_airport_es.json