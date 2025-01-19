from flask import Flask, render_template, request, redirect, url_for
import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = Flask(__name__)

# Authentification Google Sheets
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
client = gspread.authorize(creds)
sheet = client.open("Paris_Sportifs").sheet1

@app.route("/")
def index():
    # Récupérer les données des paris et de la bankroll depuis Google Sheets
    data = sheet.get_all_records()
    bankroll = data[-1]["Bankroll"] if data else 0
    return render_template("index.html", bankroll=bankroll, data=data)

@app.route("/ajouter_pari", methods=["POST"])
def ajouter_pari():
    date = request.form.get("date")
    sport = request.form.get("sport")
    equipe = request.form.get("equipe")
    paris = request.form.get("paris")
    bankroll = request.form.get("bankroll")
    mise = request.form.get("mise")
    cote = request.form.get("cote")
    # Ajout d'un pari à Google Sheets (à personnaliser selon votre logique)
    sheet.append_row([date, sport, equipe, paris, bankroll, mise, cote])
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)
