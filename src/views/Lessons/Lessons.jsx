import { useEffect, useState } from "react";
import { Edit, Inbox, Search, Trash } from "react-feather";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Badge,
  Card,
  CardHeader,
  CardBody,
  InputGroup,
  InputGroupText,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { Link } from "react-router-dom";
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

const LessonList = () => {
  const [lessons, setLessons] = useState();
  const [lessonId, setLessonId] = useState();
  const [addLessonOpen, setAddLessonOpen] = useState(false);
  const [editLessonOpen, setEditLessonOpen] = useState(false);
  const [refreshLessons, setRefreshLessons] = useState(false);
  const [modal, setModal] = useState(false);
  const [lesson, setLesson] = useState();
  const [pageSize] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

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
    console.log(d);
    const x = d.toISOString();
    console.log(x);
    const convertedDate = dateConvert(x);
    console.log(convertedDate);
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

  const handleNext = () => {
    const pagesCount = Math.ceil(lessons.length / pageSize);
    currentPage !== pagesCount &&
      setCurrentPage((currentPage) => currentPage + 1);
  };

  const handlePrev = () => {
    currentPage !== 1 && setCurrentPage((currentPage) => currentPage - 1);
  };

  const paginateData = paginate(lessons, currentPage, pageSize);

  return lessons ? (
    <>
      <Breadcrumbs title="مدیریت درس" data={[{ title: "مدیریت درس" }]} />
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <div>
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
              <Input placeholder="search..." />
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
              {paginateData.map((lesson) => (
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
                      <span className="me-2">{lesson?.courses?.length}</span>

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
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h6>تعداد آیتم ها : {lessons.length}</h6>
            <PaginationIcons
              itemsCount={lessons.length}
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
              {lesson?.courses.map((course) => (
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
        </ModalBody>
      </Modal>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default LessonList;
