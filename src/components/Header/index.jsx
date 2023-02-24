import { useState } from "react";
import styles from "./index.scss";
import { bars_solid } from "src/assets/assetsCommonExports";
import { Popup } from "antd-mobile";
import Options from "../Options";
import useIsLandscape from "src/hooks/useIsLandscape";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const isLandscape = useIsLandscape();

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
        position={isLandscape ? "left" : "bottom"}
      >
        <Options open={() => setVisible(true)} />
      </Popup>
    </div>
  );
};

export default Header;
