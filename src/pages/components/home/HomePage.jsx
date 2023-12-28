import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Header.scss";
import PersistentDrawerLeft from "./content/Content";

let cx = classNames.bind(styles);


function HomePage() {

  return (
    // <div className={}>HomePage</div>
    <div cx={""}>
      <PersistentDrawerLeft />
    </div>
  );
}

export default HomePage;
