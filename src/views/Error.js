// ** React Imports
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import { Button } from "reactstrap";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Styles
import "@styles/base/pages/page-misc.scss";

const Error = () => {
  // ** Hooks
  const { skin } = useSkin();

  const illustration = skin === "dark" ? "error-dark.svg" : "error.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;
  return (
    <div className="misc-wrapper">
      <a className="brand-logo" href="/">
        <img
          src={require("../configs/MadLoops.svg").default}
          height="30"
          alt=""
        />
        <h2 className="brand-text text-primary ms-1">Mad Loops</h2>
      </a>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">صفحه پیدا نشد 🕵🏻‍♀️</h2>
          <p className="mb-2">
            آدرس درخواستی شما ثبت نشده است, با استفاده از دکمه پایین به پنل
            برگردید
          </p>
          <Button
            tag={Link}
            to="/"
            color="primary"
            className="btn-sm-block mb-2"
          >
            بازگشت به خانه
          </Button>
          <img className="img-fluid" src={source} alt="Not authorized page" />
        </div>
      </div>
    </div>
  );
};
export default Error;
