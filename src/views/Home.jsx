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
import { Users, UserPlus, UserCheck, FileText, Book } from "react-feather";

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
import { dateConvert } from "../utility/TimeAndDateConverter";
import { GetAllNews_Articles } from "../services/api/GetAllNews-Articles.api";
import { GetAllLessons } from "./../services/api/getAllLessons.api";

const Home = () => {
  const { colors } = useContext(ThemeColors);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [nameData, setNameData] = useState([]);
  const [newDate, setNewDate] = useState([]);

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

  const getAllBlogs = async () => {
    try {
      const blog = await GetAllNews_Articles();
      setBlogs(blog?.result);
    } catch (error) {}
  };

  const getAllLesson = async () => {
    try {
      const lessons = await GetAllLessons();
      setLessons(lessons?.result);
    } catch (error) {}
  };

  useEffect(() => {
    getAllTeachers();
    getAllStudents();
    getAllBlogs();
    getAllLesson();
  }, []);

  useEffect(() => {
    getStudentChart();
    getNameOfMonth();
  }, [students]);

  const getStudentChart = () => {
    const newData = students.map(
      (student) => dateConvert(student.registerDate).monthTitle
    );
    setNewDate(newData);
  };

  const addStudent = () => {
    const newStudent = nameData.map(
      (data) => newDate.filter((dat) => dat === data).length
    );
    return newStudent;
  };

  const data = [
    {
      name: "فروردین",
      pv: addStudent()[0],
    },
    {
      name: "اردیبهشت",
      pv: addStudent()[1],
    },
    {
      name: "خرداد",
      pv: addStudent()[2],
    },
    {
      name: "تیر",
      pv: addStudent()[3],
    },
    {
      name: "مرداد",
      pv: addStudent()[4],
    },
    {
      name: "شهریور",
      pv: addStudent()[5],
    },
    {
      name: "مهر",
      pv: addStudent()[6],
    },
    {
      name: "آبان",
      pv: addStudent()[7],
    },
    {
      name: "آذر",
      pv: addStudent()[8],
    },
    {
      name: "دی",
      pv: addStudent()[9],
    },
    {
      name: "بهمن",
      pv: addStudent()[10],
    },
    {
      name: "اسفند",
      pv: addStudent()[11],
    },
  ];

  const getNameOfMonth = () => {
    const newNameData = data.map((data) => data.name);
    setNameData(newNameData);
  };

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
              icon={<Users size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">{teachers.length}</h3>
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
              color="primary"
              statTitle="درس ها"
              icon={<Book size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">{lessons.length}</h3>
              }
            />
          </Col>

          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="خبر و مقاله"
              icon={<FileText size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{blogs.length}</h3>}
            />
          </Col>
        </Row>
        <Row className="match-height">
          <Col sm="12" lg="9">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle tag="h4">نمودار دانشجویان</CardTitle>
                  <small className="text-muted">
                    نمودار بررسی تعداد ثبت نام دانشجویان در ماه
                  </small>
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
          <Col sm="12" lg="3">
            <CardTransactions />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
