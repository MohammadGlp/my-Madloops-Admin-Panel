import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  FormFeedback,
} from 'reactstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Cleave from 'cleave.js/react';

import { selectThemeColors } from '@utils';
import Select from 'react-select';
// ** Styles
import classnames from 'classnames';
import '@styles/react/pages/page-authentication.scss';
import 'cleave.js/dist/addons/cleave-phone.ir';
import '@styles/react/pages/page-form-validation.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
const CoursesEdit = () => {
  const { courseId } = useParams();

  const SignupSchema = yup.object().shape({
    lessonName: yup.string().required('لطفا فیلد نام درس را پر کنید'),
    cost: yup.number().required('لطفا فیلد قیمت درس را پر کنید'),
    capacity: yup.number().required('لطفا فیلد ظرفیت درس را پر کنید'),
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

  const teachers = [
    { value: 'admin', label: 'اَدمین' },
    { value: 'teacher', label: 'تیچر' },
  ];

  const lessons = [
    { value: 'admin', label: 'اَدمین' },
    { value: 'teacher', label: 'تیچر' },
  ];

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">ویرایش درس</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md="6" sm="12" className="mb-1">
              <div className="mb-1">
                <Label className="form-label" for="lessonName">
                  نام درس:
                </Label>
                <Controller
                  id="lessonName"
                  type="text"
                  name="lessonName"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="صفر تا صد ری اکت"
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
            <Col md="6" sm="12" className="mb-1">
              <div className="mb-1">
                <Label className="form-label" for="cost">
                  قیمت درس:
                </Label>
                <Controller
                  id="cost"
                  name="cost"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="3000000"
                      invalid={errors.cost && true}
                    />
                  )}
                />
                {errors.cost && (
                  <FormFeedback>{errors.cost.message}</FormFeedback>
                )}
              </div>
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <div className="mb-1">
                <Label className="form-label" for="capacity">
                  ظرفیت:
                </Label>
                <Controller
                  id="capacity"
                  name="capacity"
                  type="number"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="20"
                      invalid={errors.capacity && true}
                    />
                  )}
                />
                {errors.capacity && (
                  <FormFeedback>
                    {errors.capacity.message}
                  </FormFeedback>
                )}
              </div>
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <div className="mb-1">
                <Label className="form-label" for="startDate">
                  تاریخ شروع:
                </Label>
                <Controller
                  control={control}
                  id="startDate"
                  name="startDate"
                  defaultValue=""
                  render={({ field }) => (
                    <Cleave
                      {...field}
                      className={classnames('form-control', {
                        'is-invalid': errors.startDate && true,
                      })}
                      placeholder="1300-01-01"
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
            <Col md="6" sm="12" className="mb-1">
              <div className="mb-1">
                <Label className="form-label" for="endDate">
                  تاریخ پایان:
                </Label>
                <Controller
                  control={control}
                  id="endDate"
                  name="endDate"
                  defaultValue=""
                  render={({ field }) => (
                    <Cleave
                      {...field}
                      className={classnames('form-control', {
                        'is-invalid': errors.endDate && true,
                      })}
                      placeholder="1300-01-01"
                      options={options1}
                    />
                  )}
                />
                {errors.endDate && (
                  <FormFeedback>
                    {errors.endDate.message}
                  </FormFeedback>
                )}
              </div>
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" htmlFor="teacher">
                استاد
              </Label>
              <Controller
                id="teacher"
                name="teacher"
                theme={selectThemeColors}
                defaultValue={teachers[0]}
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
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" htmlFor="lesson">
                دوره
              </Label>
              <Controller
                id="lesson"
                name="lesson"
                theme={selectThemeColors}
                defaultValue={lessons[0]}
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
            <Col sm="12">
              <div className="d-flex">
                <Button
                  className="me-1"
                  color="primary"
                  type="submit"
                >
                  ویرایش
                </Button>
                <Button outline color="secondary" type="reset">
                  انصراف
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CoursesEdit;
