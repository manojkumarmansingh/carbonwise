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
        "🚲 Use public transport, carpool, or cycle for short trips."
      );
    } else if (electric > car && electric > flight) {
      setRecommendation(
        "💡 Reduce electricity consumption and switch to LED lighting."
      );
    } else {
      setRecommendation(
        "✈ Reduce air travel and choose sustainable transportation."
      );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100">

      {/* HERO */}
      <section className="text-center py-16 px-6">
        <h1 className="text-6xl font-bold text-green-700">
          🌍 CarbonWise
        </h1>

        <p className="text-xl text-gray-700 mt-4">
          Carbon Footprint Awareness Platform
        </p>

        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Understand, track and reduce your carbon footprint through
          personalized sustainability insights.
        </p>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-2">
              🌱 Calculate
            </h3>
            <p>
              Estimate your annual carbon emissions from daily activities.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-2">
              📊 Track
            </h3>
            <p>
              Monitor your environmental impact and sustainability score.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-2">
              ♻ Reduce
            </h3>
            <p>
              Receive recommendations to lower your emissions.
            </p>
          </div>

        </div>
      </section>

      {/* CALCULATOR */}
      <section className="max-w-3xl mx-auto px-6 pb-16">

        <div className="bg-white shadow-xl rounded-2xl p-8">

          <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
            Carbon Calculator
          </h2>

          <label className="font-medium">
            Car KM per week
          </label>

          <input
            type="number"
            value={carKm}
            onChange={(e) => setCarKm(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <label className="font-medium">
            Electricity Usage per Month
          </label>

          <input
            type="number"
            value={electricity}
            onChange={(e) => setElectricity(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <label className="font-medium">
            Flights per Year
          </label>

          <input
            type="number"
            value={flights}
            onChange={(e) => setFlights(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <label className="font-medium">
            Diet Type
          </label>

          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="w-full border p-3 rounded-lg mb-6"
          >
            <option value="veg">Vegetarian</option>
            <option value="mixed">Mixed Diet</option>
            <option value="meat">Heavy Meat Diet</option>
          </select>

          <button
            onClick={calculateCarbon}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg font-bold"
          >
            Calculate Footprint
          </button>

          {result !== null && (
            <div className="mt-8">

              <div className="bg-green-50 rounded-xl p-6 text-center">

                <h3 className="text-2xl font-bold">
                  Your Carbon Footprint
                </h3>

                <p className="text-4xl text-green-700 font-bold mt-3">
                  {result.toFixed(0)} kg CO₂/year
                </p>

                <p className="text-xl mt-4">
                  Eco Score: {score}/100
                </p>

                <p className="mt-3">
                  🌳 Trees Needed: {Math.ceil(result / 21)}
                </p>

              </div>

              <div className="bg-blue-50 rounded-xl p-6 mt-6">

                <h3 className="font-bold text-xl mb-2">
                  Personalized Recommendation
                </h3>

                <p>{recommendation}</p>

              </div>

            </div>
          )}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-gray-600">
        Built for PromptWars Challenge 3 🚀
      </footer>

    </main>
  );
}