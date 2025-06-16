import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="about">
        <section className="about-content">
          <h1>About Our Blog</h1>
          <p>
            Welcome to our React-focused blog where we share knowledge, tutorials,
            and insights about web development and React programming.
          </p>
          
          <h2>Our Mission</h2>
          <p>
            Our mission is to help developers learn and master React through
            practical examples, clear explanations, and real-world applications.
          </p>

          <h2>What We Cover</h2>
          <ul>
            <li>React fundamentals and best practices</li>
            <li>Advanced React patterns and techniques</li>
            <li>State management solutions</li>
            <li>Performance optimization</li>
            <li>Testing and debugging</li>
          </ul>

          <h2>Join Our Community</h2>
          <p>
            We believe in the power of community learning. Feel free to engage with
            our content, share your thoughts, and contribute to the discussion.
          </p>
        </section>
      </div>
    );
  }
}

export default About; 