"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [carKm, setCarKm] = useState("");
  const [electricity, setElectricity] = useState("");
  const [flights, setFlights] = useState("");
  const [diet, setDiet] = useState("mixed");

  const [result, setResult] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState("");
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("carbonHistory");

    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const calculateCarbon = () => {
    const car = Number(carKm) * 0.21;
    const electric = Number(electricity) * 0.82;
    const flight = Number(flights) * 250;

    let food = 0;

    if (diet === "veg") food = 300;
    if (diet === "mixed") food = 700;
    if (diet === "meat") food = 1200;

    const total = car + electric + flight + food;

    setResult(total);

    const ecoScore = Math.max(
      0,
      100 - Math.floor(total / 50)
    );

    setScore(ecoScore);

    const updatedHistory = [...history, total];
    setHistory(updatedHistory);

    localStorage.setItem(
      "carbonHistory",
      JSON.stringify(updatedHistory)
    );

    if (total < 800) {
      setRecommendation(
        "🌱 Excellent! Your carbon footprint is already relatively low."
      );
    } else if (car >= electric && car >= flight) {
      setRecommendation(
        "🚲 Transportation is your biggest contributor. Consider public transport, cycling, or carpooling."
      );
    } else if (electric >= car && electric >= flight) {
      setRecommendation(
        "💡 Electricity usage is your biggest contributor. Switch to LED bulbs and energy-efficient appliances."
      );
    } else {
      setRecommendation(
        "✈ Air travel contributes significantly to emissions. Consider reducing flights when possible."
      );
    }
  };

  return (
    <main className="min-h-screen">
      <section className="hero">
        <div style={{ fontSize: "80px" }}>🌍</div>

<h1 className="hero-title">
  CarbonWise
</h1>

        <p className="hero-subtitle">
          Carbon Footprint Awareness Platform
        </p>

        <p className="hero-text">
          Understand, track and reduce your carbon footprint through
          personalized sustainability insights.
        </p>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🌱 Calculate</h3>
          <p>Estimate your annual carbon emissions.</p>
        </div>

        <div className="feature-card">
          <h3>📊 Track</h3>
          <p>Monitor your sustainability score.</p>
        </div>

        <div className="feature-card">
          <h3>♻ Reduce</h3>
          <p>Get personalized recommendations.</p>
        </div>
      </section>

      <section className="calculator-card">
        <h2 className="section-title">
          Carbon Calculator
        </h2>

        <label>Car KM Per Week</label>
        <input
          type="number"
          value={carKm}
          onChange={(e) => setCarKm(e.target.value)}
        />

        <label>Electricity Usage Per Month</label>
        <input
          type="number"
          value={electricity}
          onChange={(e) => setElectricity(e.target.value)}
        />

        <label>Flights Per Year</label>
        <input
          type="number"
          value={flights}
          onChange={(e) => setFlights(e.target.value)}
        />

        <label>Diet Type</label>
        <select
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        >
          <option value="veg">Vegetarian</option>
          <option value="mixed">Mixed Diet</option>
          <option value="meat">Heavy Meat Diet</option>
        </select>

        <button onClick={calculateCarbon}>
          Calculate Carbon Footprint
        </button>

        {result !== null && (
          <div className="result-card">
            <h3>Your Carbon Footprint</h3>

            <p className="big-number">
              {result.toFixed(0)} kg CO₂/year
            </p>

            <div className="score-box">
              Eco Score: {score}/100

              <p>
                {score && score >= 80
                  ? "🏆 Eco Champion"
                  : score && score >= 60
                  ? "🌿 Green Explorer"
                  : "⚠ High Impact"}
              </p>
            </div>

            <div className="trees-box">
              🌳 Trees Needed To Offset:{" "}
              {Math.ceil(result / 21)}
            </div>

            <div className="recommendation">
              <h4>Personalized Recommendation</h4>
              <p>{recommendation}</p>
            </div>

            <div className="recommendation">
              <h4>📈 Previous Assessments</h4>

              {history.length === 0 ? (
                <p>No previous calculations yet.</p>
              ) : (
                <ul>
                  {history
                    .slice(-5)
                    .reverse()
                    .map((item, index) => (
                      <li key={index}>
                        {item.toFixed(0)} kg CO₂/year
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </section>

      <footer>
        Built for PromptWars Challenge 3 🚀
      </footer>
    </main>
  );
}