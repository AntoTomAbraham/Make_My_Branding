from xml.etree.ElementTree import tostring
from flask import Flask,request,jsonify
import pandas as pd
import numpy as np
import pickle

df = pd.read_csv('data.csv')
x = df.iloc[:,[0,2,3,4,5,9,10]]

model = pickle.load(open('model.pkl','rb'))

app = Flask(__name__)


@app.route('/')
def hello():
    return 'RFR model Home!'

@app.route('/predict',methods=['POST'])
def predict():
    
    newData = pd.get_dummies(pd.DataFrame({'Location':[request.args.get("Location")],'NatureOfLocation':[request.args.get("NOL")],'LocationType':[request.args.get("LocType")],'Category':[request.args.get("Category")],'Size(sqft)':[int(request.args.get("Size"))],'PPI':[request.args.get("PPI")],'Light':[request.args.get("Light")]}))
    dummies_frame = pd.get_dummies(x,columns=["Location","NatureOfLocation","LocationType","Category","PPI","Light"])
    newData = newData.reindex(columns = dummies_frame.columns, fill_value=0)
    
    return jsonify({"price":round(model.predict(newData)[0],0)})


    


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0',port=5000)
    

#http://localhost:5000/predict?Location=Bangalore&NOL=NH&LocType=Rural&Category=Hoardings&Size=600&PPI=Low&Light=No