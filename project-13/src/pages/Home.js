import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredPosts: [
        {
          id: 1,
          title: 'Getting Started with React',
          excerpt: 'Learn the basics of React and how to create your first component.',
          date: '2024-03-20'
        },
        {
          id: 2,
          title: 'Understanding React Hooks',
          excerpt: 'A comprehensive guide to React Hooks and their use cases.',
          date: '2024-03-19'
        },
        {
          id: 3,
          title: 'React Router Tutorial',
          excerpt: 'Learn how to implement routing in your React applications.',
          date: '2024-03-18'
        }
      ]
    };
  }

  render() {
    const { featuredPosts } = this.state;

    return (
      <div className="home">
        <section className="hero">
          <h1>Welcome to Our Blog</h1>
          <p>Discover the latest articles about web development and React</p>
        </section>

        <section className="featured-posts">
          <h2>Featured Posts</h2>
          <div className="posts-grid">
            {featuredPosts.map(post => (
              <article key={post.id} className="post-card">
                <h3>{post.title}</h3>
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
        </section>
      </div>
    );
  }
}

export default Home; 