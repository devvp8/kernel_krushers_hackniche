import React from "react"

export default function Home(){
    return(
        <div className="home-container">
            <table>
                <tr>
                    <td>
      <div className="text-container">
        <p className="main-heading">Introducing the CodeGenerator</p>
        <p className="sub-heading">One Solution to Solve Problems and</p>
        <p className="sub-heading">Generate Code or Queries on the Database</p>
      </div>
      <div className="buttons-container">
        <button className="primary-button">Generate Codes</button>
        <button className="secondary-button">Generate Query</button>
      </div></td>
      <td>
      <div className="image-container">
        <img src="https://miro.medium.com/v2/resize:fit:12000/0*tQQ7SLPOJfxaG4ZY" alt="CodeGenerator" className="home-image"/>
      </div>
      </td>
      </tr>
      </table>
    </div>
        
    );
}