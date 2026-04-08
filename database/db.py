import os

from dotenv import load_dotenv
from pymongo import MongoClient


load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017/")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "digital_passport")

client = MongoClient(MONGO_URI)
db = client[MONGO_DB_NAME]
passports_collection = db["passports"]


def init_db():
    passports_collection.create_index("user_address", unique=True)
    passports_collection.create_index("passport_no", unique=True)

