from datetime import date, datetime

from flask import (
    Blueprint,
    current_app,
    flash,
    redirect,
    render_template,
    request,
    session,
    url_for,
)
from web3 import Web3

from database.db import passports_collection
from utils.blockchain import BlockchainError, issue_passport, revoke_passport
from utils.hash import generate_passport_hash


admin_bp = Blueprint("admin", __name__)


def _is_logged_in():
    return session.get("admin_logged_in", False)


@admin_bp.route("/admin/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()

        if (
            username == current_app.config["ADMIN_USERNAME"]
            and password == current_app.config["ADMIN_PASSWORD"]
        ):
            session["admin_logged_in"] = True
            flash("Login successful.", "success")
            return redirect(url_for("admin.dashboard"))

        flash("Invalid admin credentials.", "danger")

    return render_template("index.html")


@admin_bp.route("/admin/logout")
def logout():
    session.clear()
    flash("Logged out successfully.", "info")
    return redirect(url_for("admin.login"))


@admin_bp.route("/admin", methods=["GET", "POST"])
def dashboard():
    if not _is_logged_in():
        return redirect(url_for("admin.login"))

    if request.method == "POST":
        form_data = {
            "user_address": request.form.get("user_address", "").strip(),
            "name": request.form.get("name", "").strip(),
            "dob": request.form.get("dob", "").strip(),
            "passport_no": request.form.get("passport_no", "").strip(),
            "nationality": request.form.get("nationality", "").strip(),
            "issue_date": request.form.get("issue_date", "").strip(),
            "expiry_date": request.form.get("expiry_date", "").strip(),
        }

        try:
            form_data["user_address"] = Web3.to_checksum_address(form_data["user_address"])
        except ValueError:
            flash("Invalid Ethereum wallet address.", "danger")
            return redirect(url_for("admin.dashboard"))

        missing_fields = [key for key, value in form_data.items() if not value]
        if missing_fields:
            flash("All passport fields are required.", "danger")
            return redirect(url_for("admin.dashboard"))

        try:
            expiry = datetime.strptime(form_data["expiry_date"], "%Y-%m-%d").date()
            issue = datetime.strptime(form_data["issue_date"], "%Y-%m-%d").date()
        except ValueError:
            flash("Issue date and expiry date must be valid dates.", "danger")
            return redirect(url_for("admin.dashboard"))

        if expiry <= issue:
            flash("Expiry date must be later than issue date.", "danger")
            return redirect(url_for("admin.dashboard"))

        passport_hash = generate_passport_hash(form_data)
        document = {
            **form_data,
            "hash": passport_hash,
            "status": "valid",
            "created_at": datetime.utcnow(),
        }

        try:
            issue_passport(form_data["user_address"], passport_hash)
            passports_collection.replace_one(
                {"user_address": form_data["user_address"]},
                document,
                upsert=True,
            )
            flash("Passport issued successfully and recorded on blockchain.", "success")
        except BlockchainError as exc:
            flash(str(exc), "danger")
        except Exception as exc:
            flash(f"Failed to issue passport: {exc}", "danger")

        return redirect(url_for("admin.dashboard"))

    passports = list(passports_collection.find().sort("created_at", -1))
    today = date.today().isoformat()
    return render_template("admin.html", passports=passports, today=today)


@admin_bp.route("/admin/revoke/<user_address>", methods=["POST"])
def revoke(user_address):
    if not _is_logged_in():
        return redirect(url_for("admin.login"))

    passport = passports_collection.find_one({"user_address": user_address})
    if not passport:
        flash("Passport not found.", "warning")
        return redirect(url_for("admin.dashboard"))

    try:
        revoke_passport(user_address)
        passports_collection.update_one(
            {"user_address": user_address},
            {"$set": {"status": "revoked", "revoked_at": datetime.utcnow()}},
        )
        flash("Passport revoked successfully.", "success")
    except BlockchainError as exc:
        flash(str(exc), "danger")
    except Exception as exc:
        flash(f"Failed to revoke passport: {exc}", "danger")

    return redirect(url_for("admin.dashboard"))
