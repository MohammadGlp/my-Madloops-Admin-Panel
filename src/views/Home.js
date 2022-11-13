import { useEffect, useState, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Badge,
  CardText,
  CardLink,
} from "reactstrap";
// ** User List Component

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX, ArrowDown } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import "@styles/react/libs/charts/recharts.scss";
//data
import { GetAllStudents } from "../services/api/GetAllStudents.api";
import { GetAllTeachers } from "../services/api/GetAllTeachers.api";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CardTransactions from "./CardTransactions";

const Home = () => {
  const { colors } = useContext(ThemeColors);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const getAllStudents = async () => {
    try {
      const students = await GetAllStudents();
      setStudents(students?.result);
    } catch (error) {}
  };

  const getAllTeachers = async () => {
    try {
      const teachers = await GetAllTeachers();
      setTeachers(teachers?.result);
    } catch (error) {}
  };

  useEffect(() => {
    getAllTeachers();
    getAllStudents();
  }, []);

  const data = [
    {
      name: "فروردین",
      pv: 280,
    },
    {
      name: "اردیبهشت",
      pv: 200,
    },
    {
      name: "خرداد",
      pv: 220,
    },
    {
      name: "تیر",
      pv: 180,
    },
    {
      name: "مرداد",
      pv: 270,
    },
    {
      name: "شهریور",
      pv: 250,
    },
    {
      name: "مهر",
      pv: 70,
    },
    {
      name: "آبان",
      pv: 90,
    },
    {
      name: "آذر",
      pv: 200,
    },
    {
      name: "دی",
      pv: 150,
    },
    {
      name: "بهمن",
      pv: 160,
    },
    {
      name: "اسفند",
      pv: 50,
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload) {
      return (
        <div className="recharts-custom-tooltip">
          <span>{`${payload[0].value}%`}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="کل اساتید"
              icon={<UserPlus size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">{teachers.length}</h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="کل دانشجویان"
              icon={<User size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">{students.length}</h3>
              }
            />
          </Col>

          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="دانشجویان فعال"
              icon={<UserCheck size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {
                    students.filter((student) => student.isActive === true)
                      .length
                  }
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="دانشجویان غیر فعال"
              icon={<UserX size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {
                    students.filter((student) => student.isActive === false)
                      .length
                  }
                </h3>
              }
            />
          </Col>
        </Row>
        <Row className="match-height">
          <Col sm="9">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle tag="h4">Balance</CardTitle>
                  <small className="text-muted">
                    Commercial networks & enterprises
                  </small>
                </div>
                <div className="d-flex align-items-center flex-wrap mt-sm-0 mt-1">
                  <h5 className="fw-bold mb-0 me-1">$ 100,000</h5>
                  <Badge className="badge-md" color="light-secondary">
                    <ArrowDown className="text-danger me-50" size={15} />
                    20%
                  </Badge>
                </div>
              </CardHeader>
              <CardBody>
                <div className="recharts-wrapper">
                  <ResponsiveContainer>
                    <LineChart height={300} data={data}>
                      <CartesianGrid />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={CustomTooltip} />
                      <Line
                        dataKey="pv"
                        stroke={colors.warning.main}
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="3">
            <CardTransactions />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
