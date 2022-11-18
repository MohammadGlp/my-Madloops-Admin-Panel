// ** React Imports
import { Fragment, useState } from 'react';

// ** Third Party Components
import Cleave from 'cleave.js/react';
import { useForm, Controller } from 'react-hook-form';
import 'cleave.js/dist/addons/cleave-phone.us';

// ** Reactstrap Imports
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

// ** Demo Components
import classnames from 'classnames';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UploadFile } from './../../services/api/UploadFile.api';
import { EditEmployeeInfo } from './../../services/api/EditEmployeInfo.api';

const AccountTabs = ({ data, setRefresh }) => {
  const SignupSchema = yup.object().shape({
    fullName: yup
      .string()
      .required('لطفا فیلد نام و نام خانوادگی را پر کنید'),
    address: yup.string().required('لطفا فیلد آدرس را پر کنید'),
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
    fullName: data?.fullName,
    nationalId: data?.nationalId,
    phoneNumber: data?.phoneNumber,
    address: data?.address,
    email: data?.email,
    birthDate: data?.birthDate,
  };
  const {
    control,
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

  const handleImgChange = async (e) => {
    let myFormData = new FormData();
    myFormData.append('image', e.target.files[0]);

    const result = await UploadFile({ myFormData: myFormData });
    setAvatar(result?.data?.result);
  };

  const handleImgReset = () => {
    setAvatar(
      'https://mechanicwp.ir/wp-content/uploads/2018/04/user-circle.png'
    );
  };

  const onSubmit = async (data) => {
    await EditEmployeeInfo(data, avatar);
    setRefresh((old) => !old);
  };

  const options1 = {
    date: true,
    delimiter: '-',
    datePattern: ['Y', 'm', 'd'],
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">جزئیات نمایه</CardTitle>
        </CardHeader>
        <CardBody className="py-2 my-25">
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
                    onChange={handleImgChange}
                    hidden
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
                  <FormFeedback>
                    {errors.fullName.message}
                  </FormFeedback>
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

              <Col sm="6" className="mb-1">
                <Label className="form-label" for="address">
                  آدرس :
                </Label>
                <Controller
                  id="address"
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder={data?.address}
                      invalid={errors.address && true}
                    />
                  )}
                />
                {errors.address && (
                  <FormFeedback>
                    {errors.address.message}
                  </FormFeedback>
                )}
              </Col>

              <Col className="mt-2" sm="12">
                <Button
                  type="submit"
                  className="me-1"
                  color="primary"
                >
                  ثبت تغییرات
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default AccountTabs;
