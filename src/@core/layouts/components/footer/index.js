// ** Icons Import
import { Heart } from "react-feather";

const Footer = () => {
  return (
    <p className="clearfix mb-0">
      <span className="float-md-start d-block d-md-inline-block mt-25">
        © {new Date().getFullYear()} تمامی حقوق سایت محفوظ میباشد.
      </span>
    </p>
  );
};

export default Footer;
