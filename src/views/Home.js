import { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from 'reactstrap';
// ** User List Component

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';

// ** Styles
import '@styles/react/apps/app-users.scss';

//data
import { GetAllStudents } from '../services/api/GetAllStudents.api';
import { GetAllTeachers } from '../services/api/GetAllTeachers.api';

const Home = () => {
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
                    students.filter(
                      (student) => student.isActive === true
                    ).length
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
                    students.filter(
                      (student) => student.isActive === false
                    ).length
                  }
                </h3>
              }
            />
          </Col>
        </Row>
        {/* <Table /> */}
      </div>
    </div>
  );
};

export default Home;
