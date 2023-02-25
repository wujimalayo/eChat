import { useContext } from "react";
import styles from "./index.scss";
import { bars_solid } from "src/assets/assetsCommonExports";
import { Popup } from "antd-mobile";
import Options from "../Options";
import useIsLandscape from "src/hooks/useIsLandscape";
import { UserInfoContext } from "src/store/context";

const Header = () => {
  const isLandscape = useIsLandscape();
  const { optionsVisible, setOptionsVisible } = useContext(UserInfoContext);

  return (
    <div className={styles.header}>
      <div
        className={styles["option-bars"]}
        onClick={() => setOptionsVisible(true)}
      >
        <img src={bars_solid} />
      </div>
      Echat
      <div />
      <Popup
        visible={optionsVisible}
        onMaskClick={() => setOptionsVisible(false)}
        maskStyle={{
          background: "rgba(0,0,0,0.25)",
        }}
        forceRender={true}
        position={isLandscape ? "left" : "bottom"}
      >
        <Options
          open={() => setOptionsVisible(true)}
          visible={optionsVisible}
        />
      </Popup>
    </div>
  );
};

export default Header;
