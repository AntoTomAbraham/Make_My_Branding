import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import pickle

df = pd.read_csv('data.csv')
x = df.iloc[:,[0,1,3,4,5,6,9,10,11]] #independent
y = df.iloc[:,-1] #dependent

#encoding categorical data
x_d = pd.get_dummies(x, columns=["State","Location","NatureOfLocation","LocationType","Category","AgeGroup","PPI","Light"])

#train test split
from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test = train_test_split(x_d,y,test_size=0.2,random_state=42)

#training RFR
from sklearn.ensemble import RandomForestRegressor
regressor = RandomForestRegressor(n_estimators=33,random_state=0)
regressor.fit(x_train,y_train)

pickle.dump(regressor,open('model.pkl','wb'))
pickle.load(open('model.pkl','rb'))

newData = pd.get_dummies(pd.DataFrame({'State':['Maharastra'],'Location':['Mumbai'],'NatureOfLocation':['CBD'],'LocationType':['Urban'],'Category':['Hoardings'],'Size(sqft)':[2000],'AgeGroup':['MiddleAged'],'PPI':['Medium'],'Light':['No']}))
dummies_frame = pd.get_dummies(x,columns=["State","Location","NatureOfLocation","LocationType","Category","AgeGroup","PPI","Light"])
newData = newData.reindex(columns = dummies_frame.columns, fill_value=0)
print(type(newData))
pred = regressor.predict(newData)
print((pred[0]))