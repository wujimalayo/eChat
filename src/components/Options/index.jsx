import { Fragment, useEffect, useRef, useState, useContext } from "react";
import styles from "./index.scss";
import outStyles from "components/ChatInput/index.scss";
import globalStyles from "src/assets/scss/global.scss";
import { Input, Swiper } from "antd-mobile";
import { next, loading_icon, copy, back } from "src/assets/assetsCommonExports";
import classNames from "classnames";
import { sendCode, login, getUserInfo, refreshToken } from "src/service/api";
import useInterval from "src/hooks/useInterVal";
import { Context } from "src/store/context";
import Clipboard from "clipboard";
import PopupMessage from "../PopupMessage";
import { TOKEN_KEY } from "src/assets/constant";
import useIsLandscape from "src/hooks/useIsLandscape";

const Options = ({ open, visible }) => {
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
  const userInfo = useContext(Context);
  const isLandscape = useIsLandscape();

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
    // input聚、失焦事件绑定
    if (inputRef.current) {
      inputRef.current.nativeElement.onfocus = () => setIsFocus(true);
      inputRef.current.nativeElement.onblur = () => setIsFocus(false);
    }
    if (verifyRef.current) {
      verifyRef.current.nativeElement.onfocus = () => setIsFocus(true);
      verifyRef.current.nativeElement.onblur = () => setIsFocus(false);
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

  useEffect(() => {
    if (visible) {
      // 检查登录信息
      checkUser();
    }
  }, [visible]);

  const checkUser = () => {
    getUserInfo().then((res) => {
      if (res.code === 0) {
        swiperRef.current.swipeTo(2);
        refreshToken().then((res) => {
          localStorage.setItem(TOKEN_KEY, res.token);
        });
        userInfo.updateUserInfo({
          phone: res.mobile,
          inviteCode: res.invite_code,
          chatNum: res.chat_num,
        });
      } else {
        localStorage.removeItem(TOKEN_KEY);
        swiperRef.current.swipeTo(0);
        open();
      }
    });
  };

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
            PopupMessage.success("验证码发送成功");
            setDelay(1000);
            swiperRef.current.swipeTo(1);
          } else {
            PopupMessage.warning(res.msg);
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
              phone: res.mobile,
              inviteCode: res.invite_code,
              chatNum: res.chat_num,
            });
            localStorage.setItem(TOKEN_KEY, res.token);
            swiperRef.current.swipeTo(2);
          } else {
            PopupMessage.warning(res.msg);
          }
        })
        .catch(() => setVerifyLoading(false));
    }
  };

  return (
    <div
      className={classNames(
        styles.options,
        isLandscape ? styles["options-landscape"] : ""
      )}
    >
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
          <div className={styles.content} style={{ paddingTop: 0 }}>
            <div className={styles["account-info"]}>
              <div className={globalStyles["border-text"]}>
                {userInfo.inviteCode || "--"}
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
                <div style={{ marginBottom: 16 }}>
                  查询余额(次数)：{userInfo.chatNum || 0}
                </div>
                由于成本有限，Echat测试版添加了相应的使用限制：
                <ul>
                  <li>首次使用拥有5次查询次数（每个设备id）</li>
                  <li>登录后增加10次（每个手机号）</li>
                  <li>次数用完后可联系开发人员免费增加次数。</li>
                </ul>
              </div>
            </div>
          </div>
        </Swiper.Item>
      </Swiper>
    </div>
  );
};

export default Options;
