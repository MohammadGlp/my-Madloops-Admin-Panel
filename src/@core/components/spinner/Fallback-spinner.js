// ** Logo
import logo from "@src/assets/images/logo/logo.png";

const SpinnerComponent = () => {
  return (
    <div className="fallback-spinner app-loader">
      <img
        className="fallback-logo w-25 h-25"
        src={require("./MadLoops.svg").default}
        alt="logo"
      />
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};

export default SpinnerComponent;
