import React from "react";
import InputTables from "./InputTables";
import OutputQuery from "./OutputQuery";

export default function MainContent()
{
    let response = true;   //get response from backend

    return (
        <div className="app">
            <header className="header">
                <h1>Query Generator</h1>
            </header>
            <main className="main-content">
                <h2>How can I help you today?</h2>
                <div className="card-container">
                    <InputTables />
                </div>
                {response ? <OutputQuery /> : null}
                <div className="chat-container">
                    <h2>Ask your Query here: </h2>
                    <input type="text" className="chat-input" placeholder="Coming soon!" />
                    <button className="chat-button">Send</button>
                </div>
            </main>
        </div>
    );
}