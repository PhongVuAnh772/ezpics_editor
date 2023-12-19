import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
function getCookieValue(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null; // Trả về null nếu không tìm thấy cookie
}
function RequireAuth({ children }) {
  function checkTokenCookie() {
    // Lấy tất cả các cookies
    var allCookies = document.cookie;

    // Tách các cookies thành mảng
    var cookiesArray = allCookies.split(";");

    // Duyệt qua mỗi cookie để tìm cookie có tên là "token"
    for (var i = 0; i < cookiesArray.length; i++) {
      var cookie = cookiesArray[i].trim();
      // Kiểm tra xem cookie có bắt đầu bằng "token="
      if (cookie.indexOf("token=") === 0) {
        // Lấy giá trị của cookie
        var tokenValue = cookie.substring("token=".length, cookie.length);

        // Kiểm tra xem giá trị của cookie có rỗng hay không
        if (tokenValue !== "") {
          // Có token và không rỗng
          console.log(
            "Có token và không rỗng. Giá trị token là: " + tokenValue
          );
          
          return true;
        } else {
          // Có token nhưng rỗng
          console.log("Có token nhưng giá trị rỗng.");
          return false;
        }
      }
    }

    // Không tìm thấy cookie "token"
    console.log("Không tìm thấy cookie có tên là 'token'.");
    return false;
  }
  const location = useLocation();
  const authentication = checkTokenCookie();

  if (!authentication) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
}

export default RequireAuth;
