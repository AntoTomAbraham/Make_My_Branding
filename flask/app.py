from flask import Flask,request
import pickle

app = Flask(__name__)


@app.route('/')
def hello():
    return 'RFR model Home!'

@app.route('/predict',methods=['POST'])
def predict():
    pass


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0',port=5000)