from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI(title="Customer Churn Prediction API")

# Izinkan frontend Next.js mengakses backend FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("churn_model.pkl")


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
    return {"message": "Customer Churn Prediction API is running"}


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