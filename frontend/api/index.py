from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os

app = FastAPI(title="Customer Churn Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "churn_model.pkl")
model = joblib.load(MODEL_PATH)


class CustomerData(BaseModel):
    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float


@app.get("/")
def root():
    return {"message": "Customer Churn Prediction API is running on Vercel"}


@app.post("/predict")
def predict(data: CustomerData):
    input_df = pd.DataFrame([data.model_dump()])

    prediction = model.predict(input_df)[0]
    probability = model.predict_proba(input_df)[0]

    prob_not_churn = float(probability[0])
    prob_churn = float(probability[1])

    if prob_churn >= 0.7:
        risk_level = "Tinggi"
    elif prob_churn >= 0.4:
        risk_level = "Sedang"
    else:
        risk_level = "Rendah"

    return {
        "prediction": "Churn" if prediction == 1 else "Tidak Churn",
        "probability_churn": round(prob_churn, 4),
        "probability_not_churn": round(prob_not_churn, 4),
        "risk_level": risk_level,
    }