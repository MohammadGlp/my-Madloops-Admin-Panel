import { useEffect, useState } from "react";
import { Edit, Trash, UserCheck, UserX, Inbox, Search } from "react-feather";
import {
  Table,
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  CardHeader,
  InputGroup,
  InputGroupText,
  Input,
  Row,
  Col,
} from "reactstrap";
import toast from "react-hot-toast";
import { DeactiveEmployee } from "../../services/api/deactiveEmployee";
import { ActiveEmployee } from "../../services/api/ActiveEmployee";
import { GetAllTeachers } from "./../../services/api/GetAllTeachers.api";
import { DeleteEmployee } from "./../../services/api/DeleteEmployee.api";
import { DeleteCourse } from "./../../services/api/DeleteCourse.api";
import AddTeacher from "./AddTeacher";
import TeacherEdit from "./TeacherEdit";
import { getAllCourses } from "./../../services/api/GetAllCourses.api";
import Breadcrumbs from "@components/breadcrumbs";
import PaginationIcons from "../pagination";
import { paginate } from "../../utility/paginate";
import Skeleton from "./../skeleton";
import Spinner from "./../spinner/spinner";

const TeachersList = () => {
  const [teachers, setTeachers] = useState();
  const [teacherModal, setTeacherModal] = useState([]);
  const [addTeacherOpen, setAddTeacherOpen] = useState(false);
  const [editTeacherOpen, setEditTeacherOpen] = useState(false);
  const [RefreshTeacherInfo, setRefreshTeacherInfo] = useState(false);
  const [modal, setModal] = useState(false);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherName, setTeacherName] = useState(null);
  const [rTc, setRtc] = useState(false);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTeachers, setSearchTeachers] = useState("");
  const [modalCurrentPage, setModalCurrentPage] = useState(1);
  const [searchCourse, setSearchCourse] = useState("");

  useEffect(() => {
    const getAll = async () => {
      try {
        const teachers = await GetAllTeachers();
        setTeachers(teachers?.result);
      } catch (error) {}
    };
    getAll();
  }, [RefreshTeacherInfo]);

  const handleDelete = async (teacherId, teacherName) => {
    const originalTeachers = [...teachers];
    const newTeacher = teachers.filter((m) => m._id !== teacherId);
    setTeachers(newTeacher);
    try {
      await DeleteEmployee(teacherId, teacherName);
      setRefreshTeacherInfo((old) => !old);
      toast.success(`استاد با موفقیت حذف شد`);
    } catch (error) {
      toast.error("خطایی رخ داده لطفا مجددا امتحان فرمایید");
      setTeachers(originalTeachers);
    }
  };

  const handleDeleteTeacherCourse = async (courseId, courseName) => {
    const res = await DeleteCourse(courseId);
    if (res.success === true) {
      setTeacherModal((old) => {
        let newData = [...old];
        let newTeachersData = newData;
        newTeachersData = newTeachersData.filter(
          (item) => item._id !== teacherId
        );
        newData = newTeachersData;
        return newData;
      });
      setRtc((old) => !old);
      toast.success(`دوره ${courseName} با موفقیت از استاد حذف شد`);
    } else {
      toast.error("خطایی رخ داده لطفا مجددا امتحان فرمایید");
    }
  };

  const handleActive = async (teacherId) => {
    try {
      await ActiveEmployee(teacherId);
      toast.success(`وضعیت استاد به فعال تغییر کرد`);
      setRefreshTeacherInfo((old) => !old);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
    }
  };

  const handleDeactive = async (teacherId) => {
    try {
      await DeactiveEmployee(teacherId);
      toast.success(`وضعیت استاد به غیر فعال تغییر کرد`);
      setRefreshTeacherInfo((old) => !old);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
    }
  };

  useEffect(() => {
    const getAll = async () => {
      const courses = await getAllCourses();
      setTeacherModal(courses?.data.result);
    };
    getAll();
  }, [rTc]);

  const handleShowTeacherCourse = (teacherId, teacherTitle) => {
    setModal(true);
    setTeacherName(teacherTitle);
    setTeacherId(teacherId);
  };

  const toggleAddSidebar = () => setAddTeacherOpen(!addTeacherOpen);
  const toggleEditSidebar = () => setEditTeacherOpen(!editTeacherOpen);

  const handleEdit = (teacherId) => {
    toggleEditSidebar();
    setTeacherId(teacherId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    const pagesCount = Math.ceil(teachers.length / pageSize);
    currentPage !== pagesCount &&
      setCurrentPage((currentPage) => currentPage + 1);
  };

  const handlePrev = () => {
    currentPage !== 1 && setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleSearch = (value) => {
    setSearchTeachers(value);
    setCurrentPage(1);
  };

  let filterTeachers = teachers;

  if (searchTeachers) {
    filterTeachers = teachers.filter(
      (student) =>
        student.fullName
          .toString()
          .toLowerCase()
          .indexOf(searchTeachers.toLowerCase()) > -1
    );
  }

  const paginateData = paginate(filterTeachers, currentPage, pageSize);

  const handleModalPageChange = (page) => {
    setModalCurrentPage(page);
  };

  const handleModalNext = () => {
    const pagesCount = Math.ceil(
      teacherModal.filter((te) => te.teacher._id === teacherId).length /
        pageSize
    );
    modalCurrentPage !== pagesCount &&
      setModalCurrentPage((modalCurrentPage) => modalCurrentPage + 1);
  };

  const handleModalPrev = () => {
    modalCurrentPage !== 1 &&
      setModalCurrentPage((modalCurrentPage) => modalCurrentPage - 1);
  };

  const handleSearchCourse = (value) => {
    setSearchCourse(value);
    setModalCurrentPage(1);
  };

  let filterCourses = teacherModal.filter((te) => te.teacher._id === teacherId);

  if (searchCourse) {
    filterCourses = teacherModal
      .filter((te) => te.teacher._id === teacherId)
      .filter(
        (course) =>
          course.title
            .toString()
            .toLowerCase()
            .indexOf(searchCourse.toLowerCase()) > -1
      );
  }

  const paginateModalData = paginate(filterCourses, modalCurrentPage, pageSize);

  return !teachers ? (
    <Spinner />
  ) : (
    <>
      <Breadcrumbs title="مدیریت اساتید" data={[{ title: "مدیریت اساتید" }]} />
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <div>
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
              <Input
                value={searchTeachers}
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
            افزودن استاد
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
                ? paginateData?.map((course) => (
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
                        <div className="d-inline-block me-1">
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
                        <div className="d-inline-block me-1">
                          <Button.Ripple
                            color="warning"
                            size="sm"
                            onClick={() =>
                              handleShowTeacherCourse(
                                course._id,
                                course.fullName
                              )
                            }
                          >
                            <Inbox size={16} />
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
                              onClick={() =>
                                handleDelete(course._id, course.fullName)
                              }
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
              <h6>تعداد کل اساتید : {teachers.length}</h6>
            </div>
            <PaginationIcons
              itemsCount={teachers.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        </CardBody>
      </Card>

      <AddTeacher
        open={addTeacherOpen}
        toggleSidebar={toggleAddSidebar}
        setRefreshTeacherInfo={setRefreshTeacherInfo}
      />
      <TeacherEdit
        open={editTeacherOpen}
        toggleSidebar={toggleEditSidebar}
        teacherId={teacherId}
        setRefreshTeacherInfo={setRefreshTeacherInfo}
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
          <Table responsive>
            <thead>
              <tr>
                <th>نام دوره</th>
                <th>ظرفیت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {paginateModalData.map((course) => (
                <tr key={course._id}>
                  <td>
                    <span className="align-middle fw-bold">{course.title}</span>
                  </td>
                  <td>{course.capacity}</td>
                  <td>
                    <div className="d-inline-block me-1">
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
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h6>
              تعداد آیتم ها :
              {teacherModal.filter((te) => te.teacher._id === teacherId).length}
            </h6>
            <PaginationIcons
              itemsCount={
                teacherModal.filter((te) => te.teacher._id === teacherId).length
              }
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

export default TeachersList;
