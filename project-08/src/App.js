import React from 'react';
import Accordion from './components/Accordion';
import './App.css';

function App() {
  const accordionItems = [
    {
      title: "What is React?",
      content: "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications."
    },
    {
      title: "What are React Hooks?",
      content: "Hooks are functions that let you 'hook into' React state and lifecycle features from function components. Hooks don't work inside classes — they let you use React without classes. React provides a few built-in Hooks like useState and useEffect."
    },
    {
      title: "What is JSX?",
      content: "JSX is a syntax extension for JavaScript. It was written to be used with React. JSX code looks a lot like HTML. What JSX does is to make it easier to write React components by allowing you to write HTML-like code in your JavaScript."
    },
    {
      title: "What is Virtual DOM?",
      content: "The Virtual DOM is a concept where a virtual representation of a UI is kept in memory and synced with the 'real' DOM by a library such as ReactDOM. This process is called reconciliation. This approach enables the declarative API of React: You tell React what state you want the UI to be in, and it makes sure the DOM matches that state."
    }
  ];

  return (
    <div className="App">
      <h1>React Accordion</h1>
      <Accordion items={accordionItems} allowMultiple={false} />
    </div>
  );
}

export default App;
