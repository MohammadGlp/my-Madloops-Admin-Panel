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

import { GetAllLessons } from '../../services/api/getAllLessons.api';
import { LessonEdit } from '../../services/api/LessonEdit.api';
import { UploadFile } from '../../services/api/UploadFile.api';

const EditLesson = ({
  open,
  toggleSidebar,
  lessonId,
  setRefreshLessons,
}) => {
  const [allLessons, setAllLessons] = useState([]);
  const [lesson, setLesson] = useState({});
  const [content, setContent] = useState();

  const getLessons = async () => {
    const lessons = await GetAllLessons();
    setAllLessons(lessons?.result);
  };

  useEffect(() => {
    getLessons();
  }, []);

  useEffect(() => {
    const lesson = allLessons.find(
      (lesson) => lesson._id === lessonId
    );
    setLesson(lesson);
  }, [lessonId]);

  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const initialContent = lesson?.description
      ? lesson?.description
      : '';
    const contentBlock = htmlToDraft(initialContent);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const editorState = EditorState.createWithContent(contentState);
    setContent(editorState);
    setAvatar(lesson?.image ? lesson?.image : '');
    reset(defaultValues);
  }, [lesson]);

  const SignupSchema = yup.object().shape({
    lessonName: yup.string().required('لطفا فیلد نام درس را پر کنید'),
  });

  const defaultValues = {
    lessonName: lesson?.lessonName,
    topics: lesson?.topics?.map((topic) => ({
      value: topic,
      label: topic,
    })),
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

  const colorOptions = [
    {
      value: 'javascript',
      label: 'javascript',
    },
    {
      value: 'php',
      label: 'php',
    },
    {
      value: 'laravel',
      label: 'laravel',
    },
    {
      value: 'spring',
      label: 'spring',
    },
    {
      value: 'java',
      label: 'java',
    },
    {
      value: '#c',
      label: '#c',
    },
    {
      value: 'react',
      label: 'react',
    },
    {
      value: 'node js',
      label: 'node js',
    },
    {
      value: 'django',
      label: 'django',
    },
    {
      value: 'python',
      label: 'python',
    },
    {
      value: 'html',
      label: 'html',
    },
    {
      value: 'css',
      label: 'css',
    },
    {
      value: 'wordpress',
      label: 'wordpress',
    },
    {
      value: 'angular',
      label: 'angular',
    },
    {
      value: 'vue',
      label: 'vue',
    },
    {
      value: 'ui/ux',
      label: 'ui/ux',
    },
  ];
  const onSubmit = async (data) => {
    toggleSidebar();
    try {
      await LessonEdit(
        {
          lessonName: data?.lessonName,
          category: 2,
          description: content.getCurrentContent().getPlainText(),
          image: avatar,
          topics: data?.topics?.map((topic) => topic.value),
        },
        lessonId
      );
      setRefreshLessons((old) => !old);
      toast.success('درس با موفقیت ویرایش شد');
    } catch (error) {
      toast.error('ویرایش درس با خطا مواجه شد');
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="ویرایش اخبار و مقالات "
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
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
                    disabled
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
                  textAlignment="right"
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

export default EditLesson;
