import React from "react";
import "../css/home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <h2>You have total of</h2>
        <div className="data-container">
          <div className="data-frame">
            <div className="data">
              <p>30</p>
              <div className="locker-lines">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <p>Lockers Available</p>
          </div>
          <div className="data-frame">
            <div className="data">
              <p>100</p>
              <div className="locker-lines">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <p>Lockers Occupied</p>
          </div>
          <div className="data-frame">
            <div className="data">
              <p>200</p>
              <div className="locker-lines">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <p>Lockers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
