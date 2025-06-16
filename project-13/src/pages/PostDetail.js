import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        id: parseInt(this.props.match.params.id),
        title: 'Getting Started with React',
        content: `
          React is a powerful JavaScript library for building user interfaces. 
          It was developed by Facebook and has become one of the most popular 
          front-end libraries in the world.

          In this article, we'll explore the fundamental concepts of React and 
          how to get started with building your first React application.

          ## Key Concepts

          1. Components
          React applications are built using components, which are reusable pieces 
          of UI that can contain both markup and logic.

          2. Props
          Props are used to pass data from parent to child components. They are 
          read-only and help maintain the unidirectional data flow in React.

          3. State
          State is used to manage data that can change over time within a component. 
          When state changes, React re-renders the component to reflect the updates.

          ## Getting Started

          To create a new React application, you can use Create React App:

          \`\`\`bash
          npx create-react-app my-app
          cd my-app
          npm start
          \`\`\`

          This will set up a new React project with all the necessary dependencies 
          and configuration.
        `,
        date: '2024-03-20',
        author: 'John Doe',
        category: 'React Basics'
      }
    };
  }

  render() {
    const { post } = this.state;

    return (
      <div className="post-detail">
        <article className="post-content">
          <header className="post-header">
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span className="author">By {post.author}</span>
              <span className="date">{post.date}</span>
              <span className="category">{post.category}</span>
            </div>
          </header>
          <div className="post-body">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
        <div className="post-navigation">
          <Link to="/posts" className="back-link">
            ← Back to Posts
          </Link>
        </div>
      </div>
    );
  }
}

export default PostDetail; 