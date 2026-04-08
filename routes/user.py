from datetime import date, datetime

from flask import Blueprint, flash, render_template, request
from web3 import Web3

from database.db import passports_collection
from utils.qr import generate_qr_code


user_bp = Blueprint("user", __name__)


@user_bp.route("/user", methods=["GET", "POST"])
def dashboard():
    passport = None
    qr_path = None
    is_expired = False

    if request.method == "POST":
        user_address = request.form.get("user_address", "").strip()
        if not user_address:
            flash("Please enter your Ethereum address.", "warning")
            return render_template("user.html", passport=passport, qr_path=qr_path)

        try:
            user_address = Web3.to_checksum_address(user_address)
        except ValueError:
            flash("Invalid Ethereum address.", "danger")
            return render_template("user.html", passport=passport, qr_path=qr_path)

        passport = passports_collection.find_one({"user_address": user_address})
        if not passport:
            flash("No passport found for this address.", "warning")
            return render_template("user.html", passport=passport, qr_path=qr_path)

        qr_path = generate_qr_code(passport["user_address"], passport["hash"])
        expiry_date = datetime.strptime(passport["expiry_date"], "%Y-%m-%d").date()
        is_expired = expiry_date < date.today()

    return render_template(
        "user.html",
        passport=passport,
        qr_path=qr_path,
        is_expired=is_expired,
    )
