import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: {
      email: true,
      push: false,
      updates: true,
      marketing: false,
    },
    language: 'en',
    timezone: 'UTC',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleThemeChange = (theme) => {
    setSettings((prev) => ({ ...prev, theme }));
    // Apply theme immediately
    document.documentElement.setAttribute('data-theme', theme);
  };

  const handleNotificationChange = (type) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  const handleLanguageChange = (language) => {
    setSettings((prev) => ({ ...prev, language }));
  };

  const handleTimezoneChange = (timezone) => {
    setSettings((prev) => ({ ...prev, timezone }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage('');

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('userSettings', JSON.stringify(settings));
      setIsSaving(false);
      setSaveMessage('Settings saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      
      <div className="settings-section">
        <h2>Appearance</h2>
        <div className="theme-options">
          <button
            className={`theme-option ${settings.theme === 'light' ? 'active' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            Light
          </button>
          <button
            className={`theme-option ${settings.theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            Dark
          </button>
          <button
            className={`theme-option ${settings.theme === 'system' ? 'active' : ''}`}
            onClick={() => handleThemeChange('system')}
          >
            System
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="notification-options">
          <label className="notification-option">
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={() => handleNotificationChange('email')}
            />
            Email Notifications
          </label>
          <label className="notification-option">
            <input
              type="checkbox"
              checked={settings.notifications.push}
              onChange={() => handleNotificationChange('push')}
            />
            Push Notifications
          </label>
          <label className="notification-option">
            <input
              type="checkbox"
              checked={settings.notifications.updates}
              onChange={() => handleNotificationChange('updates')}
            />
            Product Updates
          </label>
          <label className="notification-option">
            <input
              type="checkbox"
              checked={settings.notifications.marketing}
              onChange={() => handleNotificationChange('marketing')}
            />
            Marketing Emails
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>Language & Region</h2>
        <div className="language-timezone">
          <div className="select-group">
            <label>Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div className="select-group">
            <label>Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleTimezoneChange(e.target.value)}
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="CST">Central Time</option>
              <option value="PST">Pacific Time</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button
          className="save-button"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
        {saveMessage && (
          <span className="save-message">{saveMessage}</span>
        )}
      </div>
    </div>
  );
};

export default Settings;