import hashlib
import json


HASH_FIELDS = [
    "user_address",
    "name",
    "dob",
    "passport_no",
    "nationality",
    "issue_date",
    "expiry_date",
]


def build_passport_payload(data):
    normalized = {}
    for field in HASH_FIELDS:
        value = data.get(field, "")
        normalized[field] = str(value).strip()
    normalized["user_address"] = normalized["user_address"].lower()
    return normalized


def generate_passport_hash(data):
    payload = build_passport_payload(data)
    encoded = json.dumps(payload, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(encoded.encode("utf-8")).hexdigest()
