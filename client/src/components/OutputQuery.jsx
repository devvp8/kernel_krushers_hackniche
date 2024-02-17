import React from "react";

export default function OutputQuery() {
    // Function to handle test query click
    const handleTestQueryClick = () => {
        // Logic to handle the test query action
        console.log("Test query clicked");
    };

    return (
        <div className="output-query-container">
            <h2>Query Output:</h2>
            <div className="query-and-button-container">
                <div className="query-container">
                    
                    <p className="result-query">SELECT * FROM student WHERE student.id = 3</p>
                </div>
                <button className="test-query-button" onClick={handleTestQueryClick}>
                    Test Query
                </button>
            </div>
        </div>
    );
}
