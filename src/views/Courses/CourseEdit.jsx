import { useState, useEffect } from 'react';

import Sidebar from '@components/sidebar';

import { selectThemeColors } from '@utils';

import Select from 'react-select';
import classnames from 'classnames';
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

import '@styles/react/pages/page-authentication.scss';
import 'cleave.js/dist/addons/cleave-phone.ir';
import '@styles/react/pages/page-form-validation.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

import { GetAllTeachers } from '../../services/api/GetAllTeachers.api';
import { GetAllLessons } from '../../services/api/getAllLessons.api';
import { GetCourseById } from '../../services/api/GetCourseById.api';
import { EditCourse } from '../../services/api/EditCourse.api';

const CourseEdit = ({ open, toggleSidebar, courseId }) => {
  const navigate = useNavigate();
  const [allTeachers, setAllTeachers] = useState([]);
  const [allLessons, setAllLessons] = useState([]);
  const [course, setCourse] = useState({});
  const getTeachers = async () => {
    const teachers = await GetAllTeachers();
    setAllTeachers(teachers.result);
  };

  const getLessons = async () => {
    const lessons = await GetAllLessons();
    setAllLessons(lessons.result);
  };

  const getCourse = async () => {
    const course = await GetCourseById(courseId);
    setCourse(course.result);
  };

  useEffect(() => {
    getTeachers();
    getLessons();
  }, []);

  useEffect(() => {
    getCourse();
  }, [courseId]);

  useEffect(() => {
    reset(defaultValues);
  }, [course]);

  const SignupSchema = yup.object().shape({
    title: yup.string().required('لطفا فیلد نام درس را پر کنید'),
    cost: yup.string().required('لطفا فیلد قیمت درس را پر کنید'),
    capacity: yup.string().required('لطفا فیلد ظرفیت درس را پر کنید'),
    startDate: yup
      .string()
      .required('لطفا فیلد تاریخ شروع را پر کنید')
      .nullable(),
    endDate: yup
      .string()
      .required('لطفا فیلد تاریخ پایان را پر کنید')
      .nullable(),
  });

  const options1 = {
    date: true,
    delimiter: '/',
    datePattern: ['Y', 'm', 'd'],
  };

  const teachers = allTeachers.map((teacher) => {
    const { _id, fullName } = teacher;
    return { value: _id, label: fullName };
  });

  const lessons = allLessons.map((lesson) => {
    const { _id, lessonName } = lesson;
    return { value: _id, label: lessonName };
  });

  const defaultValues = {
    title: course?.title,
    cost: course?.cost,
    endDate: course?.endDate,
    startDate: course?.startDate,
    capacity: course?.capacity,
    teacher: {
      value: course?.teacher?._id,
      label: course?.teacher?.fullName,
    },
    lesson: {
      value: course?.lesson?._id,
      label: course?.lesson?.lessonName,
    },
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

  const onSubmit = async (data) => {
    toggleSidebar();
    try {
      await EditCourse(data, courseId);
      toast.success('دوره با موفقیت ویرایش شد');
      navigate(0);
    } catch (error) {
      toast.error('ویرایش دوره با خطا مواجه شد');
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="ویرایش دوره "
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="12" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="title">
                نام درس:
              </Label>
              <Controller
                id="title"
                type="text"
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={course?.title}
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
            <Label className="form-label" htmlFor="lesson">
              دوره
            </Label>
            <Controller
              id="lesson"
              name="lesson"
              theme={selectThemeColors}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={lessons}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                />
              )}
            />
          </Col>
          <Col md="12" sm="12" className="mb-1">
            <Label className="form-label" htmlFor="teacher">
              استاد
            </Label>
            <Controller
              id="teacher"
              name="teacher"
              theme={selectThemeColors}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={teachers}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                />
              )}
            />
          </Col>
          <Col md="12" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="cost">
                قیمت درس:
              </Label>
              <Controller
                id="cost"
                name="cost"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder={course?.cost}
                    invalid={errors.cost && true}
                  />
                )}
              />
              {errors.cost && (
                <FormFeedback>{errors.cost.message}</FormFeedback>
              )}
            </div>
          </Col>
          <Col md="12" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="capacity">
                ظرفیت:
              </Label>
              <Controller
                id="capacity"
                name="capacity"
                type="number"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder={course?.capacity}
                    invalid={errors.capacity && true}
                  />
                )}
              />
              {errors.capacity && (
                <FormFeedback>{errors.capacity.message}</FormFeedback>
              )}
            </div>
          </Col>
          <Col md="12" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="startDate">
                تاریخ شروع:
              </Label>
              <Controller
                control={control}
                id="startDate"
                name="startDate"
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': errors.startDate && true,
                    })}
                    placeholder={course?.startDate}
                    options={options1}
                  />
                )}
              />
              {errors.startDate && (
                <FormFeedback>
                  {errors.startDate.message}
                </FormFeedback>
              )}
            </div>
          </Col>
          <Col md="12" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="endDate">
                تاریخ پایان:
              </Label>
              <Controller
                control={control}
                id="endDate"
                name="endDate"
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': errors.endDate && true,
                    })}
                    placeholder={course.endDate}
                    options={options1}
                  />
                )}
              />
              {errors.endDate && (
                <FormFeedback>{errors.endDate.message}</FormFeedback>
              )}
            </div>
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

export default CourseEdit;
