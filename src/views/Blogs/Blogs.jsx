import { useEffect, useState } from 'react';
import { Edit, Trash } from 'react-feather';
import { Table, Button, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { DeleteArticle } from '../../services/api/DeleteNews-Articles.api';
import { GetAllNews_Articles } from '../../services/api/GetAllNews-Articles.api';
import BlogsEdit from './BlogsEdit';

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [editBlogOpen, setEditBlogOpen] = useState(false);
  const [blogId, setBlogId] = useState();

  const toggleEditSidebar = () => setEditBlogOpen(!editBlogOpen);

  useEffect(() => {
    const getAll = async () => {
      try {
        const blog = await GetAllNews_Articles();
        setBlogs(blog?.result);
      } catch (error) {}
    };
    getAll();
  }, []);

  const handleDelete = async (blogsId) => {
    const originalBlogs = [...blogs];
    const newBlogs = blogs.filter((m) => m._id !== blogsId);
    setBlogs(newBlogs);
    try {
      await DeleteArticle(blogsId);
      toast.success(`آیتم مورد نظر حذف شد`);
    } catch (error) {
      toast.error('خطایی رخ داده');
      setBlogs(originalBlogs);
    }
  };

  const handleLead = (value, num) => {
    const trimmedLead =
      value
        .substring(0, num)
        .substring(0, value.substring(0, 200).lastIndexOf(' ')) +
      '...';
    return trimmedLead;
  };

  const handleEdit = (blogId) => {
    toggleEditSidebar();
    setBlogId(blogId);
  };

  return blogs ? (
    <>
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
          {blogs.map((blog) => (
            <tr key={blog?._id}>
              <td>
                <img
                  src={blog?.image}
                  alt="angular"
                  height="100"
                  width="110"
                  className="rounded-circle"
                />
              </td>
              <td>
                <span className="align-middle fw-bold">
                  {handleLead(blog?.title, 20)}
                </span>
              </td>
              <td>{handleLead(blog?.text, 40)}</td>
              <td>
                <Badge pill color="light-primary" className="px-1">
                  {blog?.category}
                </Badge>
              </td>

              <td>
                <div className="d-inline-block me-1 mb-1">
                  <Button.Ripple
                    color="primary"
                    size="sm"
                    onClick={() => handleEdit(blog?._id)}
                  >
                    <Edit size={16} />
                  </Button.Ripple>
                </div>
                <div className="d-inline-block me-1 mb-1">
                  <Button.Ripple color="danger" size="sm">
                    <Trash
                      size={16}
                      onClick={() => handleDelete(blog?._id)}
                    />
                  </Button.Ripple>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <BlogsEdit
        open={editBlogOpen}
        toggleSidebar={toggleEditSidebar}
        blogId={blogId}
      />
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default Blogs;
