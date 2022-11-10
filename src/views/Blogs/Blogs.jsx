import { useEffect, useState } from "react";
import { Edit, Trash } from "react-feather";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { DeleteArticle } from "../../services/api/DeleteNews-Articles.api";
import { GetAllNews_Articles } from "../../services/api/GetAllNews-Articles.api";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    const getAll = async () => {
      try {
        const blog = await GetAllNews_Articles();
        console.log(blog);
        setBlogs(blog?.result);
      } catch (error) {}
    };
    getAll();
  }, []);

  const handleDelete = async (blogsId) => {
    const originalCourses = blogs;
    const newCourse = blogs.filter((m) => m._id !== blogsId);
    setBlogs(newCourse);
    try {
      await DeleteArticle(blogsId);
      toast.warning(`آیتم مورد نظر حذف شد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
      setBlogs(originalCourses);
    }
  };
  const handleLead = (value, num) => {
    const trimmedLead =
      value
        .substring(0, num)
        .substring(0, value.substring(0, 200).lastIndexOf(" ")) + "...";
    return trimmedLead;
  };

  return blogs ? (
    <Table responsive>
      <thead>
        <tr>
          <th>تصویر محتوا</th>
          <th>عنوان محتوا</th>
          <th>توضیحات</th>
          <th>دسته بندی</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((course) => (
          <tr key={course._id}>
            <td>
              <img
                className="w-25 h-25"
                src={course.image}
                alt="angular"
                height="20"
                width="20"
              />
            </td>
            <td>
              <span className="align-middle fw-bold">
                {handleLead(course.title, 20)}
              </span>
            </td>
            <td>{handleLead(course.text, 40)}</td>
            <td>{course.category}</td>

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

export default Blogs;
