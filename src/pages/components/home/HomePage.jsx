import React, {useEffect} from 'react'
import classNames from 'classnames/bind';
import styles from './Header.scss';
import PersistentDrawerLeft from './content/Content';


let cx = classNames.bind(styles);
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




function HomePage() {
  useEffect(() => {
  var userValue = getCookieValue("user_login");
    console.log(typeof(userValue));
}, [])
  return (
    // <div className={}>HomePage</div>
    <div cx={''}><PersistentDrawerLeft /></div>
  )
}

export default HomePage