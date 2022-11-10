import { useEffect, useState } from "react";
import { Edit, Trash, UserCheck, UserX } from "react-feather";
import { Table, Button, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { GetAllComments } from "./../../services/api/GetAllComments.api";
import { VarifyComment } from "./../../services/api/VarifyComment.api";
import { AnswerComment } from "./../../services/api/AnswerComment.api";
import { Send } from "react-feather";
import { dateConvert } from "../../utility/TimeAndDateConverter";

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const comment = await GetAllComments();
        console.log(comment);
        setComments(comment?.data);
      } catch (error) {}
    };
    getAll();
  }, []);

  const handleVerify = async (commentId) => {
    // const originalCourses = courses;
    // const newCourse = courses.filter((m) => m._id !== courseId);
    // setCourses(newCourse);
    try {
      await VarifyComment(commentId);
      toast.warning(`وضعیت دانشجو به فعال تغییر کرد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
      //   setCourses(originalCourses);
    }
  };

  const handleAnswere = async (commentId) => {
    // const originalCourses = courses;
    // const newCourse = courses.filter((m) => m._id !== courseId);
    // setCourses(newCourse);
    try {
      await AnswerComment("salam", commentId, true);
      toast.warning(`وضعیت دانشجو به فعال تغییر کرد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
      //   setCourses(originalCourses);
    }
  };

  // const ISODate = newDate.toISOString();
  // const xISO = dateConvert(ISODate);

  return comments ? (
    <Table responsive>
      <thead>
        <tr>
          <th>نام کاربری فرستنده</th>
          <th>متن کامنت</th>
          <th>تاریخ ارسال</th>
          <th>وضعیت</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {comments.map((course) => (
          <tr key={course._id}>
            <td>
              <span className="align-middle fw-bold">{course.username}</span>
            </td>
            <td>{course.comment}</td>
            <td>{course.createDate}</td>

            <td>
              {course.verified ? (
                <Badge className="px-1" pill color="light-success">
                  تایید
                </Badge>
              ) : (
                <Badge className="px-2" color="light-danger">
                  عدم تایید
                </Badge>
              )}
            </td>
            <td>
              <button onClick={() => handleAnswere(course._id)}>
                <Send />
              </button>
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
                  <UserCheck
                    size={16}
                    onClick={() => handleVerify(course._id)}
                  />
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

export default CommentList;
