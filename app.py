from xml.etree.ElementTree import tostring
from flask import Flask,request,jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle

df = pd.read_csv('data.csv')
x = df.iloc[:,[0,2,3,5,8,9,10]]

model = pickle.load(open('model.pkl','rb'))

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'RFR model Home!'

@app.route('/predict',methods=['POST'])
def predict():
    
    basePrice = {'Mumbai':150000,'Delhi':100000,'Bangalore':84000,'Kolkata':75000,'Chennai':20000}
    
    newData = pd.get_dummies(pd.DataFrame({'Location':[request.args.get("Location")],'NatureOfLocation':[request.args.get("NOL")],'LocationType':[request.args.get("LocType")],'Category':[request.args.get("Category")],'AgeGroup':[request.args.get("AgeGroup")],'Size(sqft)':[int(request.args.get("Size"))],'PPI':[request.args.get("PPI")],'Light':[request.args.get("Light")]}))
    dummies_frame = pd.get_dummies(x,columns=["Location","NatureOfLocation","LocationType","Category","AgeGroup","PPI","Light"])
    newData = newData.reindex(columns = dummies_frame.columns, fill_value=0)
    
    return jsonify({"price":(round(model.predict(newData)[0],0))+basePrice[request.args.get("Location")]})


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0',port=5000)
    

#http://localhost:5000/predict?Location=Bangalore&NOL=NH&LocType=Rural&Category=Hoardings&Size=600&PPI=Low&Light=No