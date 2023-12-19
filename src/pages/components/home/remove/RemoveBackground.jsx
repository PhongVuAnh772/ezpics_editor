import React, { useEffect, useRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import videoRemoving2 from "./background-remover1.mp4";
import "./RemoveBackground.css";
import video from "./en1.6b3b0bc4.mp4";
import using from "./easy-use.png";
import Button from "@mui/material/Button";
import bgBanner from "./bg-banner.png";
import removeStep1 from "./remove_bg_step_1.png";
import removeStep2 from "./remove_bg_step_2.png";
import removeFeature1 from "./remove_bg_feature_1.png";
import removeStep3 from "./remove_bg_step_3.png";
import iconPerformance1 from "./icon-performance-1.svg";
import iconPerformance2 from "./icon-performance-2.svg";
import iconPerformance3 from "./icon-performance-3.svg";
import iconPerformance4 from "./icon-performance-4.svg";
import bgAsking from './bg-asking.png'
import video2 from './background-remover1 (1).gif'
import iosstore from './ios.png'
import ggplay from './ggplay.png'

function RemoveBackground() {
  const open = useOutletContext();
  const drawerWidth = 240;

  const Main = styled("main")(({ theme }) => ({
    // flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
    }),
  }));
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    window.scrollX = 0;
  }, []);

  return (
    <Main open={open} style={{ paddingTop: "3%", flex: 1 }}>
      <div className="header">
        <div className="header-text">
          <h1 className="header-text__content">Xóa hình ảnh</h1>
          <h1 className="header-text__content">Nền tiện lợi và nhanh</h1>
          <h1 className="header-text__content">chóng</h1>
          <p class="text-decs">
            Remover nền trực tuyến dễ dàng nhất từ ​​trước đến nay
          </p>
          
          <Button
            variant="contained"
            size="medium"
            style={{
              marginTop: 20,
              width: "250px",
              height: "60px",
              alignSelf: "center",
              textTransform: "none",
              color: "white",
              backgroundColor: "rgb(81, 100, 255)",
              borderRadius: 30,
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Dùng thử ngay
          </Button>
          <img
            alt=""
            src={bgBanner}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <video
          width="720"
          height="540"
          autoPlay
          ref={videoRef}
          style={{ marginTop: "5%", borderRadius: 20 }}
          muted
          loop
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <img
            alt=""
            src={video1}
                        style={{ minWidth: "100%", height: "auto" }}

          /> */}
      </div>
      <div className="content-remove">
        <h1>
          Làm cách nào để sử dụng công cụ tách nền online bằng AI trên Ezpics
          RB?
        </h1>
        <p className="content-description__up">
          Ezpics RB - <b>Xóa nền trực tuyến</b> là công cụ hỗ trợ AI cho phép
          người dùng dễ dàng xóa phông của hình ảnh trực tuyến. Tạo nền trong
          suốt, loại bỏ nền cho bất kỳ hình ảnh nào. Dưới đây là hướng dẫn từng
          bước về cách sử dụng công cụ của chúng tôi. Truy cập trang web Ezpics.
          Nhấp vào{" "}
          <span
            style={{
              color: "rgb(81, 100, 255)",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Remove Background
          </span>{" "}
          trên tiêu đề và...
        </p>
        <div className="list-step-remove">
          <div className="step-initial-remove">
            <img
              alt=""
              src={removeStep1}
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <div className="step-title-remove">
              <div className="number-title__container-remove">1</div>
              <p style={{ marginLeft: 10, fontWeight: 600, fontSize: "14px" }}>
                Tải ảnh lên
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgb(37, 38, 56)",
                lineHeight: "20px",
              }}
            >
              Tải lên hoặc Kéo và thả hình ảnh vào khung "Tải ảnh lên" để bắt
              đầu <b>chỉnh sửa với Ezpics RB</b>.
            </p>
          </div>
          <div
            className="step-initial-remove"
            style={{ paddingLeft: "5%", paddingRight: "5%", borderRadius: 10 }}
          >
            <img
              alt=""
              src={removeStep2}
              style={{ maxWidth: "100%", height: "auto", borderRadius: 10 }}
            />
            <div className="step-title-remove">
              <div className="number-title__container-remove">2</div>
              <p style={{ marginLeft: 10, fontWeight: 600, fontSize: "14px" }}>
                Xóa nền
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgb(37, 38, 56)",
                lineHeight: "20px",
              }}
            >
              Đợi vài giây để công nghệ AI sẽ xóa nền tự động
            </p>
          </div>
          <div className="step-initial-remove">
            <img
              alt=""
              src={removeStep3}
              style={{ maxWidth: "100%", height: "auto", borderRadius: 10 }}
            />
            <div className="step-title-remove">
              <div className="number-title__container-remove">3</div>
              <p style={{ marginLeft: 10, fontWeight: 600, fontSize: "14px" }}>
                Tải xuống & chia sẻ
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgb(37, 38, 56)",
                lineHeight: "20px",
              }}
            >
              Nhấp vào nút <b>Tải xuống</b> hoặc dùng trên <b>Editor Ezpics</b>
            </p>
          </div>
        </div>
      </div>
      <div className="introduce-app__container">
        <div className="introduce-app">
          <div>
            <h1 className="introduce-app__title">
              Tải ứng dụng Ezpics về điện thoại !
            </h1>
            <p className="introduce-app__desc">
              Hãy thử tải ứng dụng Ezpics của chúng tôi để tận hưởng trải sửa
              ảnh trực tuyến tối ưu nhất
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              onClick={() =>
                (window.location.href =
                  "https://apps.apple.com/vn/app/ezpics-d%C3%B9ng-l%C3%A0-th%C3%ADch/id1659195883?l=vi?l=vi")
              }
              src={iosstore}
              alt=""
              style={{ width: 180, height: 43,cursor: "pointer" }}
            />
            <img
              onClick={() =>
                (window.location.href =
                  "https://play.google.com/store/apps/details?id=vn.ezpics&hl=vi&gl=US")
              }
              src={ggplay}
              alt=""
              style={{ width: 180, height: 63,cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      <div className="advantage-app__container">
        <h2 className="advantage-app__header">
          Xóa nền ảnh với chất lượng cao
        </h2>
        <h1 className="advantage-app__header">
          với <span className="advantage-app__header--span">Công nghệ AI</span>
        </h1>
        <div className="advantage-app__content">
          <div className="advantage-app__content-wrapper">
            <div className="advantage-app__content--text---wrapper">
              <h3 className="advantage-app__content--text---header">
                Xóa nền, tách nền hình ảnh của bạn.
              </h3>
              <p className="advantage-app__content--text---content">
                Bạn có thể dùng nó để phục vụ cho nhu cầu cá nhân: Tạo ảnh thẻ,
                chụp ảnh thời trang, chụp ảnh quảng cáo... Ezpics sẽ giúp bạn có
                một bức ảnh hoàn hảo với chức năng xóa phông nền trực tuyến.
              </p>
            </div>
            <img
              alt=""
              src={removeFeature1}
              style={{ maxWidth: "50%", height: "auto", borderRadius: 10 }}
            />
          </div>
          <div className="advantage-app__content-wrapper">
            {/* <video
              autoPlay
              ref={videoRef2}
              style={{ maxWidth: "40%", height: "auto", borderRadius: 10 }}
              muted
              loop
            >
              <source src={videoRemoving2} type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
            
            <img
              alt=""
              src={video2}
              style={{ maxWidth: "50%", height: "auto", borderRadius: 10 }}
            />
            <div
              className="advantage-app__content--text---wrapper"
              style={{ paddingLeft: "10%", paddingRight: 0 }}
            >
              <h3 className="advantage-app__content--text---header">
                Ảnh chân thực, phong cách hóa
              </h3>
              <p className="advantage-app__content--text---content">
                Tiết kiệm thời gian, công sức và tiền bạc của bạn và chỉnh sửa
                ảnh ngay lập tức! Ezpics sẵn sàng để bạn hiện thực hóa ý tưởng,
                giải phóng trí tưởng tượng và khai phá tiềm năng kinh doanh.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="performance-app__container">
        <div className="performance-app__wrapper">
          <div
            className="performance-app__block"
            style={{ paddingRight: "7%" }}
          >
            <div className="performance-app__block---children">
              <img
                alt=""
                src={iconPerformance1}
                style={{ maxWidth: "50%", height: "50%", borderRadius: 10 }}
              />
              <div className="performance-app__block---children----text__container">
                <h3 className="performance-app__block---children----text__title">
                  Tiết kiệm thời gian
                </h3>
                <p className="performance-app__block---children----text__content">
                  Với Ezpics RB, bạn có thể tiết kiệm một lượng thời gian đáng
                  kể vì công cụ này có thể xóa nền khỏi hình ảnh chỉ trong vài
                  giây. Điều này cho phép bạn tập trung vào các tác vụ khác và
                  hoàn thành dự án của mình nhanh hơn.
                </p>
              </div>
            </div>
            <div className="performance-app__block---children">
              <img
                alt=""
                src={iconPerformance2}
                style={{ maxWidth: "50%", height: "50%", borderRadius: 10 }}
              />
              <div className="performance-app__block---children----text__container">
                <h3 className="performance-app__block---children----text__title">
                  Tiết kiệm chi phí
                </h3>
                <p className="performance-app__block---children----text__content">
                  Việc thuê một chuyên gia chỉnh sửa hình ảnh bên ngoài có thể
                  tốn kém, đặc biệt nếu bạn có một số lượng lớn hình ảnh cần
                  chỉnh sửa. Ezpics RB là một giải pháp hiệu quả về chi phí cho
                  phép bạn tự chỉnh sửa hình ảnh mà không cần phải trả tiền cho
                  chuyên gia.
                </p>
              </div>
            </div>
          </div>

          <div className="performance-app__block">
            <div className="performance-app__block---children">
              <img
                alt=""
                src={iconPerformance3}
                style={{ maxWidth: "50%", height: "50%", borderRadius: 10 }}
              />
              <div className="performance-app__block---children----text__container">
                <h3 className="performance-app__block---children----text__title">
                  Cải thiện chất lượng
                </h3>
                <p className="performance-app__block---children----text__content">
                  Ezpics RB sử dụng các thuật toán nâng cao để loại bỏ nền chính
                  xác trong khi vẫn giữ được các chi tiết và góc cạnh của đối
                  tượng. Điều này mang lại hình ảnh chất lượng cao với nền trong
                  suốt trông chuyên nghiệp và bóng bẩy.
                </p>
              </div>
            </div>
            <div className="performance-app__block---children">
              <img
                alt=""
                src={iconPerformance4}
                style={{ maxWidth: "50%", height: "50%", borderRadius: 10 }}
              />
              <div className="performance-app__block---children----text__container">
                <h3 className="performance-app__block---children----text__title">
                  Miễn phí & Dễ sử dụng
                </h3>
                <p className="performance-app__block---children----text__content">
                  Ezpics RB miễn phí, bạn có thể sử dụng các tính năng tuyệt vời
                  như xóa background của Ezpics RB ở bất cứ đâu mà không phải lo
                  lắng về chi phí. Ezpics RB là một sản phẩm AI hoàn toàn miễn
                  phí, cho phép bạn chỉnh sửa ảnh trực tuyến. Nó cho phép bạn
                  chỉnh sửa ảnh của bạn trong tích tắc. Hãy sử dụng, trải nghiệm
                  và tận hưởng kết quả.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="asking-app__container">
        <div className="asking-app__wrapper">
            <h1>Sẵn sàng để xóa nền hình ảnh?</h1>
            <button className="asking-app__button">Bắt đầu bây giờ</button>
        </div>
        <img alt="" src={bgAsking} style={{height: '100%',width: 'auto'}}/> 
      </div>
    </Main>
  );
}

export default RemoveBackground;
