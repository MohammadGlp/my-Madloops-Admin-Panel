import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";
// ** User List Component

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";

const Home = () => {
  return (
    <div>
      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="کل دانشجویان"
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">21,459</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="کل اساتید"
              icon={<UserPlus size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="دانشجویان فعال"
              icon={<UserCheck size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="دانشجویان غیر فعال"
              icon={<UserX size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">237</h3>}
            />
          </Col>
        </Row>
        {/* <Table /> */}
      </div>
    </div>
  );
};

export default Home;
