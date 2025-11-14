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

  const closeModal = () => {
    setOpen(false);
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal") {
      closeModal();
    }
  };

  // -------------------------
  // VALIDATION HELPERS
  // -------------------------

  // Email pattern as you provided
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = (email) => {
    return emailPattern.test(email);
  };

  // Phone number pattern: xxx-xxx-xxxx
  const phonePattern = /^[2-9]{1}[0-9]{2}-[0-9]{3}-[0-9]{4}$/;

  const validatePhoneNumber = (phone) => {
    return phonePattern.test(phone);
  };

  // DOB validation ensuring user is 18+
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

    // Username required
    if (!username) {
      alert("Please enter Username.");
      return;
    }

    // Email required
    if (!email) {
      alert("Please enter Email.");
      return;
    }

    // Email invalid
    if (!validateEmail(email)) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // Phone required
    if (!phone) {
      alert("Please enter Phone Number.");
      return;
    }

    // Phone invalid
    if (!validatePhoneNumber(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // DOB required
    if (!dob) {
      alert("Please enter Date of Birth.");
      return;
    }

    // DOB invalid (future date or age < 18)
    if (new Date(dob) > new Date() || calculateAge(dob) < 18) {
      alert("Invalid date of birth. Date cannot be in the future.");
      return;
    }

    // SUCCESS — close modal & reset state
    closeModal();
  };

  return (
    <div className="app">
      <h2>User Details Modal</h2>

      {!open && (
        <button className="modal-open" onClick={openModal}>Open Form</button>
      )}

      {open && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <h2>Fill Details</h2>

            <form onSubmit={handleSubmit}>
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
                placeholder="123-456-7890"
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

              <button className="submit-button" type="submit">Submit</button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
