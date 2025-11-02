import React, { useState } from "react";
import "./XSpellCheck.css"; // Import CSS file

const customDictionary = {
  teh: "the",
  wrok: "work",
  fot: "for",
  exampl: "example"
};

function XSpellCheck() {
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);

    const words = inputText
      .split(/\s+/)
      .map((word) => word.replace(/[^a-zA-Z]/g, "").toLowerCase())
      .filter((word) => word.length > 0);

    let foundSuggestion = "";

    for (let word of words) {
      if (customDictionary[word]) {
        foundSuggestion = `Did you mean: ${customDictionary[word]}?`;
        break; // Only first wrong spelling
      }
    }

    setSuggestion(foundSuggestion);
  };

  return (
    <div className="spellcheck-container">
      <h2>XSpellCheck</h2>
      <textarea
        rows="5"
        cols="50"
        placeholder="Enter text..."
        value={text}
        onChange={handleChange}
      ></textarea>
      <p className="suggestion">{suggestion}</p>
    </div>
  );
}

export default XSpellCheck;
