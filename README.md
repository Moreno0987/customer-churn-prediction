# Customer Churn Prediction System

## Deskripsi Proyek

Proyek ini merupakan implementasi Machine Learning untuk memprediksi kemungkinan pelanggan berhenti menggunakan layanan (Customer Churn Prediction).

Model yang digunakan adalah Random Forest Classifier dengan optimasi menggunakan GridSearchCV.

Model kemudian diimplementasikan ke dalam REST API menggunakan FastAPI dan diintegrasikan dengan aplikasi web berbasis Next.js sehingga pengguna dapat melakukan prediksi secara interaktif melalui browser.

---

## Latar Belakang

Customer churn merupakan kondisi ketika pelanggan berhenti menggunakan layanan yang diberikan oleh perusahaan.

Dengan melakukan prediksi churn lebih awal, perusahaan dapat:

* Mengidentifikasi pelanggan yang berisiko berhenti berlangganan.
* Menyusun strategi retensi pelanggan.
* Mengurangi kehilangan pelanggan.
* Meningkatkan pendapatan perusahaan.

---

## Dataset

Dataset yang digunakan:

IBM Telco Customer Churn Dataset

Dataset berisi informasi pelanggan telekomunikasi seperti:

* Gender
* Senior Citizen
* Partner
* Dependents
* Tenure
* Phone Service
* Internet Service
* Contract
* Payment Method
* Monthly Charges
* Total Charges

Target yang diprediksi:

Churn

* Yes = Pelanggan berhenti berlangganan
* No = Pelanggan tetap berlangganan

---

## Teknologi yang Digunakan

### Machine Learning

* Python
* Pandas
* NumPy
* Scikit-Learn
* Joblib

### Backend

* FastAPI
* Uvicorn

### Frontend

* Next.js
* TypeScript
* Tailwind CSS

---

## Tahapan Pengerjaan

### 1. Data Preparation

Tahapan yang dilakukan:

* Menghapus kolom customerID
* Mengubah TotalCharges menjadi numerik
* Menangani missing values
* Encoding target Churn
* Feature preprocessing menggunakan:

  * StandardScaler
  * OneHotEncoder
  * ColumnTransformer

### 2. Training Model

Model yang digunakan:

RandomForestClassifier

Parameter awal:

* n_estimators = 100
* random_state = 42

### 3. Evaluasi Model

Metode evaluasi:

* Accuracy
* Precision
* Recall
* F1 Score
* Confusion Matrix
* Classification Report

### 4. Optimasi Model

Optimasi dilakukan menggunakan:

GridSearchCV

Parameter tuning:

* n_estimators
* max_depth
* min_samples_split
* min_samples_leaf

### 5. Penyimpanan Model

Model terbaik disimpan menggunakan:

joblib.dump()

File model:

```text
churn_model.pkl
```

---

## Struktur Proyek

```text
customer-churn-ml/
│
├── backend/
│   ├── main.py
│   ├── churn_model.pkl
│   ├── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── public/
│   ├── package.json
│
├── README.md
└── .gitignore
```

---

## Menjalankan Backend

Masuk ke folder backend:

```bash
cd backend
```

Aktifkan virtual environment:

```bash
venv\Scripts\activate
```

Install dependency:

```bash
pip install -r requirements.txt
```

Jalankan server:

```bash
python -m uvicorn main:app --reload
```

Backend berjalan pada:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Menjalankan Frontend

Masuk ke folder frontend:

```bash
cd frontend
```

Install dependency:

```bash
npm install
```

Buat file:

```text
.env.local
```

Isi:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Jalankan aplikasi:

```bash
npm run dev
```

Frontend berjalan pada:

```text
http://localhost:3000
```

---

## API Documentation

### GET /

Mengecek status API.

Response:

```json
{
  "message": "Customer Churn Prediction API is running"
}
```

---

### POST /predict

Melakukan prediksi churn pelanggan.

Request:

```json
{
  "gender": "Female",
  "SeniorCitizen": 0,
  "Partner": "Yes",
  "Dependents": "No",
  "tenure": 12,
  "PhoneService": "Yes",
  "MultipleLines": "No",
  "InternetService": "Fiber optic",
  "OnlineSecurity": "No",
  "OnlineBackup": "Yes",
  "DeviceProtection": "No",
  "TechSupport": "No",
  "StreamingTV": "Yes",
  "StreamingMovies": "No",
  "Contract": "Month-to-month",
  "PaperlessBilling": "Yes",
  "PaymentMethod": "Electronic check",
  "MonthlyCharges": 75.5,
  "TotalCharges": 906.0
}
```

Response:

```json
{
  "prediction": "Churn",
  "probability_churn": 0.6333,
  "probability_not_churn": 0.3667,
  "risk_level": "Sedang"
}
```

---

## Hasil Akhir

Aplikasi mampu:

* Menerima input data pelanggan.
* Mengirim data ke REST API FastAPI.
* Melakukan prediksi menggunakan model Random Forest.
* Menampilkan probabilitas churn.
* Menampilkan tingkat risiko pelanggan.
* Memberikan rekomendasi bisnis berdasarkan hasil prediksi.

---

## Pengembang

Nama: Excel Moreno & Bayu Jati 

Program Studi Informatika

Primakara University

Mata Kuliah Pembelajaran Mesin

Semester Genap 2025/2026
