import { useEffect, useState } from "react";
import { Edit, Inbox, Search, Trash } from "react-feather";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardHeader,
  CardBody,
  InputGroup,
  InputGroupText,
  Input,
  Row,
  Col,
} from "reactstrap";
import toast from "react-hot-toast";
import { GetAllLessons } from "./../../services/api/getAllLessons.api";
import { DeleteLessonById } from "./../../services/api/DeleteLessonById";
import AddLesson from "./AddLesson";
import EditLesson from "./EditLesson";
import { dateConvert } from "../../utility/TimeAndDateConverter";
import { addComma } from "../../utility/funcs";
import Breadcrumbs from "@components/breadcrumbs";
import PaginationIcons from "./../pagination";
import { paginate } from "./../../utility/paginate";
import Skeleton from "./../skeleton";
import Spinner from "../spinner/spinner";

const LessonList = () => {
  const [lessons, setLessons] = useState();
  const [lessonId, setLessonId] = useState();
  const [addLessonOpen, setAddLessonOpen] = useState(false);
  const [editLessonOpen, setEditLessonOpen] = useState(false);
  const [refreshLessons, setRefreshLessons] = useState(false);
  const [modal, setModal] = useState(false);
  const [lesson, setLesson] = useState();
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalCurrentPage, setModalCurrentPage] = useState(1);
  const [searchLessons, setSearchLessons] = useState("");
  const [searchCourse, setSearchCourse] = useState("");

  const toggleAddSidebar = () => setAddLessonOpen(!addLessonOpen);
  const toggleEditSidebar = () => setEditLessonOpen(!editLessonOpen);

  const getAll = async () => {
    try {
      const lessons = await GetAllLessons();
      setLessons(lessons?.result);
    } catch (error) {}
  };

  useEffect(() => {
    getAll();
  }, [refreshLessons]);

  useEffect(() => {
    const lesson = lessons?.find((lesson) => lesson._id === lessonId);
    setLesson(lesson);
  }, [lessonId]);

  const handleDelete = async (lessonId) => {
    const originalLessons = [...lessons];
    const newLessons = lessons.filter((m) => m._id !== lessonId);
    setLessons(newLessons);
    try {
      await DeleteLessonById(lessonId);
      setRefreshLessons((old) => !old);
      toast.success(`آیتم مورد نظر حذف شد`);
    } catch (error) {
      toast.error("خطایی رخ داده");
      setLessons(originalLessons);
    }
  };

  const handleLead = (value) => {
    const trimmedLead =
      value
        .substring(0, 60)
        .substring(0, value.substring(0, 200).lastIndexOf(" ")) + "...";
    return trimmedLead;
  };

  const handleEdit = (lessonId) => {
    toggleEditSidebar();
    setLessonId(lessonId);
  };

  const convertDate = (date) => {
    const d = new Date(date);
    const x = d.toISOString();
    const convertedDate = dateConvert(x);
    const m = `${convertedDate.day} ${convertedDate.monthTitle} ${convertedDate.year}`;
    return m;
  };

  const handleShowLessonCourses = (lessonId) => {
    setModal(true);
    setLessonId(lessonId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleModalPageChange = (page) => {
    setModalCurrentPage(page);
  };

  const handleModalNext = () => {
    const pagesCount = Math.ceil(lesson.courses?.length / pageSize);
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

  let filterCourses = lesson?.courses;

  if (searchCourse) {
    filterCourses = lesson?.courses.filter(
      (course) =>
        course.title
          .toString()
          .toLowerCase()
          .indexOf(searchCourse.toLowerCase()) > -1
    );
  }

  const paginateModalData = paginate(filterCourses, modalCurrentPage, pageSize);

  const handleNext = () => {
    const pagesCount = Math.ceil(lessons.length / pageSize);
    currentPage !== pagesCount &&
      setCurrentPage((currentPage) => currentPage + 1);
  };

  const handlePrev = () => {
    currentPage !== 1 && setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleSearch = (value) => {
    setSearchLessons(value);
    setCurrentPage(1);
  };

  let filterLessons = lessons;

  if (searchLessons) {
    filterLessons = lessons.filter(
      (lesson) =>
        lesson.lessonName
          .toString()
          .toLowerCase()
          .indexOf(searchLessons.toLowerCase()) > -1
    );
  }

  const paginateData = paginate(filterLessons, currentPage, pageSize);

  return !lessons ? (
    <Spinner />
  ) : (
    <>
      <Breadcrumbs title="مدیریت درس" data={[{ title: "مدیریت درس" }]} />
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <div>
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
              <Input
                value={searchLessons}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="جستجو..."
              />
            </InputGroup>
          </div>
          <Button.Ripple
            color="primary"
            size="md"
            className=""
            onClick={toggleAddSidebar}
          >
            افزودن درس
          </Button.Ripple>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead style={{ fontSize: "18px" }}>
              <tr>
                <th>نام درس</th>
                <th>توضیحات</th>
                <th>تاریخ</th>
                <th>دوره ها</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {paginateData.length > 0
                ? paginateData.map((lesson) => (
                    <tr key={lesson._id}>
                      <td>
                        <img
                          className="me-75 rounded-circle"
                          src={lesson.image}
                          alt={lesson.lessonName}
                          height="40"
                          width="40"
                        />
                        <span className="align-middle fw-bold">
                          {lesson.lessonName}
                        </span>
                      </td>

                      <td>{handleLead(lesson.description)}</td>
                      <td>{convertDate(lesson.createDate)}</td>
                      <td>
                        <Button.Ripple
                          color="warning"
                          size="sm"
                          onClick={() => handleShowLessonCourses(lesson._id)}
                        >
                          <span className="me-2">
                            {lesson?.courses?.length}
                          </span>

                          <Inbox size={16} />
                        </Button.Ripple>
                      </td>
                      <td>
                        <div className="d-inline-block me-1">
                          <Button.Ripple
                            color="primary"
                            size="sm"
                            onClick={() => handleEdit(lesson?._id)}
                          >
                            <Edit size={16} />
                          </Button.Ripple>
                        </div>
                        <div className="d-inline-block me-1">
                          <Button.Ripple
                            color="danger"
                            size="sm"
                            onClick={() => handleDelete(lesson._id)}
                          >
                            <Trash size={16} />
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
              <h6>تعداد کل درس ها : {lessons?.length}</h6>
            </div>
            <PaginationIcons
              itemsCount={lessons?.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        </CardBody>
      </Card>
      <AddLesson
        open={addLessonOpen}
        toggleSidebar={toggleAddSidebar}
        setRefreshLessons={setRefreshLessons}
      />
      <EditLesson
        open={editLessonOpen}
        toggleSidebar={toggleEditSidebar}
        lessonId={lessonId}
        setRefreshLessons={setRefreshLessons}
      />
      <Modal
        isOpen={modal}
        toggle={() => setModal(!modal)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          دوره های درس{" "}
          {lessons?.find((lesson) => lesson._id === lessonId)?.lessonName}
        </ModalHeader>
        <ModalBody>
          <Row className="mb-1">
            <Col sm={3}></Col>
            <Col sm={6}>
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
            <Col sm={3}></Col>
          </Row>
          <Table responsive>
            <thead>
              <tr>
                <th>نام دوره</th>
                <th>تاریخ شروع</th>
                <th>تاریخ پایان</th>
                <th>قیمت</th>
              </tr>
            </thead>
            <tbody>
              {paginateModalData.map((course) => (
                <tr key={course._id}>
                  <td>
                    <span className="align-middle fw-bold">{course.title}</span>
                  </td>
                  <td>{convertDate(course.startDate)}</td>
                  <td>{convertDate(course.endDate)}</td>
                  <td>{addComma(course.cost.toString())}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h6>تعداد آیتم ها : {lesson?.courses?.length}</h6>
            <PaginationIcons
              itemsCount={lesson?.courses?.length}
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

export default LessonList;
