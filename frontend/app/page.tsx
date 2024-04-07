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

  //Render the Site
  return (
    <>
      <div className="container mx-auto">
        <div className="flex items-center border-b border-b-2 border-grey-500 py-2">
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            type="text"
            placeholder="Search"
            onChange={(e) => getButtons(e)}
          />
        </div>
        {buttons.map((button) => (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg m-2 shadow-md"
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
