import { useParams } from 'react-router-dom';
import Cleave from 'cleave.js/react';
import { useForm, Controller } from 'react-hook-form';
import 'cleave.js/dist/addons/cleave-phone.us';

import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
} from 'reactstrap';

import classnames from 'classnames';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UploadFile } from './../../services/api/UploadFile.api';
import { EditEmployeeInfo } from './../../services/api/EditEmployeInfo.api';
import avatar2 from '../../assets/images/portrait/small/avatar-s-11.jpg';

import { EditStudentInfo } from '../../services/api/EditStudentInfo.api';
import { useState } from 'react';

const StudentEdit = ({ data }) => {
  const { studentId } = useParams();

  const SignupSchema = yup.object().shape({
    fullName: yup
      .string()
      .required('لطفا فیلد نام و نام خانوادگی را پر کنید'),
    email: yup
      .string()
      .email('الگوی وارد شده صحیح نمی باشد')
      .required('لطفا فیلد ایمیل را پر کنید'),

    nationalId: yup
      .string()
      .required('لطفا فیلد کد ملی را پر کنید')
      .matches(/^[0-9]+$/, 'الگوی وارد شده صحیح نمی باشد')
      .min(10, 'تعداد ارقام کد ملی صحیح نیست')
      .max(10, 'تعداد ارقام کد ملی صحیح نیست'),

    phoneNumber: yup
      .string()
      .required('شماره تماس را وارد کنید')
      .matches(
        /^(0|0098|\+98|98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/,
        'شماره تلفن صحیح نیست'
      ),

    birthDate: yup
      .string()
      .required('لطفا فیلد تاریخ تولد را پر کنید')
      .nullable(),
  });

  // ** Hooks
  const defaultValues = {
    fullName: '',
    nationalId: '',
    phoneNumber: '',
    address: '',
    email: '',
    birthDate: '',
  };

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(SignupSchema),
  });

  // ** States
  const [avatar, setAvatar] = useState(
    data?.profile ? data?.profile : ''
  );

  const onChange = async (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      console.log(reader.result);
      setAvatar(reader.result);
    };
    reader.readAsDataURL(files[0]);

    const result = await UploadFile(avatar);
    console.log(result);
  };

  const handleImgReset = async () => {
    setAvatar(
      require('../../../src/assets/images/avatars/avatar-blank.png')
        .default
    );
    const result = await UploadFile(avatar);
    console.log(result);
  };

  const onSubmit = async (data) => {
    const response = await EditStudentInfo(data, studentId);
    console.log(response);
    // console.log(data);
  };

  const options1 = {
    date: true,
    delimiter: '/',
    datePattern: ['Y', 'm', 'd'],
  };

  return (
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle tag="h4">جزئیات دانشجو</CardTitle>
      </CardHeader>
      <CardBody className="py-2 my-25">
        <div className="d-flex">
          <div className="me-25">
            <img
              className="rounded me-50"
              src={avatar2}
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
                  onChange={onChange}
                  hidden
                  accept="image/*"
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
        <Form
          className="mt-2 pt-50"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Row>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="fullName">
                نام و نام خانوادگی :
              </Label>
              <Controller
                name="fullName"
                id="fullName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder={data?.fullName}
                    invalid={errors.fullName && true}
                  />
                )}
              />
              {errors && errors.fullName && (
                <FormFeedback>{errors.fullName.message}</FormFeedback>
              )}
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="email">
                ایمیل :
              </Label>
              <Controller
                id="email"
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder={data?.email}
                    invalid={errors.email && true}
                  />
                )}
              />
              {errors.email && (
                <FormFeedback>{errors.email.message}</FormFeedback>
              )}
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="date">
                تاریخ تولد:
              </Label>
              <Controller
                id="date"
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': errors.birthDate && true,
                    })}
                    placeholder={data?.birthDate}
                    options={options1}
                  />
                )}
              />
              {errors.birthDate && (
                <FormFeedback>
                  {errors.birthDate.message}
                </FormFeedback>
              )}
            </Col>
            <Col sm="6" className="mb-1">
              <div className="mb-1">
                <Label className="form-label" for="nationalId">
                  کد ملی:
                </Label>
                <Controller
                  id="nationalId"
                  name="nationalId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder={data?.nationalId}
                      invalid={errors.nationalId && true}
                    />
                  )}
                />
                {errors.nationalId && (
                  <FormFeedback>
                    {errors.nationalId.message}
                  </FormFeedback>
                )}
              </div>
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="phoneNumber">
                شماره همراه:
              </Label>

              <Controller
                id="phoneNumber"
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder={data?.phoneNumber}
                    invalid={errors.phoneNumber && true}
                  />
                )}
              />
              {errors.phoneNumber && (
                <FormFeedback>
                  {errors.phoneNumber.message}
                </FormFeedback>
              )}
            </Col>

            <Col className="mt-2" sm="12">
              <Button type="submit" className="me-1" color="primary">
                ثبت تغییرات
              </Button>
              <Button color="secondary" outline>
                حذف تغییرات
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default StudentEdit;
