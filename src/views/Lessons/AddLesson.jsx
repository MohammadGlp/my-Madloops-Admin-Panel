import { useState, useEffect } from 'react';

import Sidebar from '@components/sidebar';

import { selectThemeColors } from '@utils';

import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';

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
import { UploadFile } from '../../services/api/UploadFile.api';
import { AddArticle } from '../../services/api/AddArticle.api';
import InputNumber from 'rc-input-number';
import { Minus, Plus } from 'react-feather';
import '@styles/react/libs/input-number/input-number.scss';
import { LessonAdd } from '../../services/api/AddLesson.api';

const AddLesson = ({ open, toggleSidebar, setRefreshLessons }) => {
  const [content, setContent] = useState();

  const [avatar, setAvatar] = useState(
    'https://mechanicwp.ir/wp-content/uploads/2018/04/user-circle.png'
  );

  const SignupSchema = yup.object().shape({
    lessonName: yup.string().required('لطفا فیلد نام درس را پر کنید'),
  });

  const category = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
  ];

  const defaultValues = {
    lessonName: '',
  };

  const {
    register,
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

  const handleImgChange = async (e) => {
    let myFormData = new FormData();
    myFormData.append('image', e.target.files[0]);

    const result = await UploadFile({ myFormData: myFormData });
    setAvatar(result?.data.result);
  };

  const handleImgReset = () => {
    setAvatar(
      'https://mechanicwp.ir/wp-content/uploads/2018/04/user-circle.png'
    );
  };

  const onSubmit = async (data) => {
    toggleSidebar();
    try {
      await LessonAdd({
        lessonName: data?.lessonName,
        category: 2,
        description: content.getCurrentContent().getPlainText(),
        image: avatar,
        topics: data?.topics?.map((topic) => topic.value),
      });
      setRefreshLessons((old) => !old);
      toast.success('درس با موفقیت افزوده شد');
    } catch (error) {
      toast.error('افزودن درس با خطا مواجه شد');
    }
  };

  const colorOptions = [
    {
      value: 'Javascript',
      label: 'Javascript',
    },
    {
      value: 'Php',
      label: 'Php',
    },
    {
      value: 'Laravel',
      label: 'Laravel',
    },
    {
      value: 'Spring',
      label: 'Spring',
    },
    {
      value: 'Java',
      label: 'Java',
    },
    {
      value: 'C#',
      label: 'C#',
    },
    {
      value: 'react',
      label: 'react',
    },
    {
      value: 'Node js',
      label: 'Node js',
    },
    {
      value: 'Django',
      label: 'Django',
    },
    {
      value: 'Python',
      label: 'Python',
    },
    {
      value: 'HTML',
      label: 'HTMl',
    },
    {
      value: 'Css',
      label: 'Css',
    },
    {
      value: 'WordPress',
      label: 'WordPress',
    },
    {
      value: 'Angular',
      label: 'Angular',
    },
    {
      value: 'Vue',
      label: 'Vue',
    },
  ];

  return (
    <Sidebar
      size="lg"
      open={open}
      title="افزودن درس "
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Row>
        <Col sm="12" className="mb-1">
          <div className="d-flex">
            <div className="me-25">
              <img
                className="rounded-circle me-50"
                src={avatar}
                // alt="بدون تصویر"
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
                  <input
                    id="profile"
                    type="file"
                    hidden
                    onChange={handleImgChange}
                  />
                </Button>
                <Button
                  className="mb-75"
                  color="secondary"
                  size="sm"
                  outline
                  onClick={handleImgReset}
                >
                  حذف
                </Button>
                <p className="mb-0">
                  JPG، GIF یا PNG مجاز است. حداکثر اندازه 800 کیلوبایت
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="lessonName">
                عنوان درس
              </Label>
              <Controller
                id="lessonName"
                name="lessonName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.lessonName && true}
                  />
                )}
              />
              {errors.lessonName && (
                <FormFeedback>
                  {errors.lessonName.message}
                </FormFeedback>
              )}
            </div>
          </Col>
          <Col sm="12" className="mb-1">
            <Label className="form-label" for="topics">
              موضوعات درس
            </Label>
            <Controller
              id="topics"
              name="topics"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable={false}
                  theme={selectThemeColors}
                  isMulti
                  name="colors"
                  options={colorOptions}
                  className="react-select"
                  classNamePrefix="select"
                />
              )}
            />
          </Col>
          <Col sm="12" className="mb-2">
            <Label className="form-label" htmlFor="description">
              توضیحات
            </Label>
            <Controller
              id="description"
              name="description"
              control={control}
              render={({ field }) => (
                <Editor
                  {...field}
                  editorState={content}
                  onEditorStateChange={(data) => setContent(data)}
                />
              )}
            />
            {errors.description && (
              <FormFeedback>
                {errors.description.message}
              </FormFeedback>
            )}
          </Col>

          <Col sm="12">
            <div className="d-flex">
              <Button className="me-1" color="primary" type="submit">
                افزودن
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

export default AddLesson;
