import React from "react";
import { Link } from "react-router-dom";

export default function HomeComponent() {
  return (
    <>
      <div className="container mt-3 borderX pt-4 pb-4 mb-5">
        <center>
          <h3>
            Chào mừng bạn đến với{" "}
            <strong>
              A<sup>+</sup>
            </strong>
          </h3>
        </center>
        <div className="container mt-4 mb-5">
          <div className="row">
            <div className="col-md-4 col-sm-12 mb-4 SM">
              <Link to="/grade" className="card">
                <div className="card-body">
                  <i className="card-icon fa fa-graduation-cap"></i>
                  <h5 className="card-title">GPA/CPA</h5>
                  <p className="card-text">Tính điểm TBC học kỳ và năm học</p>
                </div>
              </Link>
            </div>
            <div className="col-md-4 col-sm-12 mb-4 SM">
              <Link to="/tai-lieu" className="card">
                <div className="card-body">
                  <i className="card-icon fa fa-file"></i>
                  <h5 className="card-title">Tài liệu</h5>
                  <p className="card-text">Tìm tài liệu/học liệu số</p>
                </div>
              </Link>
            </div>
            <div className="col-md-4 col-sm-12 mb-4 SM">
              <Link to="#" className="card">
                <div className="card-body">
                  <i className="card-icon fa fa-exchange"></i>
                  <h5 className="card-title">Trao đổi</h5>
                  <p className="card-text">Trao đổi giáo trình</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <p>
            Đây là trang chia sẻ{" "}
            <b>
              <i>Tài liệu số</i>
            </b>{" "}
            và trao đổi{" "}
            <b>
              <i>Giáo trình</i>
            </b>{" "}
            học
          </p>
          <br />
          <div>1. Tài liệu số: là những file PDF, Word, Powerpoint,...</div>
          <div>
            <ul style={{ textAlign: "left" }}>
              <li>
                Đây có thể là những tài liệu hay mà bạn sưu tầm được, và muốn
                chia sẻ cho mọi người cùng tiếp cận
              </li>
              <li>
                Hoặc là nơi các bạn chia sẻ các tài liệu đọc thử và có trả phí
                để đọc bản hoàn thiện
              </li>
            </ul>
            Tôi mong muốn sẽ được các bạn quan tâm và ủng hộ vào kho tàng tri
            thức này
          </div>
          <br />
          <div>2. Giáo trình</div>
          <div>
            <ul style={{ textAlign: "left" }}>
              <li>
                Tôi biết có nhiều bạn muốn pass giáo trình cũ, và cũng có nhiều
                bạn muốn mua giáo trình để học
              </li>
              <li>
                Vậy nên các bạn có thể đăng thông tin về giáo trình mình muốn
                trao đổi
              </li>
            </ul>
          </div>
          <div>
            Ngoài ra, tôi còn cung cấp thêm một công cụ tính GPA và CPA, với 1
            chức năng dành riêng cho sinh viên Sư phạm Huế
          </div>
        </div>
      </div>
    </>
  );
}
