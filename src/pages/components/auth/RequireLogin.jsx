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
  const location = useLocation();

   function checkTokenCookie() {
    // Lấy tất cả các cookies
    var allCookies = document.cookie;

    // Tách các cookies thành mảng
    var cookiesArray = allCookies.split(";");

    // Biến để kiểm tra xem đã tìm thấy cả token và user_login hay chưa
    var foundToken = false;
    var foundUserLogin = false;

    // Duyệt qua mỗi cookie để tìm cookie có tên là "token" hoặc "user_login"
    for (var i = 0; i < cookiesArray.length; i++) {
      var cookie = cookiesArray[i].trim();

      // Kiểm tra xem cookie có bắt đầu bằng "token=" hoặc "user_login="
      if (
        cookie.indexOf("token=") === 0 ||
        cookie.indexOf("user_login=") === 0
      ) {
        // Lấy giá trị của cookie
        var cookieValue = cookie.substring(cookie.indexOf("=") + 1);

        // Kiểm tra xem giá trị của cookie có rỗng hay không
        if (cookieValue !== "") {
          // Có token hoặc user_login và không rỗng
          console.log(
            "Có " +
              (cookie.indexOf("token=") === 0 ? "token" : "user_login") +
              " và không rỗng. Giá trị là: " +
              cookieValue
          );

          // Đánh dấu tìm thấy token hoặc user_login
          if (cookie.indexOf("token=") === 0) {
            foundToken = true;
          } else if (cookie.indexOf("user_login=") === 0) {
            foundUserLogin = true;
          }
        } else {
          // Có token hoặc user_login nhưng giá trị rỗng
          console.log(
            "Có " +
              (cookie.indexOf("token=") === 0 ? "token" : "user_login") +
              " nhưng giá trị rỗng."
          );
        }
      }
    }

    // Trả về kết quả, true nếu cả hai token và user_login đều tồn tại, ngược lại là false
    return foundToken && foundUserLogin;
  }
  function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 
function checkAvailableLogin() {
    var token = getCookie("token");
    var userLogin = getCookie("user_login")

    if (userLogin == null) {
        return false;
    }
    else {
        return true;
    }
}
  const authentication = checkAvailableLogin();

  if (!authentication) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  else {
        return <Navigate to="/" state={{ path: location.pathname }} />;

  }

}

export default RequireAuth;
