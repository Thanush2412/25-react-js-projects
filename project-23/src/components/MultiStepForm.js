import React, { useState } from 'react';
import './MultiStepForm.css';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Address Information
    street: '',
    city: '',
    state: '',
    zipCode: '',
    // Account Information
    username: '',
    password: '',
    confirmPassword: '',
    // Preferences
    newsletter: false,
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
          newErrors.phone = 'Phone number must be 10 digits';
        }
        break;

      case 2:
        if (!formData.street.trim()) {
          newErrors.street = 'Street address is required';
        }
        if (!formData.city.trim()) {
          newErrors.city = 'City is required';
        }
        if (!formData.state.trim()) {
          newErrors.state = 'State is required';
        }
        if (!formData.zipCode.trim()) {
          newErrors.zipCode = 'ZIP code is required';
        } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
          newErrors.zipCode = 'ZIP code is invalid';
        }
        break;

      case 3:
        if (!formData.username.trim()) {
          newErrors.username = 'Username is required';
        } else if (formData.username.length < 4) {
          newErrors.username = 'Username must be at least 4 characters';
        }
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;

      case 4:
        if (!formData.terms) {
          newErrors.terms = 'You must accept the terms and conditions';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h3>Personal Information</h3>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h3>Address Information</h3>
            <div className="form-group">
              <label htmlFor="street">Street Address</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className={errors.street ? 'error' : ''}
              />
              {errors.street && <span className="error-message">{errors.street}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? 'error' : ''}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? 'error' : ''}
              />
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={errors.zipCode ? 'error' : ''}
              />
              {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h3>Account Information</h3>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step">
            <h3>Preferences</h3>
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                />
                Subscribe to newsletter
              </label>
            </div>
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className={errors.terms ? 'error' : ''}
                />
                I accept the terms and conditions
              </label>
              {errors.terms && <span className="error-message">{errors.terms}</span>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form">
      <div className="progress-bar">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`progress-step ${stepNumber <= step ? 'active' : ''}`}
          >
            <div className="step-number">{stepNumber}</div>
            <div className="step-label">
              {stepNumber === 1 && 'Personal'}
              {stepNumber === 2 && 'Address'}
              {stepNumber === 3 && 'Account'}
              {stepNumber === 4 && 'Preferences'}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div className="form-navigation">
          {step > 1 && (
            <button type="button" onClick={handleBack} className="back-button">
              Back
            </button>
          )}
          {step < 4 ? (
            <button type="button" onClick={handleNext} className="next-button">
              Next
            </button>
          ) : (
            <button type="submit" className="submit-button">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm; 