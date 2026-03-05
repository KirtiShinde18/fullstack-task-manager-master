import React from 'react'

const EmployeeNavbar = () => {
  return <>
  <nav className="navbar navbar-expand-lg alert alert-danger">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Employee Panel</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-link active" href="#">Home</a>
          <a className="nav-link" href="#">Features</a>
          <a className="nav-link" href="#">Pricing</a>
        </div>
      </div>
    </div>
  </nav>
  </>
}

export default EmployeeNavbar