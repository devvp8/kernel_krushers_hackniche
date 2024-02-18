import React from "react";
import utilsContext from "../context/utilsContext";

export default function OutputQuery() {
    const [sidebarData, setSidebarData, mainContentInput, setMainContentInput, queryResponse, setQueryResponse] = React.useContext(utilsContext);   //Global Context

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
                    <p className="result-query">{queryResponse.response[0]}</p>
                </div>
                <button className="test-query-button" onClick={handleTestQueryClick}>
                    Copy Output
                </button>
            </div>
        </div>
    );
}
