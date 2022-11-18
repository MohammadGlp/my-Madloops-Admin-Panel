import { useEffect, useState } from 'react';
import {
  Book,
  Edit,
  Minus,
  Plus,
  Search,
  Trash,
  UserCheck,
  UserX,
  Layers,
} from 'react-feather';
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Badge,
  Card,
  CardBody,
  CardHeader,
  InputGroup,
  InputGroupText,
  Input,
  Row,
  Col,
} from 'reactstrap';
import Avatar from '@components/avatar';
import { GetAllStudents } from '../../services/api/GetAllStudents.api';
import toast from 'react-hot-toast';
import { ActiveStudent } from '../../services/api/ActiveStudent';
import { DeactiveStudent } from '../../services/api/deactiveStudent';
import { DeleteStudentById } from '../../services/api/DeleteStudentById';
import StudentEdit from './StudentEdit';
import { RemoveStudentFromCourse } from './../../services/api/RemoveStudentFromCourse.api';
import { AddStudentToCourse } from './../../services/api/AddStudentToCourse.api';
import { getAllCourses } from './../../services/api/GetAllCourses.api';
import AddStudent from './AddStudent';
import Breadcrumbs from '@components/breadcrumbs';
import PaginationIcons from '../pagination';
import { paginate } from '../../utility/paginate';
import { DeleteCourse } from './../../services/api/DeleteCourse.api';
import { GetStudentById } from './../../services/api/GetStudentById';
import Skeleton from './../skeleton';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [editStudentOpen, setEditStudentOpen] = useState(false);
  const [studentsId, setStudentsId] = useState();
  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [RefreshStudentInfo, setRefreshStudentInfo] = useState(false);
  const [refStudentModal, setRefStudentModal] = useState(false);
  const [refStudentModal2, setRefStudentModal2] = useState(false);
  const [studentName, setStudentName] = useState(null);
  const [studentModal, setStudentModal] = useState([]);
  const [modal, setModal] = useState(false);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalCurrentPageCourse, setModalCurrentPageCourse] =
    useState(1);
  const [modalCurrentPageLesson, setModalCurrentPageLesson] =
    useState(1);
  const [searchStudents, setSearchStudents] = useState('');
  const [searchCourse, setSearchCourse] = useState('');
  const [searchLesson, setSearchLesson] = useState('');

  useEffect(() => {
    const getAll = async () => {
      try {
        const students = await GetAllStudents();
        setStudents(students?.result);
      } catch (error) {}
    };
    getAll();
  }, [RefreshStudentInfo]);

  useEffect(() => {
    const getAllCourse = async () => {
      try {
        const courses = await getAllCourses();
        setCourses(courses?.data.result);
      } catch (error) {}
    };
    getAllCourse();
  }, [refStudentModal]);

  useEffect(() => {
    if (studentsId) {
      const getStudentById = async () => {
        try {
          const student = await GetStudentById(studentsId);
          setStudentModal(student?.result);
        } catch (error) {}
      };
      getStudentById();
    }
  }, [refStudentModal2]);

  const handleDelete = async (studentId) => {
    const res = await DeleteStudentById(studentId);
    if (res.success === true) {
      setStudents((old) => {
        let newData = [...old];
        let newStudentData = newData;
        newStudentData = newStudentData.filter(
          (item) => item._id !== studentId
        );
        newData = newStudentData;
        return newData;
      });
      toast.success(`دانشجو با موفقیت حذف شد`);
    } else {
      toast.error('خطایی رخ داده لطفا مجددا امتحان فرمایید');
    }
  };

  const handleActive = async (studentId) => {
    try {
      await ActiveStudent(studentId);
      toast.success(`وضعیت دانشجو به فعال تغییر کرد`);
      setRefreshStudentInfo((old) => !old);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('خطایی رخ داده');
      }
    }
  };

  const handleDeactive = async (studentId) => {
    try {
      await DeactiveStudent(studentId);
      toast.success(`وضعیت دانشجو به غیر فعال تغییر کرد`);
      setRefreshStudentInfo((old) => !old);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('خطایی رخ داده');
      }
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
      setRefStudentModal((old) => !old);
      toast.success('دانشجو با موفقیت به دوره اضافه شد');
    } catch (error) {
      toast.error('افزودن دانشجو با مشکل مواجه شد');
    }
  };

  const handleRemoveStudentFromCourse = async (courseId) => {
    setShow(!show);
    try {
      await RemoveStudentFromCourse(courseId, studentsId);
      setRefStudentModal((old) => !old);
      toast.success('دانشجو با موفقیت از دوره حذف شد');
    } catch (error) {
      toast.error('حذف دانشجو با مشکل مواجه شد');
    }
  };
  const toggleAddSidebar = () => setAddStudentOpen(!addStudentOpen);
  const toggleEditSidebar = () =>
    setEditStudentOpen(!editStudentOpen);

  const handleEdit = (studentId) => {
    toggleEditSidebar();
    setStudentsId(studentId);
  };

  const handleShowStudentCourse = (studentId, studentTitle) => {
    setModal(true);
    setStudentName(studentTitle);
    setStudentsId(studentId);
    setRefStudentModal2((old) => !old);
  };

  const handleDeleteStudentCourse = async (courseId, courseName) => {
    setModal(!modal);
    try {
      await RemoveStudentFromCourse(courseId, studentsId);
      setRefStudentModal2((old) => !old);
      toast.success(`دوره ${courseName} با موفقیت از دانشجو حذف شد`);
    } catch (error) {
      toast.error('خطایی رخ داده لطفا مجددا امتحان فرمایید');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    const pagesCount = Math.ceil(students.length / pageSize);
    currentPage !== pagesCount &&
      setCurrentPage((currentPage) => currentPage + 1);
  };

  const handlePrev = () => {
    currentPage !== 1 &&
      setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleSearch = (value) => {
    setSearchStudents(value);
    setCurrentPage(1);
  };

  let filterStudents = students;

  if (searchStudents) {
    filterStudents = students.filter(
      (student) =>
        student.fullName
          .toString()
          .toLowerCase()
          .indexOf(searchStudents.toLowerCase()) > -1
    );
  }

  const paginateData = paginate(
    filterStudents,
    currentPage,
    pageSize
  );

  const handleModalPageChange = (page) => {
    setModalCurrentPageCourse(page);
  };

  const handleModalNext = () => {
    const pagesCount = Math.ceil(courses?.length / pageSize);
    modalCurrentPageCourse !== pagesCount &&
      setModalCurrentPageCourse(
        (modalCurrentPage) => modalCurrentPage + 1
      );
  };

  const handleModalPrev = () => {
    modalCurrentPageCourse !== 1 &&
      setModalCurrentPageCourse(
        (modalCurrentPage) => modalCurrentPage - 1
      );
  };

  const handleSearchCourse = (value) => {
    setSearchCourse(value);
    setModalCurrentPageCourse(1);
  };

  let filterCourses = courses;

  if (searchCourse) {
    filterCourses = courses.filter(
      (course) =>
        course.title
          .toString()
          .toLowerCase()
          .indexOf(searchCourse.toLowerCase()) > -1
    );
  }

  const paginateModalData = paginate(
    filterCourses,
    modalCurrentPageCourse,
    pageSize
  );

  const handleLessonModalPageChange = (page) => {
    setModalCurrentPageLesson(page);
  };

  const handleLessonModalNext = () => {
    const pagesCount = Math.ceil(
      studentModal?.courses?.length / pageSize
    );
    modalCurrentPageLesson !== pagesCount &&
      setModalCurrentPageLesson(
        (modalCurrentPage) => modalCurrentPage + 1
      );
  };

  const handleLessonModalPrev = () => {
    modalCurrentPageLesson !== 1 &&
      setModalCurrentPageLesson(
        (modalCurrentPage) => modalCurrentPage - 1
      );
  };

  const handleSearchLesson = (value) => {
    setSearchLesson(value);
    setModalCurrentPageLesson(1);
  };

  let filterLessons = studentModal?.courses;

  if (searchLesson) {
    filterLessons = studentModal?.courses?.filter(
      (course) =>
        course.title
          .toString()
          .toLowerCase()
          .indexOf(searchLesson.toLowerCase()) > -1
    );
  }

  const paginateModalLessons = paginate(
    filterLessons,
    modalCurrentPageCourse,
    pageSize
  );

  return students ? (
    <>
      <Breadcrumbs
        title="مدیریت دانشجویان"
        data={[{ title: 'مدیریت دانشجویان' }]}
      />
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <div>
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
              <Input
                calue={searchStudents}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="جست و جو..."
              />
            </InputGroup>
          </div>
          <Button.Ripple
            color="primary"
            size="md"
            className="mb-2"
            onClick={toggleAddSidebar}
          >
            افزودن دانشجو
          </Button.Ripple>
        </CardHeader>
        <CardBody>
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
              {paginateData.length > 0
                ? paginateData.map((course) => (
                    <tr key={course._id}>
                      <td>
                        <img
                          className="me-75 rounded-circle"
                          src={course.profile}
                          alt="angular"
                          height="40"
                          width="40"
                        />
                        <span className="align-middle fw-bold">
                          {course.fullName}
                        </span>
                      </td>
                      <td>{course.nationalId}</td>
                      <td>{course.phoneNumber}</td>
                      <td>{course.birthDate}</td>
                      <td>
                        {course.isActive ? (
                          <Badge
                            className="px-1"
                            pill
                            color="light-success"
                          >
                            فعال
                          </Badge>
                        ) : (
                          <Badge
                            className="px-2"
                            color="light-danger"
                          >
                            غیرفعال
                          </Badge>
                        )}
                      </td>
                      <td>
                        <div className="d-inline-block me-1">
                          {course.isActive === true ? (
                            <Button.Ripple
                              color="danger"
                              size="sm"
                              onClick={() =>
                                handleDeactive(course._id)
                              }
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
                        <div className="d-inline-block me-1">
                          <Button.Ripple
                            color="success"
                            size="sm"
                            onClick={() =>
                              handleShowCourses(course._id)
                            }
                          >
                            <Book size={16} />
                          </Button.Ripple>
                        </div>
                        <div className="d-inline-block me-1">
                          <Button.Ripple
                            color="warning"
                            size="sm"
                            onClick={() =>
                              handleShowStudentCourse(
                                course._id,
                                course.fullName
                              )
                            }
                          >
                            <Layers size={16} />
                          </Button.Ripple>
                        </div>
                        <div className="d-inline-block me-1">
                          <Button.Ripple
                            color="primary"
                            size="sm"
                            onClick={() => handleEdit(course?._id)}
                          >
                            <Edit size={16} />
                          </Button.Ripple>
                        </div>
                        <div className="d-inline-block me-1">
                          <Button.Ripple color="danger" size="sm">
                            <Trash
                              size={16}
                              onClick={() => handleDelete(course._id)}
                            />
                          </Button.Ripple>
                        </div>
                      </td>
                    </tr>
                  ))
                : Array(pageSize)
                    .fill()
                    .map((i) => <Skeleton key={i} />)}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
              <Input
                className="mx-50"
                type="select"
                id="rows-per-page"
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                style={{ width: "5rem" }}
              >
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
              </Input>
              <h6>تعداد کل دانشجویان : {students.length}</h6>
            </div>
            <PaginationIcons
              itemsCount={students.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        </CardBody>
      </Card>

      <AddStudent
        open={addStudentOpen}
        toggleSidebar={toggleAddSidebar}
        setRefreshStudentInfo={setRefreshStudentInfo}
      />
      <StudentEdit
        open={editStudentOpen}
        toggleSidebar={toggleEditSidebar}
        studentId={studentsId}
        setRefreshStudentInfo={setRefreshStudentInfo}
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
          <Row className="mb-1">
            <Col sm={2}></Col>
            <Col sm={8}>
              <InputGroup className="input-group-merge">
                <InputGroupText>
                  <Search size={14} />
                </InputGroupText>
                <Input
                  value={searchCourse}
                  onChange={(e) => handleSearchCourse(e.target.value)}
                  placeholder="جستجو..."
                />
              </InputGroup>
            </Col>
            <Col sm={2}></Col>
          </Row>
          {paginateModalData?.map((course) => (
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
                  <small className="text-muted">
                    {course.cost} تومان
                  </small>
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
                  onClick={() =>
                    handleRemoveStudentFromCourse(course._id)
                  }
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
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h6>تعداد آیتم ها : {courses.length}</h6>
            <PaginationIcons
              itemsCount={courses.length}
              pageSize={pageSize}
              currentPage={modalCurrentPageCourse}
              onPageChange={handleModalPageChange}
              onNext={handleModalNext}
              onPrev={handleModalPrev}
            />
          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={modal}
        toggle={() => setShow(!modal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          درس های دانشجو :
          {students
            .map((name) => name.fullName)
            .find((m) => m === studentName)}
        </ModalHeader>
        <ModalBody>
          <Row className="mb-1">
            <Col sm={2}></Col>
            <Col sm={8}>
              <InputGroup className="input-group-merge">
                <InputGroupText>
                  <Search size={14} />
                </InputGroupText>
                <Input
                  value={searchLesson}
                  onChange={(e) => handleSearchLesson(e.target.value)}
                  placeholder="جستجو..."
                />
              </InputGroup>
            </Col>
            <Col sm={2}></Col>
          </Row>
          <Table responsive>
            <thead>
              <tr>
                <th>نام دوره</th>
                <th>نام مدرس</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {paginateModalLessons?.map((course) => (
                <tr key={course._id}>
                  <td>
                    <span className="align-middle fw-bold">
                      {course.title}
                    </span>
                  </td>
                  <td>{course.teacher.fullName}</td>
                  <td>
                    <div className="d-inline-block me-1 mb-1">
                      <Button.Ripple
                        color="danger"
                        size="sm"
                        onClick={() =>
                          handleDeleteStudentCourse(
                            course._id,
                            course.title
                          )
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
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h6>تعداد آیتم ها : {studentModal?.courses?.length}</h6>
            <PaginationIcons
              itemsCount={studentModal?.courses?.length}
              pageSize={pageSize}
              currentPage={modalCurrentPageLesson}
              onPageChange={handleLessonModalPageChange}
              onNext={handleLessonModalNext}
              onPrev={handleLessonModalPrev}
            />
          </div>
        </ModalBody>
      </Modal>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default StudentsList;
