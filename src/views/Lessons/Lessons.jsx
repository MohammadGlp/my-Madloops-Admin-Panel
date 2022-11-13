import { useEffect, useState } from 'react';
import { Edit, Trash } from 'react-feather';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { GetAllLessons } from './../../services/api/getAllLessons.api';
import { DeleteLessonById } from './../../services/api/DeleteLessonById';
import AddLesson from './AddLesson';
import EditLesson from './EditLesson';

const LessonList = () => {
  const [lessons, setLessons] = useState();
  const [lessonId, setLessonId] = useState();
  const [addLessonOpen, setAddLessonOpen] = useState(false);
  const [editLessonOpen, setEditLessonOpen] = useState(false);

  const toggleAddSidebar = () => setAddLessonOpen(!addLessonOpen);
  const toggleEditSidebar = () => setEditLessonOpen(!editLessonOpen);

  const getAll = async () => {
    try {
      const lesson = await GetAllLessons();
      setLessons(lesson?.result);
    } catch (error) {}
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleDelete = async (lessonId) => {
    const originalLessons = [...lessons];
    const newLessons = lessons.filter((m) => m._id !== lessonId);
    setLessons(newLessons);
    try {
      await DeleteLessonById(lessonId);
      toast.success(`آیتم مورد نظر حذف شد`);
    } catch (error) {
      toast.error('خطایی رخ داده');
      setLessons(originalLessons);
    }
  };

  const handleLead = (value) => {
    const trimmedLead =
      value
        .substring(0, 60)
        .substring(0, value.substring(0, 200).lastIndexOf(' ')) +
      '...';
    return trimmedLead;
  };

  const handleEdit = (lessonId) => {
    toggleEditSidebar();
    setLessonId(lessonId);
  };

  return lessons ? (
    <>
      <Button.Ripple
        color="primary"
        size="md"
        className="mb-2"
        onClick={toggleAddSidebar}
      >
        افزودن درس
      </Button.Ripple>
      <Table responsive>
        <thead>
          <tr>
            <th>نام درس</th>
            <th>توضیحات</th>
            <th>دوره ها</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
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
              <td>{lesson?.courses?.length}</td>
              <td>
                <div className="d-inline-block me-1 mb-1">
                  <Button.Ripple
                    color="primary"
                    size="sm"
                    onClick={() => handleEdit(lesson?._id)}
                  >
                    <Edit size={16} />
                  </Button.Ripple>
                </div>
                <div className="d-inline-block me-1 mb-1">
                  <Button.Ripple color="danger" size="sm">
                    <Trash
                      size={16}
                      onClick={() => handleDelete(lesson._id)}
                    />
                  </Button.Ripple>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddLesson
        open={addLessonOpen}
        toggleSidebar={toggleAddSidebar}
      />
      <EditLesson
        open={editLessonOpen}
        toggleSidebar={toggleEditSidebar}
        lessonId={lessonId}
      />
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default LessonList;
