import { useState, useEffect } from 'react';

import Sidebar from '@components/sidebar';

import { selectThemeColors } from '@utils';

import Select from 'react-select';
import classnames from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import avatar from '../../assets/images/avatars/1.png';

import {
  Button,
  Label,
  Form,
  Input,
  Row,
  Col,
  FormFeedback,
} from 'reactstrap';

import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import Cleave from 'cleave.js/react';

import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromRaw } from 'draft-js';
import '@styles/react/libs/editor/editor.scss';
import '@styles/base/plugins/forms/form-quill-editor.scss';

import '@styles/react/pages/page-authentication.scss';
import 'cleave.js/dist/addons/cleave-phone.ir';
import '@styles/react/pages/page-form-validation.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

import { GetAllNews_Articles } from '../../services/api/GetAllNews-Articles.api';
import { EditArticle } from '../../services/api/EditArticle.api';

const BlogsEdit = ({ open, toggleSidebar, blogId }) => {
  const initialContent = `
  <p>Cupcake ipsum dolor sit. Amet dessert donut candy chocolate bar cotton dessert candy chocolate. Candy muffin danish. Macaroon brownie jelly beans marzipan cheesecake oat cake. Carrot cake macaroon chocolate cake. Jelly brownie jelly. Marzipan pie sweet roll.</p>
  <p>Liquorice dragée cake chupa chups pie cotton candy jujubes bear claw sesame snaps. Fruitcake chupa chups chocolate bonbon lemon drops croissant caramels lemon drops. Candy jelly cake marshmallow jelly beans dragée macaroon. Gummies sugar plum fruitcake. Candy canes candy cupcake caramels cotton candy jujubes fruitcake.</p>
  `;

  const contentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const editorState = EditorState.createWithContent(contentState);

  const [allBlogs, setAllBlogs] = useState([]);
  const [blog, setBlog] = useState({});
  const getBlogs = async () => {
    const blogs = await GetAllNews_Articles();
    setAllBlogs(blogs?.result);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    const blog = allBlogs.find((blog) => blog._id === blogId);
    setBlog(blog);
    // setContent(editorContent(initialContent));
  }, [blogId]);
  const [content, setContent] = useState(editorState);

  useEffect(() => {
    reset(defaultValues);
  }, [blog]);

  const SignupSchema = yup.object().shape({
    title: yup.string().required('لطفا فیلد نام درس را پر کنید'),
  });

  const category = [
    { value: 'news', label: 'اخبار' },
    { value: 'article', label: 'مقاله' },
  ];

  const defaultValues = {
    title: blog?.title,
    category: {
      value: blog?.category,
      label: blog?.category === 'news' ? 'اخبار' : 'مقاله',
    },
    text: '',
  };

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SignupSchema),
    defaultValues,
  });

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '');
    }
    clearErrors();
  };

  // content.getCurrentContent().getPlainText()

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      text: content.getCurrentContent().getPlainText(),
    };
    toggleSidebar();
    try {
      await EditArticle(newData, blogId);
      toast.success('مقاله با موفقیت ویرایش شد');
    } catch (error) {
      toast.error('ویرایش دوره با خطا مواجه شد');
    }
  };

  const onChange = async (e) => {
    const imagefile = document.querySelector('#prof');
    let myFormData = new FormData();
    myFormData.append('image', imagefile.files[0]);
    const result = await UploadFile({ myFormData: myFormData });
    setAvatar(result.data.result);
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="ویرایش اخبار و مقالات "
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm="12" className="mb-2">
            <div className="d-flex">
              <div className="me-25">
                <img
                  className="rounded me-50"
                  src={avatar}
                  alt="بدون تصویر"
                  height="100"
                  width="100"
                />
              </div>
              <div className="d-flex align-items-end mt-75 ms-1">
                <div>
                  <Button
                    tag={Label}
                    className="mb-75 me-75"
                    size="sm"
                    color="primary"
                  >
                    آپلود
                    <Input
                      type="file"
                      name="profile"
                      id="prof"
                      // onChange={onChange}
                      hidden
                      accept="image/*"
                    />
                  </Button>
                  <Button
                    className="mb-75"
                    color="secondary"
                    size="sm"
                    outline
                    // onClick={handleImgReset}
                  >
                    حذف
                  </Button>
                  {/* <p className="mb-0">
                    JPG، GIF یا PNG مجاز است. حداکثر اندازه 800
                    کیلوبایت
                  </p> */}
                </div>
              </div>
            </div>
            <small className="mt-1">
              JPG، GIF یا PNG مجاز است. حداکثر اندازه 800 کیلوبایت
            </small>
          </Col>
          <Col md="12" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="title">
                عنوان محتوا
              </Label>
              <Controller
                id="title"
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.title && true}
                  />
                )}
              />
              {errors.title && (
                <FormFeedback>{errors.title.message}</FormFeedback>
              )}
            </div>
          </Col>
          <Col md="12" sm="12" className="mb-1">
            <Label className="form-label" htmlFor="category">
              دسته بندی
            </Label>
            <Controller
              id="category"
              name="category"
              theme={selectThemeColors}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={category}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                />
              )}
            />
          </Col>
          <Col sm="12" className="mb-2">
            <Label className="form-label" htmlFor="text">
              توضیحات
            </Label>
            <Controller
              id="text"
              name="text"
              control={control}
              render={({ field }) => (
                // <Input
                //   {...field}
                //   type="text"
                //   invalid={errors.text && true}
                // />
                <Editor
                  {...field}
                  editorState={content}
                  onEditorStateChange={(data) => setContent(data)}
                />
              )}
            />
            {errors.text && (
              <FormFeedback>{errors.text.message}</FormFeedback>
            )}
          </Col>

          <Col sm="12">
            <div className="d-flex">
              <Button className="me-1" color="primary" type="submit">
                ویرایش
              </Button>
              <Button
                outline
                color="secondary"
                onClick={toggleSidebar}
              >
                انصراف
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Sidebar>
  );
};

export default BlogsEdit;
