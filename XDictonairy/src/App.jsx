import { useState } from "react";

function App() {
  const [dictionary] = useState([
    { word: "React", meaning: "A JavaScript library for building user interfaces." },
    { word: "Component", meaning: "A reusable building block in React." },
    { word: "State", meaning: "An object that stores data for a component." }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState("");

  const handleSearch = () => {
    const found = dictionary.find(
      (item) => item.word.toLowerCase() === searchTerm.toLowerCase()
    );

    if (found) {
      setResult(found.meaning);
    } else {
      setResult("Word not found in the dictionary.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* TEST EXPECTATION */}
      <h1>Dictionary App</h1>

      <input
        type="text"
        placeholder="Search for a word..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", width: "250px", marginRight: "10px" }}
      />

      <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
        Search
      </button>

      {/* TEST EXPECTATION: "Definition:" MUST BE PRESENT ALWAYS */}
      <div style={{ marginTop: "20px" }}>
        <h3>Definition:</h3>

        {/* If nothing searched yet → show empty <p></p> */}
        {result ? <p>{result}</p> : <p></p>}
      </div>
    </div>
  );
}

export default App;
