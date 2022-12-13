// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import { User, Power, Home } from "react-feather";

import { logOut as logOutStore } from "../../../../redux/authSlice";

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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../../../redux/authSlice";
import { selectCurrentUser } from "./../../../../redux/authSlice";
import { selectRefUserData } from "./../../../../redux/authSlice";

const UserDropdown = () => {
  const ref = useSelector(selectRefUserData);

  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const userToken = useSelector(selectToken);

  const [userData, setUserData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getAdminById = async () => {
      const result = await GetEmployeeById(user?._id);
      setUserData(result?.result);
    };
    getAdminById();
  }, [ref]);

  const handleLanding = () => {
    if (userData?.role === "admin" || userData?.role === "teacher") {
      window.location.href = `http://madloops.sepehracademy.ir/adminAuth/${userToken}`;
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
        <DropdownItem className="w-100" onClick={handleLanding}>
          <Home size={14} className="me-75" />
          <span className="align-middle">سایت</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem
          tag={Link}
          to="/login"
          onClick={() => {
            dispatch(logOutStore());
            logOut();
          }}
        >
          <Power size={14} className="me-75" />
          <span className="align-middle">خروج</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
