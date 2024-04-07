"use client";
import React, { useState, useEffect } from "react";

// Home page
export default function Home() {
  // State for the buttons
  const [buttons, setButtons] = useState([]);

  // Get buttons on first render
  useEffect(() => {
    getButtons({ target: { value: "" } });
  }, []);

  // Get buttons from the api server
  async function getButtons(e: any) {
    const name = e.target.value;
    const params = new URLSearchParams();
    params.append("btnName", name);
    const res = await fetch(
      "http://localhost:8080/buttons" + "?" + params.toString(),
    );
    const data = await res.json();
    setButtons(data);
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="flex items-center border-b border-b-2 border-grey-500 py-2">
          <input
            className="border-2 border-gray-300 bg-white w-full h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="text"
            placeholder="Search"
            onChange={(e) => getButtons(e)}
          />
        </div>
        {buttons.map((button) => (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            key={button.BtnName}
            style={{ width: button.Breite, height: button.Höhe }}
          >
            {button.BtnName}
          </button>
        ))}
      </div>
    </>
  );
}
