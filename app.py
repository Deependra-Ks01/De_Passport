import os

from dotenv import load_dotenv
from flask import Flask, redirect, url_for

from database.db import init_db
from routes.admin import admin_bp
from routes.user import user_bp
from routes.verifier import verifier_bp


def create_app():
    load_dotenv()

    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-key")
    app.config["ADMIN_USERNAME"] = os.getenv("ADMIN_USERNAME", "admin")
    app.config["ADMIN_PASSWORD"] = os.getenv("ADMIN_PASSWORD", "admin123")

    os.makedirs("static/qr_codes", exist_ok=True)
    init_db()

    app.register_blueprint(admin_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(verifier_bp)

    @app.route("/")
    def index():
        return redirect(url_for("admin.login"))

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)
