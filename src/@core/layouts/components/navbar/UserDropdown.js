// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import { GetEmployeeById } from "./../../../../services/api/GetEmployeeById.api";
import {
  getToken,
  logOut,
} from "../../../../services/AuthServices/AuthServices";
import { DecodeToken } from "./../../../../utility/DecodeToken";
import { useState, useEffect } from "react";

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
