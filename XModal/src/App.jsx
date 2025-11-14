import React, { useState } from 'react';

const Form = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [errors, setErrors] = useState({});

  // Email validation regex (general check for valid format)
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validateEmail = (email) => emailPattern.test(email);

  // Phone validation (check exactly 10 digits)
  const phonePattern = /^\d{10}$/; // Matches exactly 10 digits
  const validatePhoneNumber = (phone) => phonePattern.test(phone);

  // Date of Birth validation
  const validateDOB = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };
  
  const isAdult = (dob) => validateDOB(dob) >= 18;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required.'; // Blank email check
    else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email.';
    
    if (!phone) newErrors.phone = 'Phone number is required.'; // Blank phone check
    else if (!validatePhoneNumber(phone)) newErrors.phone = 'Phone number must be exactly 10 digits.';
    
    if (!dob) newErrors.dob = 'Date of birth is required.'; // Blank DOB check
    else if (!isAdult(dob)) newErrors.dob = 'You must be at least 18 years old.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // Proceed with form submission (e.g., send data to an API or store in state)
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        
        <div>
          <label>Phone Number:</label>
          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        
        <div>
          <label>Date of Birth:</label>
          <input 
            type="date" 
            value={dob} 
            onChange={(e) => setDob(e.target.value)} 
          />
          {errors.dob && <span className="error">{errors.dob}</span>}
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;