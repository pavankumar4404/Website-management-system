import React from 'react';
import './cssdashboard.css';

function Dashboard() {
    return (
        <div className='container'>

                <a href="/books">
                <div className="card">
                    <div className="card-header">
                        <div className="card-header-color orange-light"></div>
                        <div className="card-header-text">Websites</div>
                    </div>
           
                </div>
                </a>
                <a href="/teams">
                <div className="card">
                    <div className="card-header">
                        <div className="card-header-color pink-light"></div>
                        <div className="card-header-text">Team Management</div>
                    </div>
                </div>
                </a>
                <a href="/employees">
                <div className="card">
                    <div className="card-header">
                        <div className="card-header-color blue-light"></div>
                        <div className="card-header-text">Employee Management</div>
                    </div>

                </div>
                </a>


                <a href="/emails">
                <div className="card">
                    <div className="card-header">
                        <div className="card-header-color orange-dark"></div>
                        <div className="card-header-text">Email Master</div>
                    </div>
                </div>
                </a>
                <a href="/vulnerabilities">
                <div className="card">
                    <div className="card-header">
                        <div className="card-header-color pink-dark"></div>
                        <div className="card-header-text">Vulnerability Action</div>
                    </div>
                </div>
                </a>

            
            
          
        </div>
    )
}

export default Dashboard;