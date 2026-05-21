from flask import Flask, render_template, request, jsonify

from checker import check_password
from entropy import calculate_entropy
from ai_suggestions import improve_password
from breach_checker import check_breach

app = Flask(__name__)

@app.route("/")
def home():

    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.json

    password = data.get("password")

    result = check_password(password)

    entropy = calculate_entropy(password)

    suggestion = improve_password(password)

    breach_count = check_breach(password)

    if entropy < 40:
        crack = "Instantly"
    elif entropy < 60:
        crack = "Several Years"
    else:
        crack = "Millions of Years"

    return jsonify({

        "strength": result["strength"],

        "score": result["score"],

        "entropy": entropy,

        "suggestion": suggestion,

        "breach": breach_count,

        "crack": crack
    })

if __name__ == "__main__":

    app.run(debug=True)