from datetime import date, datetime

from flask import Blueprint, flash, render_template, request
from web3 import Web3

from database.db import passports_collection
from utils.blockchain import BlockchainError, verify_passport_on_chain
from utils.hash import generate_passport_hash
from utils.qr import parse_qr_payload


verifier_bp = Blueprint("verifier", __name__)


@verifier_bp.route("/verify", methods=["GET", "POST"])
def verify():
    result = None
    passport = None

    if request.method == "POST":
        qr_payload = request.form.get("qr_payload", "").strip()
        if not qr_payload:
            flash("Paste the QR payload to verify a passport.", "warning")
            return render_template("verify.html", result=result, passport=passport)

        try:
            data = parse_qr_payload(qr_payload)
            user_address = Web3.to_checksum_address(data["user_address"])
            provided_hash = data["hash"]
        except Exception:
            flash("Invalid QR payload. Expected JSON with user_address and hash.", "danger")
            return render_template("verify.html", result=result, passport=passport)

        passport = passports_collection.find_one({"user_address": user_address})
        if not passport:
            result = {
                "status": "invalid",
                "message": "Passport record not found in MongoDB.",
            }
            return render_template("verify.html", result=result, passport=passport)

        recalculated_hash = generate_passport_hash(passport)
        is_expired = datetime.strptime(passport["expiry_date"], "%Y-%m-%d").date() < date.today()

        try:
            blockchain_valid = verify_passport_on_chain(user_address, provided_hash)
        except BlockchainError as exc:
            flash(str(exc), "danger")
            return render_template("verify.html", result=result, passport=passport)

        checks = {
            "hash_matches_database": passport["hash"] == provided_hash,
            "hash_matches_recomputed": recalculated_hash == provided_hash,
            "status_is_valid": passport["status"] == "valid",
            "not_expired": not is_expired,
            "blockchain_valid": blockchain_valid,
        }

        is_valid = all(checks.values())
        result = {
            "status": "valid" if is_valid else "invalid",
            "message": "Valid Passport" if is_valid else "Invalid Passport",
            "checks": checks,
        }

    return render_template("verify.html", result=result, passport=passport)
