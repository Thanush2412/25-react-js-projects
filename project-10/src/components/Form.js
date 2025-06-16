import React, { useState } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'username':
        if (!value) {
          error = 'Username is required';
        } else if (value.length < 3) {
          error = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = 'Username can only contain letters, numbers, and underscores';
        }
        break;

      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = 'Invalid email address';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;

      case 'age':
        if (!value) {
          error = 'Age is required';
        } else if (isNaN(value) || value < 18 || value > 120) {
          error = 'Age must be between 18 and 120';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, formData[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched
    const newTouched = {};
    Object.keys(formData).forEach(key => {
      newTouched[key] = true;
    });
    setTouched(newTouched);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error);
    
    if (!hasErrors) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Form submitted successfully!');
      // Reset form
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: ''
      });
      setTouched({});
      setErrors({});
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Registration Form</h2>
      
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.username && errors.username ? 'error' : ''}
        />
        {touched.username && errors.username && (
          <div className="error-message">{errors.username}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.email && errors.email ? 'error' : ''}
        />
        {touched.email && errors.email && (
          <div className="error-message">{errors.email}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.password && errors.password ? 'error' : ''}
        />
        {touched.password && errors.password && (
          <div className="error-message">{errors.password}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <div className="error-message">{errors.confirmPassword}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.age && errors.age ? 'error' : ''}
        />
        {touched.age && errors.age && (
          <div className="error-message">{errors.age}</div>
        )}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default Form; 