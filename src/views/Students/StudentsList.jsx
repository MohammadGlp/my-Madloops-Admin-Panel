import { useEffect, useState } from "react";
import {
  Book,
  Edit,
  Minus,
  Plus,
  Trash,
  UserCheck,
  UserX,
} from "react-feather";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Badge,
} from "reactstrap";
import Avatar from "@components/avatar";
import { GetAllStudents } from "../../services/api/GetAllStudents.api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ActiveStudent } from "../../services/api/ActiveStudent";
import { DeactiveStudent } from "../../services/api/deactiveStudent";
import { DeleteStudentById } from "../../services/api/DeleteStudentById";
import StudentEdit from "./StudentEdit";
import { RemoveStudentFromCourse } from "./../../services/api/RemoveStudentFromCourse.api";
import { AddStudentToCourse } from "./../../services/api/AddStudentToCourse.api";
import { getAllCourses } from "./../../services/api/GetAllCourses.api";
import AddStudent from "./AddStudent";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [editStudentOpen, setEditStudentOpen] = useState(false);
  const [studentsId, setStudentsId] = useState();
  const [courses, setCourses] = useState();
  const [show, setShow] = useState(false);
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAll = async () => {
      try {
        const students = await GetAllStudents();
        setStudents(students?.result);
      } catch (error) {}
    };
    getAll();
  }, []);

  useEffect(() => {
    const getAllCourse = async () => {
      try {
        const courses = await getAllCourses();
        console.log(courses?.data);
        setCourses(courses?.data.result);
      } catch (error) {}
    };
    getAllCourse();
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
        toast.error("خطایی رخ داده");
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
      toast.success(`وضعیت دانشجو به فعال تغییر کرد`);
      navigate(0);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
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
      toast.success(`وضعیت دانشجو به فعال تغییر کرد`);
      navigate(0);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
      //   setCourses(originalCourses);
    }
  };

  const handleShowCourses = (studentId) => {
    setShow(!show);
    setStudentsId(studentId);
  };

  const handleAddStudentToCourse = async (courseId) => {
    setShow(!show);
    try {
      await AddStudentToCourse(courseId, studentsId);
      toast.success("دانشجو با موفقیت به دوره اضافه شد");
    } catch (error) {}
  };

  const handleRemoveStudentFromCourse = async (courseId) => {
    setShow(!show);
    try {
      await RemoveStudentFromCourse(courseId, studentsId);
      toast.success("دانشجو با موفقیت از دوره حذف شد");
    } catch (error) {}
  };
  const toggleAddSidebar = () => setAddStudentOpen(!addStudentOpen);
  const toggleEditSidebar = () => setEditStudentOpen(!editStudentOpen);

  const handleEdit = (studentId) => {
    toggleEditSidebar();
    setStudentsId(studentId);
  };

  return students ? (
    <>
      <Button.Ripple
        color="primary"
        size="md"
        className="mb-2"
        onClick={toggleAddSidebar}
      >
        افزودن دانشجو
      </Button.Ripple>
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
                    color="success"
                    size="sm"
                    onClick={() => handleShowCourses(course._id)}
                  >
                    <Book size={16} />
                  </Button.Ripple>
                </div>
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
                  <Button.Ripple color="danger" size="sm">
                    <Trash size={16} onClick={() => handleDelete(course._id)} />
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
      <AddStudent open={addStudentOpen} toggleSidebar={toggleAddSidebar} />
      <StudentEdit
        open={editStudentOpen}
        toggleSidebar={toggleEditSidebar}
        studentId={studentsId}
      />
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          {courses?.map((course) => (
            <div
              key={course._id}
              className="employee-task d-flex justify-content-between align-items-center mb-2"
            >
              <div className="d-flex">
                <Avatar
                  imgClassName="rounded"
                  className="me-75"
                  img={course.lesson.image}
                  imgHeight="42"
                  imgWidth="42"
                />
                <div className="my-auto">
                  <h6 className="mb-0">{course.title}</h6>
                  <small className="text-muted">{course.cost} تومان</small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <Button.Ripple
                  color="warning"
                  className="me-1"
                  size="sm"
                  disabled={
                    !course.students.find(
                      (student) => student._id === studentsId
                    )
                  }
                  onClick={() => handleRemoveStudentFromCourse(course._id)}
                >
                  <Minus size={16} />
                </Button.Ripple>
                <Button.Ripple
                  color="success"
                  size="sm"
                  disabled={course.students.find(
                    (student) => student._id === studentsId
                  )}
                  onClick={() => handleAddStudentToCourse(course._id)}
                >
                  <Plus size={16} />
                </Button.Ripple>
              </div>
            </div>
          ))}
        </ModalBody>
      </Modal>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default StudentsList;
