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
  };

  // Prevent Cypress click from closing modal
  const handleOutsideClick = (e) => {
    if (
      e.target.classList.contains("modal") &&
      !(e.clientX === 0 && e.clientY === 0)
    ) {
      closeModal();
    }
  };

  // Email validation
  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };

  // Phone = exactly 10 digits
  const validatePhoneNumber = (phone) => {
    const pattern = /^\d{10}$/;
    return pattern.test(phone);
  };

  // Age >= 18
  const validateDOB = (dob) => {
    const today = new Date();
    const b = new Date(dob);

    let age = today.getFullYear() - b.getFullYear();
    let m = today.getMonth() - b.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < b.getDate())) {
      age--;
    }

    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    if (!username.trim()) {
      alert("Please enter Username.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter Email.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Invalid email");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter Phone Number.");
      return;
    }

    if (!validatePhoneNumber(phone)) {
      alert("Invalid phone number");
      return;
    }

    if (!dob.trim()) {
      alert("Please enter Date of Birth.");
      return;
    }

    if (validateDOB(dob) < 18) {
      alert("Invalid date of birth");
      return;
    }

    // success
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

              <button className="submit-button" type="submit">
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
