import { useState, useEffect } from 'react';

import Sidebar from '@components/sidebar';

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

import * as yup from 'yup';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import Cleave from 'cleave.js/react';

import '@styles/react/pages/page-authentication.scss';
import 'cleave.js/dist/addons/cleave-phone.ir';
import '@styles/react/pages/page-form-validation.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

import { GetEmployeeById } from './../../services/api/GetEmployeeById.api';
import { UploadFile } from './../../services/api/UploadFile.api';
import { EditEmployeeAll } from './../../services/api/EditEmployeeKok';

const AdminEdit = ({
  open,
  toggleSidebar,
  adminId,
  setRefreshAdminData,
}) => {
  const [data, setData] = useState({});
  const [refreshAdminInfo, setRefreshAdminInfo] = useState(false);

  useEffect(() => {
    if (adminId) {
      const getAdminById = async () => {
        const result = await GetEmployeeById(adminId);
        setData(result?.result);
      };
      getAdminById();
    }
  }, [adminId, refreshAdminInfo]);

  useEffect(() => {
    setAvatar(data?.profile);
    reset(defaultValues);
  }, [data]);

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

  const options1 = {
    date: true,
    delimiter: '/',
    datePattern: ['Y', 'm', 'd'],
  };

  const defaultValues = {
    fullName: data?.fullName,
    nationalId: data?.nationalId,
    phoneNumber: data?.phoneNumber,
    address: data?.address,
    email: data?.email,
    birthDate: data?.birthDate,
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SignupSchema),
    defaultValues,
  });

  const [avatar, setAvatar] = useState('');

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

  const onSubmit = async (values) => {
    toggleSidebar();
    try {
      await EditEmployeeAll(
        {
          fullName: values.fullName,
          email: values.email,
          address: values.address,
          phoneNumber: values.phoneNumber,
          nationalId: values.nationalId,
          birthDate: values.birthDate,
          profile: avatar ? avatar : data?.profile,
        },
        adminId
      );
      setRefreshAdminInfo((old) => !old);
      toast.success('ادمین با موفقیت ویرایش شد');
      setRefreshAdminData((old) => !old);
    } catch (error) {
      toast.error('ویرایش ادمین با خطا مواجه شد');
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
          <Col md="12" sm="12" className="mb-1">
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
          <Col md="12" sm="12" className="mb-1">
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
          <Col md="12" sm="12" className="mb-1">
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
              <FormFeedback>{errors.birthDate.message}</FormFeedback>
            )}
          </Col>
          <Col md="12" sm="12" className="mb-1">
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
          <Col md="12" sm="12" className="mb-1">
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

          <Col md="12" sm="12" className="mb-1">
            <Label className="form-label" for="address">
              آدرس :
            </Label>
            <Controller
              id="address"
              name="address"
              control={control}
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
              <FormFeedback>{errors.address.message}</FormFeedback>
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

export default AdminEdit;
