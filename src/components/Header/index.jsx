import { useState } from "react";
import styles from "./index.scss";
import { bars_solid } from "src/assets/assetsCommonExports";
import { Popup } from "antd-mobile";
import Options from "../Options";

const Header = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles["option-bars"]} onClick={() => setVisible(true)}>
        <img src={bars_solid} />
      </div>
      Echat
      <div />
      <Popup
        visible={visible}
        onMaskClick={() => setVisible(false)}
        maskStyle={{
          background: "rgba(0,0,0,0.25)",
        }}
        forceRender={true}
      >
        <Options open={() => setVisible(true)} />
      </Popup>
    </div>
  );
};

export default Header;
