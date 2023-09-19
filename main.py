from flask import Flask, render_template

app = Flask(__name__)


# the website is created under /show/info, and its relationship with index
# if users access the website /show/info, it auto executes index
@app.route("/show/login")
def index():
    # render_template is a file for Flask to open automatically and run,
    # then return the information to user
    # it will go to templates file to find index by default
    return render_template("index.html")

if __name__ == "__main__":
    app.run()