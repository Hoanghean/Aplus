import React from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <Link to="/"><h1 style={{ color: "#fff", marginLeft: "2rem" }}>
          A<sup>+</sup>
        </h1></Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarOffcanvas"
          aria-controls="navbarOffcanvas"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-start"
          tabIndex={1}
          id="navbarOffcanvas"
          aria-labelledby="navbarOffcanvasLabel"
        >
          <div
            className="offcanvas-header"
            style={{ background: "#007fff", color: "#fff" }}
          >
            <h1 className="offcanvas-title" id="navbarOffcanvasLabel">
              A<sup>+</sup>
            </h1>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body" style={{ marginLeft: "2rem" }}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  Giới thiệu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gpacpa">
                  Tính GPA/CPA
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
