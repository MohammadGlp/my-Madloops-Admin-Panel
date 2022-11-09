// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from "reactstrap";

// ** Icons Imports
import { User } from "react-feather";

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className="mb-2">
      <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          <User size={18} className="me-50" />
          <span className="fw-bold">ویرایش پروفایل</span>
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default Tabs;
