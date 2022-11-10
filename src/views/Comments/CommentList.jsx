import { useEffect, useState } from 'react';
import {
  CheckCircle,
  Edit,
  MessageCircle,
  Trash,
  UserCheck,
  UserX,
} from 'react-feather';
import { Table, Button, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { GetAllComments } from './../../services/api/GetAllComments.api';
import { VarifyComment } from './../../services/api/VarifyComment.api';
import { AnswerComment } from './../../services/api/AnswerComment.api';
import { Send } from 'react-feather';
import { dateConvert } from '../../utility/TimeAndDateConverter';

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const comment = await GetAllComments();
        setComments(comment?.data);
      } catch (error) {}
    };
    getAll();
  }, []);

  const handleVerify = async (commentId) => {
    try {
      await VarifyComment(commentId);
      toast.success(`کامنت تایید شد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('خطایی رخ داده');
      }
    }
  };

  const handleAnswere = async (commentId) => {
    // const originalCourses = courses;
    // const newCourse = courses.filter((m) => m._id !== courseId);
    // setCourses(newCourse);
    try {
      await AnswerComment('salam', commentId, true);
      toast.warning(`وضعیت دانشجو به فعال تغییر کرد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('خطایی رخ داده');
      }
      //   setCourses(originalCourses);
    }
  };

  const convertDate = (date) => {
    const convertedDate = dateConvert(date);
    const m = `${convertedDate.day} ${convertedDate.monthTitle} ${convertedDate.year}`;
    return m;
  };

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
              <span className="align-middle fw-bold d-block">
                {course.username}
              </span>
              <small className="text-muted">{course.email}</small>
            </td>
            <td>{course.comment}</td>
            <td>{convertDate(course?.createDate)}</td>

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
              <div className="d-inline-block me-1 mb-1">
                <Button.Ripple
                  color="primary"
                  size="sm"
                  onClick={() => handleAnswere(course._id)}
                >
                  {/* <Edit size={16} /> */}
                  <MessageCircle size={16} />
                </Button.Ripple>
              </div>

              <div className="d-inline-block me-1 mb-1">
                <Button.Ripple
                  color="success"
                  size="sm"
                  onClick={() => handleVerify(course._id)}
                >
                  <CheckCircle size={16} />
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
