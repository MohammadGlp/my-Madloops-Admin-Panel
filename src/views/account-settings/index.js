// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from "reactstrap";

// ** Demo Components
import Tabs from "./Tabs";
import Breadcrumbs from "@components/breadcrumbs";
import AccountTabContent from "./AccountTabContent";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";
import { getToken } from "../../services/AuthServices/AuthServices";
import { DecodeToken } from "./../../utility/DecodeToken";
import { GetEmployeeById } from "./../../services/api/GetEmployeeById.api";

const AccountSettings = () => {
  // ** States
  const userToken = getToken();
  const id = DecodeToken(userToken);
  const [activeTab, setActiveTab] = useState("1");
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const getAdminById = async () => {
      const result = await GetEmployeeById(id._id);
      setData(result.result);
    };
    getAdminById();
  }, [refresh]);

  return (
    <Fragment>
      <Breadcrumbs title="مدریت حساب" data={[{ title: "مدیریت حساب" }]} />
      {data !== null ? (
        <Row>
          <Col xs={12}>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <AccountTabContent data={data} setRefresh={setRefresh} />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  );
};

export default AccountSettings;
