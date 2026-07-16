from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from gee_service import get_yearly_ndvi
from analytics import analyze_change
from report_service import generate_report
import ee

load_dotenv()

app = Flask(__name__)
CORS(app)

client = MongoClient(os.getenv("MONGO_URI"))
db = client["terrasight"]
collection = db["detections"]

@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.json
    aoi = data["aoi"]
    start_year = int(data["start_year"])
    end_year = int(data["end_year"])

    region = ee.Geometry.Polygon(aoi)

    yearly = get_yearly_ndvi(region, start_year, end_year)
    changes = analyze_change(yearly)

    result = {
        "yearly": yearly,
        "changes": changes
    }

    collection.insert_one(result)

    return jsonify(result)

@app.route("/report", methods=["POST"])
def report():
    filename = generate_report(request.json)
    return send_file(filename, as_attachment=True)

@app.route("/admin", methods=["GET"])
def admin():
    return jsonify(list(collection.find({}, {"_id":0})))

if __name__ == "__main__":
    app.run(debug=True)
