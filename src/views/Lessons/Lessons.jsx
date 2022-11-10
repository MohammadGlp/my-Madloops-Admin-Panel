import { useEffect, useState } from "react";
import { Edit, Trash } from "react-feather";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { GetAllLessons } from "./../../services/api/getAllLessons.api";
import { DeleteLessonById } from "./../../services/api/DeleteLessonById";

const LessonList = () => {
  const [lessons, setCourses] = useState();
  useEffect(() => {
    const getAll = async () => {
      try {
        const lesson = await GetAllLessons();
        setCourses(lesson?.result);
      } catch (error) {}
    };
    getAll();
  }, []);

  const handleDelete = async (lessonId) => {
    const originalCourses = lessons;
    const newCourse = lessons.filter((m) => m._id !== lessonId);
    setCourses(newCourse);
    try {
      await DeleteLessonById(lessonId);
      toast.warning(`آیتم مورد نظر حذف شد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
      setCourses(originalCourses);
    }
  };

  const handleLead = (value) => {
    const trimmedLead =
      value
        .substring(0, 60)
        .substring(0, value.substring(0, 200).lastIndexOf(" ")) + "...";
    return trimmedLead;
  };

  return lessons ? (
    <Table responsive>
      <thead>
        <tr>
          <th>نام درس</th>
          <th>مدرس</th>
          <th>ظرفیت</th>
          <th>دانشجویان</th>
          <th>قیمت </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {lessons.map((course) => (
          <tr key={course._id}>
            <td>
              <img
                className="me-75"
                src={course.image}
                alt="angular"
                height="20"
                width="20"
              />
            </td>
            <td>
              <span className="align-middle fw-bold">{course.lessonName}</span>
            </td>
            <td>{course.category}</td>
            <td>{handleLead(course.description)}</td>
            <td>{course.topic}</td>
            <td>{course.createDate}</td>
            <td>
              <div className="d-inline-block me-1 mb-1">
                <Link to={`/editCourse/${course._id}`}>
                  <Button.Ripple color="primary" size="sm">
                    <Edit size={16} />
                  </Button.Ripple>
                </Link>
              </div>
              <div className="d-inline-block me-1 mb-1">
                <Button.Ripple color="danger" size="sm">
                  <Trash size={16} onClick={() => handleDelete(course._id)} />
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

export default LessonList;
