import { useEffect, useState } from 'react';
import { Edit, Trash, UserCheck, UserX } from 'react-feather';
import { Table, Button, Badge } from 'reactstrap';
import AvatarGroup from '@components/avatar-group';
import { GetAllStudents } from '../../services/api/GetAllStudents.api';
import { DeleteCourse } from '../../services/api/DeleteCourse.api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ActiveStudent } from '../../services/api/ActiveStudent';
import { DeactiveStudent } from '../../services/api/deactiveStudent';
import { DeleteStudentById } from '../../services/api/DeleteStudentById';
const StudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const students = await GetAllStudents();
        setStudents(students?.result);
      } catch (error) {}
    };
    getAll();
  }, []);

  const handleDelete = async (studentId) => {
    const originalStudents = students;
    const newStudents = students.filter((m) => m._id !== studentId);
    setStudents(newStudents);
    try {
      await DeleteStudentById(studentId);
      toast.warning(`دانشجو با موفقیت حذف شد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('خطایی رخ داده');
      }
      setStudents(originalStudents);
    }
  };

  const handleActive = async (studentId) => {
    // const originalCourses = courses;
    // const newCourse = courses.filter((m) => m._id !== courseId);
    // setCourses(newCourse);
    try {
      await ActiveStudent(studentId);
      toast.warning(`وضعیت دانشجو به فعال تغییر کرد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('خطایی رخ داده');
      }
      //   setCourses(originalCourses);
    }
  };

  const handleDeactive = async (studentId) => {
    // const originalCourses = courses;
    // const newCourse = courses.filter((m) => m._id !== courseId);
    // setCourses(newCourse);
    try {
      await DeactiveStudent(studentId);
      toast.warning(`وضعیت دانشجو به فعال تغییر کرد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('خطایی رخ داده');
      }
      //   setCourses(originalCourses);
    }
  };

  return students ? (
    <Table responsive>
      <thead>
        <tr>
          <th>نام دانشجو</th>
          <th>کد ملی</th>
          <th>شماره تماس</th>
          <th>تاریخ تولد</th>
          <th>وضعیت</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {students.map((course) => (
          <tr key={course._id}>
            <td>
              <img
                className="me-75"
                src={course.profile}
                alt="angular"
                height="20"
                width="20"
              />
              <span className="align-middle fw-bold">
                {course.fullName}
              </span>
            </td>
            <td>{course.nationalId}</td>
            <td>{course.phoneNumber}</td>
            <td>
              {course.birthDate}
              {/* <AvatarGroup data={course.students} /> */}
            </td>
            <td>
              {course.isActive ? (
                <Badge className="px-1" pill color="light-success">
                  فعال
                </Badge>
              ) : (
                <Badge className="px-2" color="light-danger">
                  غیرفعال
                </Badge>
              )}
            </td>
            <td>
              <div className="d-inline-block me-1 mb-1">
                <Link to={`/editStudent/${course._id}`}>
                  <Button.Ripple color="primary" size="sm">
                    <Edit size={16} />
                  </Button.Ripple>
                </Link>
              </div>
              <div className="d-inline-block me-1 mb-1">
                <Button.Ripple color="danger" size="sm">
                  <Trash
                    size={16}
                    onClick={() => handleDelete(course._id)}
                  />
                </Button.Ripple>
              </div>
              <div className="d-inline-block me-1 mb-1">
                <Button.Ripple color="danger" size="sm">
                  {course.isActive ? (
                    <UserX
                      size={16}
                      onClick={() => handleDeactive(course._id)}
                    />
                  ) : (
                    <UserCheck
                      size={16}
                      onClick={() => handleActive(course._id)}
                    />
                  )}
                </Button.Ripple>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <p>Loading...</p>
  );
};

export default StudentsList;
