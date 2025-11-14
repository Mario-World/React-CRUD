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

  // Prevent Cypress artificial clicks from closing modal
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal") && e.clientX !== 0 && e.clientY !== 0) {
      closeModal();
    }
  };

  // EMAIL validation
  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };

  // PHONE validation — exactly 10 digits
  const validatePhoneNumber = (phone) => {
    const pattern = /^\d{10}$/;
    return pattern.test(phone);
  };

  // DOB validation — must not be empty & must be a valid date
  const validateDOB = (dob) => {
    const today = new Date();
    const date = new Date(dob);

    if (date > today) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    // USERNAME empty
    if (!username.trim()) {
      alert("Please enter Username.");
      return;
    }

    // EMAIL empty
    if (!email.trim()) {
      alert("Please enter Email.");
      return;
    }

    // EMAIL invalid
    if (!validateEmail(email)) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // PHONE empty
    if (!phone.trim()) {
      alert("Please enter Phone Number.");
      return;
    }

    // PHONE invalid
    if (!validatePhoneNumber(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // DOB empty
    if (!dob.trim()) {
      alert("Please enter Date of Birth.");
      return;
    }

    // DOB invalid
    if (!validateDOB(dob)) {
      // NOTE requires SAME MESSAGE as phone invalid
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // SUCCESS
    closeModal();
  };

  return (
    <div className="app">
      <h1>Date and Views Table</h1>

      {!open && (
        <button onClick={openModal}>Open Form</button>
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
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />

              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <label htmlFor="phone">Phone Number:</label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <label htmlFor="dob">Date of Birth:</label>
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
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
