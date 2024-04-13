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

function RequireAuth() {
  const location = useLocation();

   
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
        return <Navigate to="/" />;

  }

}

export default RequireAuth;
