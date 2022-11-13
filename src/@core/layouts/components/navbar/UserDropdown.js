// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import { User, Power, Home } from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import { GetEmployeeById } from "./../../../../services/api/GetEmployeeById.api";
import {
  getToken,
  logOut,
} from "../../../../services/AuthServices/AuthServices";
import { DecodeToken } from "./../../../../utility/DecodeToken";
import { useState, useEffect } from "react";
import { getItem } from "../../../../services/storage/storage";

const UserDropdown = () => {
  const userToken = getToken();
  const id = DecodeToken(userToken);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getAdminById = async () => {
      const result = await GetEmployeeById(id._id);
      setUserData(result?.result);
    };
    getAdminById();
  }, []);

  const handleLanding = () => {
    const user = getItem("userInfo");
    const x = JSON.parse(user);
    if (x.role === "admin" || x.role === "teacher") {
      const EmpToken = getItem("token");
      window.location.href = `http://localhost:2000/adminAuth/${EmpToken}`;
    }
  };

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{userData?.fullName}</span>
          <span className="user-status">{userData?.role}</span>
        </div>
        <Avatar
          img={userData?.profile}
          imgHeight="40"
          imgWidth="40"
          status={userData?.isActive ? "online" : "offline"}
        />
      </DropdownToggle>

      <DropdownMenu end>
        <DropdownItem
          tag={Link}
          to="/edit-profile"
          onClick={(e) => e.preventDefault()}
        >
          <User size={14} className="me-75" />
          <span
            className="align-middle"
            onClick={() => navigate("/edit-profile")}
          >
            پروفایل
          </span>
        </DropdownItem>
        <DropdownItem
          tag={Link}
          to="/edit-profile"
          onClick={(e) => e.preventDefault()}
        >
          <Home size={14} className="me-75" />
          <span className="align-middle" onClick={handleLanding}>
            سایت
          </span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/login" onClick={() => logOut()}>
          <Power size={14} className="me-75" />
          <span className="align-middle">خروج</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
