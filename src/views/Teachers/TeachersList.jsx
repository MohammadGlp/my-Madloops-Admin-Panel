import { useEffect, useState } from "react";
import { Edit, Trash, UserCheck, UserX, Inbox } from "react-feather";
import { Table, Button, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { DeactiveEmployee } from "../../services/api/deactiveEmployee";
import { ActiveEmployee } from "../../services/api/ActiveEmployee";
import { GetAllTeachers } from "./../../services/api/GetAllTeachers.api";
import { DeleteEmployee } from "./../../services/api/DeleteEmployee.api";
import ModalSizes from "./TeacherModalCourse";

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const teachers = await GetAllTeachers();
        setTeachers(teachers?.result);
      } catch (error) {}
    };
    getAll();
  }, []);

  const handleDelete = async (teacherId, teacherName) => {
    const originalStudents = [...teachers];
    const newStudents = teachers.filter((m) => m._id !== teacherId);
    setTeachers(newStudents);
    try {
      await DeleteEmployee(teacherId, teacherName);
      toast.warning(`دانشجو با موفقیت حذف شد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
      setTeachers(originalStudents);
    }
  };

  const handleActive = async (teacherId) => {
    // const originalCourses = courses;
    // const newCourse = courses.filter((m) => m._id !== courseId);
    // setCourses(newCourse);
    try {
      await ActiveEmployee(teacherId);
      toast.warning(`وضعیت دانشجو به فعال تغییر کرد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
      //   setCourses(originalCourses);
    }
  };

  const handleDeactive = async (teacherId) => {
    // const originalCourses = courses;
    // const newCourse = courses.filter((m) => m._id !== courseId);
    // setCourses(newCourse);
    try {
      await DeactiveEmployee(teacherId);
      toast.warning(`وضعیت دانشجو به فعال تغییر کرد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
      //   setCourses(originalCourses);
    }
  };

  return teachers ? (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>نام دانشجو</th>
            <th>کد ملی</th>
            <th>شماره تماس</th>
            <th>تاریخ تولد</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((course) => (
            <tr key={course._id}>
              <td>
                <img
                  className="me-75"
                  src={course.profile}
                  alt="angular"
                  height="20"
                  width="20"
                />
                <span className="align-middle fw-bold">{course.fullName}</span>
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
                  <ModalSizes teacherId={course._id} />
                </div>

                <div className="d-inline-block me-1 mb-1">
                  <Button.Ripple color="danger" size="sm">
                    <Trash
                      size={16}
                      onClick={() => handleDelete(course._id, course.fullName)}
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
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default TeachersList;
