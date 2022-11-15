import { useEffect, useState } from 'react';
import {
  Edit,
  Search,
  Trash,
  UserMinus,
  UserPlus,
  Users,
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
import AvatarGroup from '@components/avatar-group';
import Avatar from '@components/avatar';

import { getAllCourses } from '../../services/api/GetAllCourses.api';
import { DeleteCourse } from '../../services/api/DeleteCourse.api';
import { GetAllStudents } from '../../services/api/GetAllStudents.api';
import { AddStudentToCourse } from '../../services/api/AddStudentToCourse.api';
import { RemoveStudentFromCourse } from '../../services/api/RemoveStudentFromCourse.api';
import toast from 'react-hot-toast';
import AddCourse from './AddCourse';
import EditCourse from './CourseEdit';
import { addComma } from '../../utility/funcs';
import Breadcrumbs from '@components/breadcrumbs';
import PaginationIcons from '../pagination';
import { paginate } from '../../utility/paginate';
import Skeleton from './../skeleton';

const Courses = () => {
  const [courses, setCourses] = useState();
  const [addCourseOpen, setAddCourseOpen] = useState(false);
  const [editCourseOpen, setEditCourseOpen] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [show, setShow] = useState(false);
  const [students, setStudents] = useState([]);
  const [RefreshCourses, setRefreshCourses] = useState(false);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCourses, setSearchCourses] = useState('');
  const [modalCurrentPage, setModalCurrentPage] = useState(1);
  const [searchStudent, setSearchStudent] = useState('');

  const toggleAddSidebar = () => setAddCourseOpen(!addCourseOpen);
  const toggleEditSidebar = () => setEditCourseOpen(!editCourseOpen);

  const getAll = async () => {
    try {
      const courses = await getAllCourses();
      setCourses(courses?.data.result);
    } catch (error) {}
  };

  const getAllStudents = async () => {
    try {
      const students = await GetAllStudents();
      const activeStudents = students?.result.filter(
        (student) => student.isActive === true
      );
      setStudents(activeStudents);
    } catch (error) {}
  };

  useEffect(() => {
    getAll();
    getAllStudents();
  }, [RefreshCourses]);

  const handleDelete = async (courseId) => {
    const originalCourses = [...courses];
    const newCourse = courses.filter((m) => m._id !== courseId);
    setCourses(newCourse);
    try {
      await DeleteCourse(courseId);
      setRefreshCourses((old) => !old);
      toast(`آیتم مورد نظر حذف شد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('خطایی رخ داده');
      }
      setCourses(originalCourses);
    }
  };

  const handleEdit = (courseId) => {
    toggleEditSidebar();
    setCourseId(courseId);
  };

  const handleShowStudents = (courseId) => {
    setShow(!show);
    setCourseId(courseId);
  };

  const handleAddStudentToCourse = async (studentId) => {
    setShow(!show);
    try {
      await AddStudentToCourse(courseId, studentId);
      setRefreshCourses((old) => !old);
      toast.success('دانشجو با موفقیت به دوره اضافه شد');
    } catch (error) {}
  };

  const handleRemoveStudentFromCourse = async (studentId) => {
    setShow(!show);
    try {
      await RemoveStudentFromCourse(courseId, studentId);
      setRefreshCourses((old) => !old);
      toast.success('دانشجو با موفقیت از دوره حذف شد');
    } catch (error) {}
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    const pagesCount = Math.ceil(courses.length / pageSize);
    currentPage !== pagesCount &&
      setCurrentPage((currentPage) => currentPage + 1);
  };

  const handlePrev = () => {
    currentPage !== 1 &&
      setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleSearch = (value) => {
    setSearchCourses(value);
    setCurrentPage(1);
  };

  let filtehCourses = courses;

  if (searchCourses) {
    filtehCourses = courses.filter(
      (student) =>
        student.title
          .toString()
          .toLowerCase()
          .indexOf(searchCourses.toLowerCase()) > -1
    );
  }

  const paginateData = paginate(filtehCourses, currentPage, pageSize);

  const handleModalPageChange = (page) => {
    setModalCurrentPage(page);
  };

  const handleModalNext = () => {
    const pagesCount = Math.ceil(students?.length / pageSize);
    modalCurrentPage !== pagesCount &&
      setModalCurrentPage((modalCurrentPage) => modalCurrentPage + 1);
  };

  const handleModalPrev = () => {
    modalCurrentPage !== 1 &&
      setModalCurrentPage((modalCurrentPage) => modalCurrentPage - 1);
  };

  const handleSearchStudent = (value) => {
    setSearchStudent(value);
    setModalCurrentPage(1);
  };

  let filterStudents = students;

  if (searchStudent) {
    filterStudents = students.filter(
      (student) =>
        student.fullName
          .toString()
          .toLowerCase()
          .indexOf(searchStudent.toLowerCase()) > -1
    );
  }

  const paginateModalData = paginate(
    filterStudents,
    modalCurrentPage,
    pageSize
  );

  return (
    <>
      <Breadcrumbs
        title="مدیریت دوره"
        data={[{ title: 'مدیریت دوره' }]}
      />
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <div>
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
              <Input
                value={searchCourses}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="جستجو..."
              />
            </InputGroup>
          </div>
          <Button.Ripple
            color="primary"
            size="md"
            className="mb-2"
            onClick={toggleAddSidebar}
          >
            افزودن دوره
          </Button.Ripple>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>نام دوره</th>
                <th>مدرس</th>
                <th>ظرفیت</th>
                <th>دانشجویان</th>
                <th>قیمت </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginateData.length > 0
                ? paginateData.map((course) => (
                    <tr key={course._id}>
                      <td>
                        <img
                          className="me-75 rounded-circle"
                          src={course.lesson.image}
                          alt={course.title}
                          height="40"
                          width="40"
                        />
                        <span className="align-middle fw-bold">
                          {course.title}
                        </span>
                      </td>
                      <td>{course.teacher.fullName}</td>
                      <td>{course.capacity}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Badge
                            pill
                            color="light-success"
                            className="me-1"
                          >
                            {course.students.length}
                          </Badge>
                          <AvatarGroup data={course.students} />
                        </div>
                      </td>
                      <td>{addComma(course.cost.toString())}</td>
                      <td>
                        <div className="d-inline-block me-1">
                          <Button.Ripple
                            color="success"
                            size="sm"
                            onClick={() =>
                              handleShowStudents(course._id)
                            }
                          >
                            <Users size={16} />
                          </Button.Ripple>
                        </div>
                        <div className="d-inline-block me-1">
                          <Button.Ripple
                            color="primary"
                            size="sm"
                            onClick={() => handleEdit(course._id)}
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
                style={{ width: '5rem' }}
              >
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
              </Input>
              <h6>تعداد کل دوره ها : {courses.length}</h6>
            </div>
            <PaginationIcons
              itemsCount={courses?.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        </CardBody>
      </Card>

      <AddCourse
        open={addCourseOpen}
        toggleSidebar={toggleAddSidebar}
        setRefreshCourses={setRefreshCourses}
      />
      <EditCourse
        open={editCourseOpen}
        toggleSidebar={toggleEditSidebar}
        courseId={courseId}
        setRefreshCourses={setRefreshCourses}
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
                  value={searchStudent}
                  onChange={(e) =>
                    handleSearchStudent(e.target.value)
                  }
                  placeholder="جستجو..."
                />
              </InputGroup>
            </Col>
            <Col sm={2}></Col>
          </Row>
          {paginateModalData.map((student) => (
            <div
              key={student._id}
              className="employee-task d-flex justify-content-between align-items-center mb-2"
            >
              <div className="d-flex">
                <Avatar
                  imgClassName="rounded"
                  className="me-75"
                  img={student.profile}
                  imgHeight="42"
                  imgWidth="42"
                />
                <div className="my-auto">
                  <h6 className="mb-0">{student.fullName}</h6>
                  <small className="text-muted">
                    {student.email}
                  </small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <Button.Ripple
                  color="warning"
                  className="me-1"
                  size="sm"
                  disabled={
                    !student.courses.find(
                      (course) => course._id === courseId
                    )
                  }
                  onClick={() =>
                    handleRemoveStudentFromCourse(student._id)
                  }
                >
                  <UserMinus size={16} />
                </Button.Ripple>
                <Button.Ripple
                  color="success"
                  size="sm"
                  disabled={student.courses.find(
                    (course) => course._id === courseId
                  )}
                  onClick={() =>
                    handleAddStudentToCourse(student._id)
                  }
                >
                  <UserPlus size={16} />
                </Button.Ripple>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h6>تعداد آیتم ها : {students.length}</h6>
            <PaginationIcons
              itemsCount={students.length}
              pageSize={pageSize}
              currentPage={modalCurrentPage}
              onPageChange={handleModalPageChange}
              onNext={handleModalNext}
              onPrev={handleModalPrev}
            />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Courses;
