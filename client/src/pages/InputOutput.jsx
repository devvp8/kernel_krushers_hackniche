import React from 'react'

const InputOutput = () => {
  return (
    <>
      <div className='side-bar-container'>
        <h1></h1>
      </div>
      <div className="app">
        <header className="header">
          <h1>Code Generator</h1>
        </header>
        <main className="main-content">
          <h2>How can I help you today?</h2>
          <div className="card-container">
            <div className="card brainstorm">
              <h3>Brainstorm content ideas</h3>
              <p>
                Generate content ideas for various media, including blog posts, articles, social media captions, email newsletters, and more.
              </p>
            </div>
            <div className="card write-email">
              <h3>Write an email</h3>
              <p>
                Craft compelling emails for different purposes, such as requesting a quote, pitching a product, or following up with a lead.
              </p>
            </div>
            <div className="card explain-concept">
              <h3>Explain a concept</h3>
              <p>
                Break down complex topics into easy-to-understand explanations, suitable for both adults and children.
              </p>
            </div>
            <div className="card more-options">
              <h3>More options</h3>
              <p>
                Explore Codex's other capabilities, including writing different kinds of creative content, translating languages, and answering your questions in an informative way.
              </p>
            </div>
          </div>
          <div className="chat-container">
            <h2>Ask your Code here: </h2>
            <input type="text" className="chat-input" placeholder="Coming soon!" />
            <button className="chat-button" disabled>
              Send
            </button>
          </div>
        </main>
      </div>
    </>
  )
}

export default InputOutput