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
    // close when clicking on overlay with class "modal"
    if (e.target && e.target.className === "modal") {
      closeModal();
    }
  };

  // handleSubmit wired to form onSubmit so tests using form submit will call this
  const handleSubmit = (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    const { username, email, phone, dob } = formData;

    // Validate Username
    if (!username) {
      alert("Please enter Username.");
      return;
    }

    // Validate Email
    if (!email) {
      alert("Please enter Email.");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // Validate Phone
    if (!phone) {
      alert("Please enter Phone Number.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // Validate Date of Birth
    if (!dob) {
      alert("Please enter Date of Birth.");
      return;
    }
    const today = new Date();
    const entered = new Date(dob);
    if (entered > today) {
      alert("Invalid date of birth. Date cannot be in the future.");
      return;
    }

    // success -> reset UI
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

            {/* form element present so Cypress can query it */}
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />

              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <label htmlFor="phone">Phone Number:</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <label htmlFor="dob">Date of Birth:</label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              >

              </input>

              <div style={{ marginTop: "12px" }}>
                {/* button type="submit" so form submission triggers handleSubmit */}
                <button className="submit-button" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
