import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          id: 1,
          title: 'Getting Started with React',
          excerpt: 'Learn the basics of React and how to create your first component.',
          date: '2024-03-20',
          category: 'React Basics'
        },
        {
          id: 2,
          title: 'Understanding React Hooks',
          excerpt: 'A comprehensive guide to React Hooks and their use cases.',
          date: '2024-03-19',
          category: 'React Hooks'
        },
        {
          id: 3,
          title: 'React Router Tutorial',
          excerpt: 'Learn how to implement routing in your React applications.',
          date: '2024-03-18',
          category: 'Routing'
        },
        {
          id: 4,
          title: 'State Management in React',
          excerpt: 'Explore different approaches to state management in React applications.',
          date: '2024-03-17',
          category: 'State Management'
        }
      ]
    };
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="posts">
        <h1>All Posts</h1>
        <div className="posts-list">
          {posts.map(post => (
            <article key={post.id} className="post-item">
              <div className="post-header">
                <h2>{post.title}</h2>
                <span className="category">{post.category}</span>
              </div>
              <p>{post.excerpt}</p>
              <div className="post-meta">
                <span className="date">{post.date}</span>
                <Link to={`/posts/${post.id}`} className="read-more">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }
}

export default Posts; 