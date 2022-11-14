// You can customize the template with the help of this file

//Template config options
const themeConfig = {
  app: {
    appName: "Mad Loops",
    appLogoImage: require("./MadLoops.svg").default,
  },
  layout: {
    isRTL: true,
    skin: "light", // light, dark, bordered, semi-dark
    routerTransition: "fadeIn", // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    type: "vertical", // vertical, horizontal
    contentWidth: "boxed", // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: "floating", // static , sticky , floating, hidden
      backgroundColor: "white", // BS color options [primary, success, etc]
    },
    footer: {
      type: "sticky", // static, sticky, hidden
    },
    customizer: false,
    scrollTop: true, // Enable scroll to top button
    toastPosition: "top-right",
  },
};

export default themeConfig;
