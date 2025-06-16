import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    avatar: null,
    social: {
      twitter: '',
      github: '',
      linkedin: '',
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    // Load saved profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      if (parsedProfile.avatar) {
        setAvatarPreview(parsedProfile.avatar);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setProfile((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage('');

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setIsSaving(false);
      setSaveMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>Profile</h1>
        {!isEditing && (
          <button
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-avatar">
          <div className="avatar-container">
            <img
              src={avatarPreview || '/default-avatar.png'}
              alt="Profile"
              className="avatar-image"
            />
            {isEditing && (
              <label className="avatar-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  hidden
                />
                Change Photo
              </label>
            )}
          </div>
        </div>

        <div className="profile-details">
          {isEditing ? (
            <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  placeholder="Your location"
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  name="website"
                  value={profile.website}
                  onChange={handleInputChange}
                  placeholder="https://your-website.com"
                />
              </div>

              <div className="social-links">
                <h3>Social Links</h3>
                <div className="form-group">
                  <label>Twitter</label>
                  <input
                    type="url"
                    name="social.twitter"
                    value={profile.social.twitter}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/username"
                  />
                </div>

                <div className="form-group">
                  <label>GitHub</label>
                  <input
                    type="url"
                    name="social.github"
                    value={profile.social.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="form-group">
                  <label>LinkedIn</label>
                  <input
                    type="url"
                    name="social.linkedin"
                    value={profile.social.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save-button"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <h2>{profile.name || 'Your Name'}</h2>
              <p className="email">{profile.email || 'your.email@example.com'}</p>
              
              {profile.bio && (
                <div className="bio">
                  <h3>About</h3>
                  <p>{profile.bio}</p>
                </div>
              )}

              {profile.location && (
                <div className="location">
                  <h3>Location</h3>
                  <p>{profile.location}</p>
                </div>
              )}

              {profile.website && (
                <div className="website">
                  <h3>Website</h3>
                  <a href={profile.website} target="_blank" rel="noopener noreferrer">
                    {profile.website}
                  </a>
                </div>
              )}

              {(profile.social.twitter || profile.social.github || profile.social.linkedin) && (
                <div className="social-links">
                  <h3>Social Links</h3>
                  <div className="social-icons">
                    {profile.social.twitter && (
                      <a
                        href={profile.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon twitter"
                      >
                        Twitter
                      </a>
                    )}
                    {profile.social.github && (
                      <a
                        href={profile.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon github"
                      >
                        GitHub
                      </a>
                    )}
                    {profile.social.linkedin && (
                      <a
                        href={profile.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon linkedin"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {saveMessage && (
        <div className="save-message">{saveMessage}</div>
      )}
    </div>
  );
};

export default Profile; 