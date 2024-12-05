'use client'

import { useEffect } from "react";

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

  // Send the height of the iframe content to the parent window
  const sendHeight = () => {
    const height = document.body.scrollHeight;
    window.parent.postMessage({ iframeHeight: height }, "*");
  };

  useEffect(() => {
    sendHeight(); // Send height on component load
    window.addEventListener("resize", sendHeight); // Update height on resize
    return () => {
      window.removeEventListener("resize", sendHeight);
    };
  }, [age, birthDate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Age Calculator
        </h2>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={calculateAge}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          Calculate Age
        </button>
        {age !== null && (
          <p className="mt-4 text-center text-lg text-gray-700">
            {`Your age is: ${age} ${age === 1 ? "year" : "years"} old.`}
          </p>
        )}
      </div>
    </div>
  );
}
