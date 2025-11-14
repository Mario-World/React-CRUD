import React, { useState } from "react";
import "./App.css";

function App() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  });

  const openModal = () => setOpen(true);

  // Do NOT reset form here (important for Cypress)
  const closeModal = () => {
    setOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal") {
      closeModal();
    }
  };

  // -------------------------
  // VALIDATION HELPERS
  // -------------------------

  // Email regex (your updated pattern)
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validateEmail = (email) => emailPattern.test(email);

  // Phone regex — EXACTLY 10 digits (per new requirement)
  const phonePattern = /^\d{10}$/;
  const validatePhoneNumber = (phone) => phonePattern.test(phone);

  // DOB — must be valid + must be at least 18
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // -------------------------
  // FORM SUBMIT HANDLER
  // -------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    // 1️⃣ USERNAME — Blank Check
    if (!username.trim()) {
      alert("Please enter Username.");
      return;
    }

    // 2️⃣ EMAIL — Blank Check
    if (!email.trim()) {
      alert("Please enter Email.");
      return;
    }

    // 3️⃣ EMAIL — Format Check
    if (!validateEmail(email)) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // 4️⃣ PHONE — Blank Check
    if (!phone.trim()) {
      alert("Please enter Phone Number.");
      return;
    }

    // 5️⃣ PHONE — 10 Digit Check
    if (!validatePhoneNumber(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // 6️⃣ DOB — Blank Check
    if (!dob.trim()) {
      alert("Please enter Date of Birth.");
      return;
    }

    // 7️⃣ DOB — Future date or underage
    const birth = new Date(dob);
    const now = new Date();

    if (birth > now || calculateAge(dob) < 18) {
      alert("Invalid date of birth. Date cannot be in the future.");
      return;
    }

    // SUCCESS → Reset form + close modal
    setFormData({ username: "", email: "", phone: "", dob: "" });
    closeModal();
  };

  return (
    <div className="app">
      <h2>User Details Modal</h2>

      {!open && (
        <button className="modal-open" onClick={openModal}>
          Open Form
        </button>
      )}

      {open && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <h2>Fill Details</h2>

            <form onSubmit={handleSubmit} noValidate>
              
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />

              <label htmlFor="email">Email Address:</label>
              <input
                id="email"
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <label htmlFor="phone">Phone Number:</label>
              <input
                id="phone"
                type="text"
                placeholder="10-digit number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <label htmlFor="dob">Date of Birth:</label>
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              />

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
