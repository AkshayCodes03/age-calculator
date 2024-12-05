'use client'

import { useState } from "react";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birth.getFullYear();

    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      calculatedAge--;
    }

    setAge(calculatedAge);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "400px", margin: "0 auto", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Age Calculator</h2>
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        style={{ padding: "10px", marginBottom: "10px", width: "100%", boxSizing: "border-box" }}
      />
      <button
        onClick={calculateAge}
        style={{ padding: "10px 20px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Calculate Age
      </button>
      {age !== null && (
        <p style={{ marginTop: "10px", fontSize: "16px" }}>
          {`Your age is: ${age} ${age === 1 ? "year" : "years"} old.`}
        </p>
      )}
    </div>
  );
}
