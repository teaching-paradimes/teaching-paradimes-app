import requests
from acdh_cfts_pyutils import TYPESENSE_CLIENT as client
from typesense.api_call import ObjectNotFound


BASE_URL = "https://raw.githubusercontent.com/teaching-paradimes/teaching-paradimes-baserow-export/main/json_dumps/"
SCHEMA_NAME = "teaching-paradimes"

print(f"fetching data from {BASE_URL}")
source_data = requests.get(f"{BASE_URL}courses.json").json()
seed_data = requests.get(f"{BASE_URL}country.json").json()

for key, value in source_data.items():
    old_values = value["country"]
    new_values = []
    for x in old_values:
        new_values.append(seed_data[f"{x['id']}"])
    value["country"] = new_values

current_schema = {
    "name": SCHEMA_NAME,
    "enable_nested_fields": True,
    "fields": [
        {"name": "id", "type": "string"},
        {"name": "course_title", "type": "string"},
        {"name": "course_type", "type": "object[]", "facet": True, "optional": True},
        {"name": "instructor", "type": "string", "facet": True, "optional": True},
        {"name": "country", "type": "object[]", "facet": True, "optional": True},
        {"name": "institute", "type": "object[]", "facet": True, "optional": True},
        {"name": "university", "type": "object[]", "facet": True, "optional": True},
        {"name": "semester", "type": "object[]", "facet": True, "optional": True},
        {"name": "discipline", "type": "object[]", "facet": True, "optional": True},
        {"name": "subdiscipline", "type": "object[]", "facet": True, "optional": True},
        {
            "name": "course_category",
            "type": "object[]",
            "facet": True,
            "optional": True,
        },
        {
            "name": "aws_specifics_evidence",
            "type": "object[]",
            "facet": True,
            "optional": True,
        },
        {
            "name": "aws_specifics_period",
            "type": "object[]",
            "facet": True,
            "optional": True,
        },
        {
            "name": "aws_specifics_space",
            "type": "object[]",
            "facet": True,
            "optional": True,
        },
        {
            "name": "aws_specifics_themes",
            "type": "object[]",
            "facet": True,
            "optional": True,
        },
    ],
}

print(f"creating collection: {SCHEMA_NAME}")
try:
    client.collections[SCHEMA_NAME].delete()
except ObjectNotFound:
    pass

_ = client.collections.create(current_schema)

schema_fields = [x["name"] for x in current_schema["fields"] if x["name"] != "id"]
schema_fields

records = []
for key, value in source_data.items():
    item = {"id": key}
    for x, y in value.items():
        if x in schema_fields:
            item[x] = y
    records.append(item)

print(f"indexing collection: {SCHEMA_NAME}")
make_index = client.collections[SCHEMA_NAME].documents.import_(records)
print(make_index)
