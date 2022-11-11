import { Fragment, useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { GetCourseById } from "../../services/api/GetCourseById.api";
import { Inbox } from "react-feather";

const ModalConfig = [
  {
    id: 1,
    btnTitle: <Inbox size={16} />,
    modalTitle: "دوره های استاد :",
    modalClass: "h-50",
  },
];

const ModalSizes = ({ teacherId }) => {
  const [teacherCourse, setTeacherCourse] = useState([]);
  const [modal, setModal] = useState(null);

  const toggleModal = (id) => {
    if (modal !== id) {
      setModal(id);
    } else {
      setModal(null);
    }
  };

  useEffect(() => {
    const getTeacherCourseById = async () => {
      try {
        const teacherCourse = await GetCourseById(teacherId);
        console.log(teacherCourse, "sdsd");
        setTeacherCourse();
      } catch (error) {
        return error;
      }
    };
    getTeacherCourseById();
  }, []);

  const renderModal = ModalConfig.map((item) => {
    return (
      <Fragment key={item.id}>
        <div>
          <Button
            color="primary"
            onClick={() => toggleModal(item.id)}
            key={item.title}
            outline
          >
            {item.btnTitle}
          </Button>
        </div>
        <Modal
          isOpen={modal === item.id}
          toggle={() => toggleModal(item.id)}
          className={`modal-dialog-centered ${item.modalClass}`}
          key={item.id}
        >
          <ModalHeader toggle={() => toggleModal(item.id)}>
            {item.modalTitle}
            {item.title}
          </ModalHeader>
          <ModalBody>
            <Table responsive>
              <thead>
                <tr>
                  <th>نام دوره</th>
                  <th>ظرفیت</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {/* {teachers.map((course) => (
                  <tr key={course._id}>
                    <td>
                      <span className="align-middle fw-bold">
                        {course.fullName}
                      </span>
                    </td>
                    <td>{course.capacity}</td>
                    <td>
                      <div className="d-inline-block me-1 mb-1">
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
                ))} */}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => toggleModal(item.id)}
              outline
            >
              خروج
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  });

  return <div className="demo-inline-spacing">{renderModal}</div>;
};
export default ModalSizes;
