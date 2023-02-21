import { Fragment, useEffect, useRef, useState, useContext } from "react";
import styles from "./index.scss";
import outStyles from "components/ChatInput/index.scss";
import globalStyles from "src/assets/scss/global.scss";
import { Input, Swiper } from "antd-mobile";
import { next, loading_icon, copy, back } from "src/assets/assetsCommonExports";
import classNames from "classnames";
import { sendCode, login } from "src/service/api";
import useInterval from "src/hooks/useInterVal";
import { UserInfoContext } from "src/store/context";
import Clipboard from "clipboard";
import PopupMessage from "../PopupMessage";

const Options = () => {
  const swiperRef = useRef(null);
  const inputRef = useRef(null);
  const verifyRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const [phone, setPhone] = useState("");
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [countDown, setCountDown] = useState(60);
  const [delay, setDelay] = useState(null);
  const [verifyCode, setVerifyCode] = useState("");
  const userInfo = useContext(UserInfoContext);
  const token = localStorage.getItem("echat_token");

  useEffect(() => {
    if (!token) {
      swiperRef.current.swipeTo(0);
    } else {
      swiperRef.current.swipeTo(2);
    }
  }, [token]);

  useInterval(() => {
    setCountDown((n) => n - 1);
  }, delay);

  useEffect(() => {
    if (countDown < 1) {
      setDelay(null);
      setLoading(false);
      setCountDown(60);
    }
  }, [countDown]);

  useEffect(() => {
    const reg = new RegExp(/^((\+|00)86)?1[3-9]\d{9}$/);
    setIsPhoneNumber(reg.test(phone));
  }, [phone]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.nativeElement.onfocus = () => {
        setIsFocus(true);
      };
      inputRef.current.nativeElement.onblur = () => {
        setIsFocus(false);
      };
    }
    if (verifyRef.current) {
      verifyRef.current.nativeElement.onfocus = () => {
        setIsFocus(true);
      };
      verifyRef.current.nativeElement.onblur = () => {
        setIsFocus(false);
      };
    }

    // 初始化复制按钮
    const btnCopy = new Clipboard("#copy-code");
    btnCopy.on("success", function (e) {
      showCopyRes(true);
      e.clearSelection();
    });

    btnCopy.on("error", function (e) {
      showCopyRes(false);
    });
  }, []);

  const showCopyRes = (isSuccess) => {
    isSuccess
      ? PopupMessage.success("复制成功")
      : PopupMessage.warning("复制失败，请长按屏幕手动复制");
  };

  const handleSendCode = () => {
    if (!loading && isPhoneNumber) {
      setLoading(true);
      sendCode({
        mobile: phone,
      })
        .then((res) => {
          setLoading(false);
          if (res.code === 0) {
            setDelay(1000);
            swiperRef.current.swipeTo(1);
          }
        })
        .catch(() => setLoading(false));
    }
  };

  const handleLogin = () => {
    if (!verifyLoading && verifyCode.length >= 4) {
      setVerifyLoading(true);
      login({
        mobile: phone,
        code: verifyCode,
        device_id: userInfo.visitorId,
      })
        .then((res) => {
          setVerifyLoading(false);
          if (res.code === 0) {
            userInfo.updateUserInfo({
              phone,
              inviteCode: res.invite_code,
            });
            localStorage.setItem("echat_token", res.token);
            swiperRef.current.swipeTo(2);
          }
        })
        .catch(() => setVerifyLoading(false));
    }
  };

  return (
    <div className={styles.options}>
      <Swiper indicator={() => null} allowTouchMove={false} ref={swiperRef}>
        <Swiper.Item>
          <div
            className={styles.content}
            style={{
              "--border-color": isFocus ? "#256371" : "#cccccc",
            }}
          >
            <div
              className={classNames(globalStyles["border-text"], styles.title)}
            >
              Echat Account
            </div>
            <Input
              ref={inputRef}
              value={phone}
              disabled={loading}
              placeholder="请输入手机号"
              clearable
              onChange={(value) => setPhone(value)}
            />
            {delay ? ( // 倒计时开始时只展示倒数
              <div className={styles["count-down"]}>{countDown}</div>
            ) : (
              <Fragment>
                <div
                  className={classNames(
                    styles.verify,
                    isPhoneNumber ? styles["verify-active"] : "",
                    loading ? styles["verify-hidden"] : ""
                  )}
                  style={{
                    WebkitMaskImage: `url(${next})`,
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskImage: `url(${next})`,
                  }}
                  onClick={handleSendCode}
                ></div>
                <img
                  className={classNames(
                    styles["verify-loading"],
                    outStyles[
                      loading ? "animation-spin-show" : "animation-spin"
                    ]
                  )}
                  src={loading_icon}
                />
              </Fragment>
            )}
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div
            className={styles.content}
            style={{
              "--border-color": isFocus ? "#256371" : "#cccccc",
            }}
          >
            <img
              className={styles.back}
              src={back}
              onClick={() => swiperRef.current.swipePrev()}
            />
            <div
              className={classNames(globalStyles["border-text"], styles.title)}
            >
              Echat Account
            </div>
            <Input
              ref={verifyRef}
              value={verifyCode}
              disabled={verifyLoading}
              placeholder="请输入验证码"
              clearable
              onChange={(value) => setVerifyCode(value)}
            />
            <div
              className={classNames(
                styles.verify,
                verifyCode.length >= 4 ? styles["verify-active"] : "",
                verifyLoading ? styles["verify-hidden"] : ""
              )}
              style={{
                WebkitMaskImage: `url(${next})`,
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskImage: `url(${next})`,
              }}
              onClick={handleLogin}
            ></div>
            <img
              className={classNames(
                styles["verify-loading"],
                outStyles[
                  verifyLoading ? "animation-spin-show" : "animation-spin"
                ]
              )}
              src={loading_icon}
            />
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className={styles.content}>
            <div className={styles["account-info"]}>
              <div className={globalStyles["border-text"]}>
                {userInfo.inviteCode || "LRiA"}
                <img
                  id="copy-code"
                  title="复制邀请码"
                  data-clipboard-text={userInfo.inviteCode || "LRiA"}
                  className={styles.copy}
                  src={copy}
                />
              </div>
              <div className={styles["sub-info"]}>
                <div>手机号：{userInfo.phone}</div>
                <div>设备号：{userInfo.visitorId}</div>
                <div>查询余额：{userInfo.chatFee || "--"}</div>
              </div>
            </div>
          </div>
        </Swiper.Item>
      </Swiper>
    </div>
  );
};

export default Options;
