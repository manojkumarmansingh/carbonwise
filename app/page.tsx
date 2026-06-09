"use client";

import { useState } from "react";

export default function Home() {
  const [carKm, setCarKm] = useState("");
  const [electricity, setElectricity] = useState("");
  const [flights, setFlights] = useState("");
  const [diet, setDiet] = useState("mixed");

  const [result, setResult] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState("");

  const calculateCarbon = () => {
    const car = Number(carKm) * 0.21;
    const electric = Number(electricity) * 0.82;
    const flight = Number(flights) * 250;

    let food = 1000;

    if (diet === "veg") food = 500;
    if (diet === "meat") food = 1800;

    const total = car + electric + flight + food;

    setResult(total);
    setScore(Math.max(0, 100 - Math.floor(total / 50)));

    if (car > electric && car > flight) {
      setRecommendation(
        "Use public transport, carpool, or cycle for short trips."
      );
    } else if (electric > car && electric > flight) {
      setRecommendation(
        "Reduce electricity usage and switch to LED lighting."
      );
    } else {
      setRecommendation(
        "Reduce air travel and choose sustainable transportation."
      );
    }
  };

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-2">
          🌍 CarbonWise - Carbon Footprint Awareness Platform
        </h1>

        <p className="text-center text-gray-600 mb-6">
         Calculate your emissions and discover practical ways to live sustainably.
        </p>

        <input
          type="number"
          placeholder="Car KM per week"
          value={carKm}
          onChange={(e) => setCarKm(e.target.value)}
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="number"
          placeholder="Electricity usage per month"
          value={electricity}
          onChange={(e) => setElectricity(e.target.value)}
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="number"
          placeholder="Flights per year"
          value={flights}
          onChange={(e) => setFlights(e.target.value)}
          className="w-full border p-3 rounded mb-3"
        />

        <select
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="veg">Vegetarian</option>
          <option value="mixed">Mixed Diet</option>
          <option value="meat">Heavy Meat Diet</option>
        </select>

        <button
          onClick={calculateCarbon}
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
        >
          Calculate
        </button>

        {result !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold">
              Your Carbon Footprint
            </h2>

            <p className="text-2xl text-green-700 mt-2">
              {result.toFixed(0)} kg CO₂/year
            </p>

            <p className="text-lg font-semibold mt-3">
              Eco Score: {score}/100
            </p>

            <p className="mt-3 text-green-700">
              🌳 Trees needed to offset: {Math.ceil(result / 21)}
            </p>

            <div className="mt-4 p-3 bg-green-100 rounded-lg">
              <p className="font-medium">
                💡 Recommendation
              </p>
              <p>{recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}