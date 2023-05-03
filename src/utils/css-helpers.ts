export const setGlobalCssHeight = () => {
  const resizeOps = () => {
    document.documentElement.style.setProperty(
      "--vh",
      window.innerHeight * 0.01 + "px"
    );
  };

  resizeOps();
  window.addEventListener("resize", resizeOps);
};
