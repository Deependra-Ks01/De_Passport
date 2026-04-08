import json
import os

import qrcode


def generate_qr_code(user_address, passport_hash):
    payload = {
        "user_address": user_address,
        "hash": passport_hash,
    }
    qr_data = json.dumps(payload)

    filename = f"{user_address.lower()}.png"
    output_dir = os.path.join("static", "qr_codes")
    os.makedirs(output_dir, exist_ok=True)
    filepath = os.path.join(output_dir, filename)

    image = qrcode.make(qr_data)
    image.save(filepath)

    return filepath.replace("\\", "/")


def parse_qr_payload(raw_payload):
    if isinstance(raw_payload, dict):
        return raw_payload
    return json.loads(raw_payload)
