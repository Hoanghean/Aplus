import React, { useEffect } from "react";
import { addSemester } from "../assets/main"; // Đường dẫn tương đối
import { dataRender, targetDisplay } from "../assets/plugin";

export default function GradeComponent() {
  return (
    <>
      <div className="container mt-3 borderX pt-4 pb-4">
        <div className="col-md-12">
          <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>
            Xem <a href="#huong-dan">hướng dẫn</a>
          </h3>
          <div className="form-group">
            <textarea
              onInput={(e) => dataRender(e.target)}
              placeholder="Nhập bảng điểm của bạn..."
              id="transcript"
              className="form-control"
              rows="12"
            ></textarea>
          </div>
          <div className="row pt-4 justify-content-center">
            <div className="col-auto">
              <span className="btn btn-success">
                <i className="fa fa-bullseye"></i> Mục tiêu
              </span>
            </div>
            <div className="col-auto">
              <select
                className="form-select"
                onChange={(e) => targetDisplay(e.target)}
              >
                <option value="gioi">Bằng Giỏi</option>
                <option value="xs">Bằng Xuất sắc</option>
                <option value="kha">Bằng Khá</option>
              </select>
            </div>
          </div>
          <div id="goals"></div>
        </div>
      </div>

      <div id="listHK"></div>

      <div className="container pt-4" style={{ marginBottom: "12rem" }}>
        <div className="row justify-content-center">
          <div className="col-auto">
            <button onClick={addSemester} className="btn btn-primary">
              <i className="fa fa-plus-circle"></i> Thêm học kỳ
            </button>
          </div>
        </div>
      </div>

      <div className="fixed-bottom">
        <div className="container">
          <div
            className="row border"
            style={{ background: "#c2ddf8", borderRadius: "12px 12px 0 0" }}
          >
            <div className="col-12 col-md-4">
              <div className="p-1 d-flex justify-content-center">
                Mục tiêu:{" "}
                <span className="gpacpa" id="target">
                  3.2
                </span>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="p-1 d-flex justify-content-center">
                Hiện tại:{" "}
                <span className="gpacpa" id="current">
                  0.00
                </span>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="p-1 d-flex justify-content-center">
                Cải thiện:{" "}
                <span className="gpacpa" id="improv">
                  0.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
