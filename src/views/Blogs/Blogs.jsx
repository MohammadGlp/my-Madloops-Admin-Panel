import { useEffect, useState } from 'react';
import { Edit, Search, Trash } from 'react-feather';
import {
  Table,
  Button,
  Badge,
  Card,
  CardBody,
  CardHeader,
  InputGroup,
  InputGroupText,
  Input,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { DeleteArticle } from '../../services/api/DeleteNews-Articles.api';
import { GetAllNews_Articles } from '../../services/api/GetAllNews-Articles.api';
import BlogsEdit from './BlogsEdit';
import AddBlog from './AddBlog';
import Breadcrumbs from '@components/breadcrumbs';

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [editBlogOpen, setEditBlogOpen] = useState(false);
  const [addBlogOpen, setAddBlogOpen] = useState(false);
  const [blogId, setBlogId] = useState();
  const [RefreshBlogs, setRefreshBlogs] = useState(false);

  const toggleEditSidebar = () => setEditBlogOpen(!editBlogOpen);
  const toggleAddSidebar = () => setAddBlogOpen(!addBlogOpen);

  useEffect(() => {
    const getAll = async () => {
      try {
        const blog = await GetAllNews_Articles();
        setBlogs(blog?.result);
      } catch (error) {}
    };
    getAll();
  }, [RefreshBlogs]);

  const handleDelete = async (blogsId) => {
    const originalBlogs = [...blogs];
    const newBlogs = blogs.filter((m) => m._id !== blogsId);
    setBlogs(newBlogs);
    try {
      await DeleteArticle(blogsId);
      setRefreshBlogs((old) => !old);
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
      <Breadcrumbs
        title="مدریت اخبار و مقالات"
        data={[{ title: 'مدیریت اخبار و مقالات' }]}
      />
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
            className="mb-2"
            onClick={toggleAddSidebar}
          >
            افزودن اخبار و مقاله
          </Button.Ripple>
        </CardHeader>
        <CardBody>
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
                      height="40"
                      width="40"
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
                    <Badge
                      pill
                      color="light-primary"
                      className="px-1"
                    >
                      {blog?.category}
                    </Badge>
                  </td>

                  <td>
                    <div className="d-inline-block me-1">
                      <Button.Ripple
                        color="primary"
                        size="sm"
                        onClick={() => handleEdit(blog?._id)}
                      >
                        <Edit size={16} />
                      </Button.Ripple>
                    </div>
                    <div className="d-inline-block me-1">
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
        </CardBody>
      </Card>

      <BlogsEdit
        open={editBlogOpen}
        toggleSidebar={toggleEditSidebar}
        blogId={blogId}
        setRefreshBlogs={setRefreshBlogs}
      />
      <AddBlog
        open={addBlogOpen}
        toggleSidebar={toggleAddSidebar}
        setRefreshBlogs={setRefreshBlogs}
      />
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default Blogs;
