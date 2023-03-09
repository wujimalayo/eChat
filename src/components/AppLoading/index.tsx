import { useEffect, useState } from "react";
import { boot_avatar } from "src/assets/assetsCommonExports";
import styles from "./loading.scss";
import classNames from "classnames";

interface Props {
  errorMsg: string;
}

export default ({ errorMsg }: Props) => {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(true), []);
  return (
    <div
      className={
        show ? classNames(styles.loading, styles.show) : styles.loading
      }
    >
      <div className={styles.logo}>
        <img src={boot_avatar} />
      </div>
      {errorMsg ? (
        <div className={styles.error}>{errorMsg}</div>
      ) : (
        <div className={styles.text}>Echat is loading...</div>
      )}
    </div>
  );
};
