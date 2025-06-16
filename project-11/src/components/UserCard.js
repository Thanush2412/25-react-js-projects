import React from 'react';

function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="user-header">
        <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="avatar" />
        <div className="user-info">
          <h2>{user.name || user.login}</h2>
          <p className="username">@{user.login}</p>
          {user.bio && <p className="bio">{user.bio}</p>}
        </div>
      </div>
      
      <div className="user-stats">
        <div className="stat">
          <span className="stat-value">{user.public_repos}</span>
          <span className="stat-label">Repositories</span>
        </div>
        <div className="stat">
          <span className="stat-value">{user.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat">
          <span className="stat-value">{user.following}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>

      {user.location && (
        <div className="user-details">
          <p><i className="fas fa-map-marker-alt"></i> {user.location}</p>
        </div>
      )}

      <div className="user-actions">
        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="profile-link"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}

export default UserCard; 