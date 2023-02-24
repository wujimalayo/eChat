const useIsLandscape = () => {
  // 目前只通过对比屏幕高宽来确定是否横屏
  const { width, height } = window.screen;
  return width > height;
};

export default useIsLandscape;
