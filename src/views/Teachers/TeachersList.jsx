import { useEffect, useState } from "react";
import { Edit, Trash, UserCheck, UserX, Inbox } from "react-feather";
import {
  Table,
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DeactiveEmployee } from "../../services/api/deactiveEmployee";
import { ActiveEmployee } from "../../services/api/ActiveEmployee";
import { GetAllTeachers } from "./../../services/api/GetAllTeachers.api";
import { DeleteEmployee } from "./../../services/api/DeleteEmployee.api";
import { DeleteCourse } from "./../../services/api/DeleteCourse.api";
import AddTeacher from "./AddTeacher";
import TeacherEdit from "./TeacherEdit";

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherModal, setTeacherModal] = useState([]);
  const [addTeacherOpen, setAddTeacherOpen] = useState(false);
  const [editTeacherOpen, setEditTeacherOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherName, setTeacherName] = useState(null);
  const navigate = useNavigate();
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
      toast.success(`دانشجو با موفقیت حذف شد`);
    } catch (error) {
      toast.error("خطایی رخ داده");

      setTeachers(originalStudents);
    }
  };

  const handleDeleteTeacherCourse = async (courseId, courseName) => {
    const originalCourse = [...teacherModal];
    const deleteCourse = teacherModal.filter((c) => c._id !== courseId);
    try {
      await DeleteCourse(courseId);
      toast.success(`دوره ${courseName} با موفقیت از استاد حذف شد`);
      setTeacherModal(deleteCourse);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
      setTeacherModal(originalCourse);
      console.log(originalCourse);
    }
  };

  const handleActive = async (teacherId) => {
    // const originalCourses = courses;
    // const newCourse = courses.filter((m) => m._id !== courseId);
    // setCourses(newCourse);
    try {
      await ActiveEmployee(teacherId);
      toast.success(`وضعیت استاد به فعال تغییر کرد`);
      navigate(0);
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
      toast.success(`وضعیت استاد به غیر فعال تغییر کرد`);
      navigate(0);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
      //   setCourses(originalCourses);
    }
  };

  const handleShowTeacherCourse = (teacherId, teacherTitle) => {
    setModal(true);
    setTeacherName(teacherTitle);
    const findTeacher = teachers.find((t) => t._id === teacherId);
    setTeacherModal(findTeacher.courses);
  };

  const toggleAddSidebar = () => setAddTeacherOpen(!addTeacherOpen);
  const toggleEditSidebar = () => setEditTeacherOpen(!editTeacherOpen);

  const handleEdit = (teacherId) => {
    toggleEditSidebar();
    setTeacherId(teacherId);
  };

  return teachers ? (
    <>
      <Button.Ripple
        color="primary"
        size="md"
        className="mb-2"
        onClick={toggleAddSidebar}
      >
        افزودن استاد
      </Button.Ripple>
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
              <td>{course.birthDate}</td>
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
                  <Button.Ripple
                    color="primary"
                    size="sm"
                    onClick={() => handleEdit(course?._id)}
                  >
                    <Edit size={16} />
                  </Button.Ripple>
                </div>
                <div className="d-inline-block me-1 mb-1">
                  <Button.Ripple
                    color="warning"
                    size="sm"
                    onClick={() =>
                      handleShowTeacherCourse(course._id, course.fullName)
                    }
                  >
                    <Inbox size={16} />
                  </Button.Ripple>
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
                  {course.isActive === true ? (
                    <Button.Ripple
                      color="danger"
                      size="sm"
                      onClick={() => handleDeactive(course._id)}
                    >
                      <UserX size={16} />
                    </Button.Ripple>
                  ) : (
                    <Button.Ripple
                      color="success"
                      size="sm"
                      onClick={() => handleActive(course._id)}
                    >
                      <UserCheck size={16} />
                    </Button.Ripple>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddTeacher open={addTeacherOpen} toggleSidebar={toggleAddSidebar} />
      <TeacherEdit
        open={editTeacherOpen}
        toggleSidebar={toggleEditSidebar}
        teacherId={teacherId}
      />
      <Modal
        isOpen={modal}
        toggle={() => setModal(!modal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          درس های استاد :
          {teachers.map((name) => name.fullName).find((m) => m === teacherName)}
        </ModalHeader>
        <ModalBody>
          <Table responsive>
            <thead>
              <tr>
                <th>نام دوره</th>
                <th>ظرفیت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {teacherModal.map((course) => (
                <tr key={course._id}>
                  <td>
                    <span className="align-middle fw-bold">{course.title}</span>
                  </td>
                  <td>{course.capacity}</td>
                  <td>
                    <div className="d-inline-block me-1 mb-1">
                      <Button.Ripple
                        color="danger"
                        size="sm"
                        onClick={() =>
                          handleDeleteTeacherCourse(course._id, course.title)
                        }
                      >
                        <Trash size={16} />
                      </Button.Ripple>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default TeachersList;
