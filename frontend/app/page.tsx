"use client";

import { useState } from "react";

type PredictionResult = {
  prediction: string;
  probability_churn: number;
  probability_not_churn: number;
  risk_level: string;
};

type CustomerForm = {
  gender: string;
  SeniorCitizen: number;
  Partner: string;
  Dependents: string;
  tenure: number;
  PhoneService: string;
  MultipleLines: string;
  InternetService: string;
  OnlineSecurity: string;
  OnlineBackup: string;
  DeviceProtection: string;
  TechSupport: string;
  StreamingTV: string;
  StreamingMovies: string;
  Contract: string;
  PaperlessBilling: string;
  PaymentMethod: string;
  MonthlyCharges: number;
  TotalCharges: number;
};

const initialForm: CustomerForm = {
  gender: "Female",
  SeniorCitizen: 0,
  Partner: "Yes",
  Dependents: "No",
  tenure: 12,
  PhoneService: "Yes",
  MultipleLines: "No",
  InternetService: "Fiber optic",
  OnlineSecurity: "No",
  OnlineBackup: "Yes",
  DeviceProtection: "No",
  TechSupport: "No",
  StreamingTV: "Yes",
  StreamingMovies: "No",
  Contract: "Month-to-month",
  PaperlessBilling: "Yes",
  PaymentMethod: "Electronic check",
  MonthlyCharges: 75.5,
  TotalCharges: 906,
};

export default function Home() {
  const [form, setForm] = useState<CustomerForm>(initialForm);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof CustomerForm, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data: PredictionResult = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Gagal terhubung ke backend FastAPI.");
    } finally {
      setLoading(false);
    }
  };

  const churnPercent = result ? result.probability_churn * 100 : 0;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            Machine Learning Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-bold">
            Customer Churn Prediction
          </h1>
          <p className="mt-3 max-w-3xl text-slate-400">
            Dashboard untuk membantu tim customer retention memprediksi
            pelanggan yang berpotensi berhenti menggunakan layanan.
          </p>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <InfoCard title="Model" value="Random Forest" />
          <InfoCard title="Backend" value="FastAPI" />
          <InfoCard title="Frontend" value="Next.js" />
          <InfoCard title="Output" value="Risk Level" />
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="space-y-6 lg:col-span-2">
            <FormSection title="Informasi Dasar Pelanggan">
              <Select label="Gender" value={form.gender} options={["Female", "Male"]} onChange={(v) => handleChange("gender", v)} />
              <Select label="Senior Citizen" value={String(form.SeniorCitizen)} options={["0", "1"]} onChange={(v) => handleChange("SeniorCitizen", Number(v))} />
              <Select label="Partner" value={form.Partner} options={["Yes", "No"]} onChange={(v) => handleChange("Partner", v)} />
              <Select label="Dependents" value={form.Dependents} options={["Yes", "No"]} onChange={(v) => handleChange("Dependents", v)} />
              <Input label="Tenure (bulan)" value={form.tenure} onChange={(v) => handleChange("tenure", Number(v))} />
            </FormSection>

            <FormSection title="Informasi Layanan">
              <Select label="Phone Service" value={form.PhoneService} options={["Yes", "No"]} onChange={(v) => handleChange("PhoneService", v)} />
              <Select label="Multiple Lines" value={form.MultipleLines} options={["Yes", "No", "No phone service"]} onChange={(v) => handleChange("MultipleLines", v)} />
              <Select label="Internet Service" value={form.InternetService} options={["DSL", "Fiber optic", "No"]} onChange={(v) => handleChange("InternetService", v)} />
              <Select label="Online Security" value={form.OnlineSecurity} options={["Yes", "No", "No internet service"]} onChange={(v) => handleChange("OnlineSecurity", v)} />
              <Select label="Online Backup" value={form.OnlineBackup} options={["Yes", "No", "No internet service"]} onChange={(v) => handleChange("OnlineBackup", v)} />
              <Select label="Device Protection" value={form.DeviceProtection} options={["Yes", "No", "No internet service"]} onChange={(v) => handleChange("DeviceProtection", v)} />
              <Select label="Tech Support" value={form.TechSupport} options={["Yes", "No", "No internet service"]} onChange={(v) => handleChange("TechSupport", v)} />
              <Select label="Streaming TV" value={form.StreamingTV} options={["Yes", "No", "No internet service"]} onChange={(v) => handleChange("StreamingTV", v)} />
              <Select label="Streaming Movies" value={form.StreamingMovies} options={["Yes", "No", "No internet service"]} onChange={(v) => handleChange("StreamingMovies", v)} />
            </FormSection>

            <FormSection title="Informasi Kontrak dan Tagihan">
              <Select label="Contract" value={form.Contract} options={["Month-to-month", "One year", "Two year"]} onChange={(v) => handleChange("Contract", v)} />
              <Select label="Paperless Billing" value={form.PaperlessBilling} options={["Yes", "No"]} onChange={(v) => handleChange("PaperlessBilling", v)} />
              <Select label="Payment Method" value={form.PaymentMethod} options={["Electronic check", "Mailed check", "Bank transfer (automatic)", "Credit card (automatic)"]} onChange={(v) => handleChange("PaymentMethod", v)} />
              <Input label="Monthly Charges" value={form.MonthlyCharges} onChange={(v) => handleChange("MonthlyCharges", Number(v))} />
              <Input label="Total Charges" value={form.TotalCharges} onChange={(v) => handleChange("TotalCharges", Number(v))} />
            </FormSection>

            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900"
            >
              {loading ? "Memproses Prediksi..." : "Prediksi Risiko Churn"}
            </button>
          </section>

          <aside className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <h2 className="text-2xl font-bold">Hasil Prediksi</h2>
            <p className="mt-2 text-sm text-slate-400">
              Output dari model Random Forest melalui REST API FastAPI.
            </p>

            {!result ? (
              <div className="mt-8 rounded-2xl border border-dashed border-slate-700 p-6 text-center text-slate-400">
                Belum ada hasil. Isi data pelanggan lalu klik prediksi.
              </div>
            ) : (
              <div className="mt-6 space-y-5">
                <div className="rounded-2xl bg-slate-800 p-5">
                  <p className="text-sm text-slate-400">Status Prediksi</p>
                  <p className="mt-2 text-3xl font-bold">
                    {result.prediction}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-800 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">
                      Probabilitas Churn
                    </p>
                    <p className="font-bold">{churnPercent.toFixed(2)}%</p>
                  </div>

                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-700">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${churnPercent}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-800 p-5">
                  <p className="text-sm text-slate-400">Risk Level</p>
                  <p className="mt-2 text-2xl font-bold">
                    {result.risk_level}
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
                  <p className="font-semibold text-blue-300">
                    Rekomendasi Bisnis
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    {getRecommendation(result.risk_level)}
                  </p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

function getRecommendation(risk: string) {
  if (risk === "Tinggi") {
    return "Hubungi pelanggan segera, tawarkan promo retensi, diskon kontrak tahunan, atau peningkatan kualitas layanan.";
  }

  if (risk === "Sedang") {
    return "Pantau pelanggan secara berkala dan berikan penawaran khusus agar pelanggan tetap menggunakan layanan.";
  }

  return "Pelanggan relatif stabil. Pertahankan kualitas layanan dan lakukan engagement ringan.";
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-bold">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
      />
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}