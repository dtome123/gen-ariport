jq -c '.[] | {"index": {"_index": "destinations", "_id": .id}}, .' assets_prod/destination_es.json > assets_prod/import_destination_es.json

curl -s -u 'sng:sunnygarden6868' -H "Content-Type: application/x-ndjson" -XPOST https://es2.demen.vn/_bulk --data-binary @assets_prod/import_destination_es.json