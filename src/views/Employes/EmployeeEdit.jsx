import { useState, useEffect, useRef } from "react";

import Sidebar from "@components/sidebar";

import { selectThemeColors } from "@utils";

import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";

import { Button, Label, Form, Input, Row, Col, FormFeedback } from "reactstrap";

import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import Cleave from "cleave.js/react";

import "@styles/react/pages/page-authentication.scss";
import "cleave.js/dist/addons/cleave-phone.ir";
import "@styles/react/pages/page-form-validation.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

import { GetEmployeeById } from "./../../services/api/GetEmployeeById.api";
import { UploadFile } from "./../../services/api/UploadFile.api";
import { EditEmployeeAll } from "./../../services/api/EditEmployeeKok";

const AdminEdit = ({ open, toggleSidebar, adminId }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const getAdminById = async () => {
      const result = await GetEmployeeById(adminId);
      setData(result?.result);
    };
    getAdminById();
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [data]);

  const SignupSchema = yup.object().shape({
    fullName: yup.string().required("لطفا فیلد نام و نام خانوادگی را پر کنید"),
    address: yup.string().required("لطفا فیلد آدرس را پر کنید"),
    email: yup
      .string()
      .email("الگوی وارد شده صحیح نمی باشد")
      .required("لطفا فیلد ایمیل را پر کنید"),

    nationalId: yup
      .string()
      .required("لطفا فیلد کد ملی را پر کنید")
      .matches(/^[0-9]+$/, "الگوی وارد شده صحیح نمی باشد")
      .min(10, "تعداد ارقام کد ملی صحیح نیست")
      .max(10, "تعداد ارقام کد ملی صحیح نیست"),

    phoneNumber: yup
      .string()
      .required("شماره تماس را وارد کنید")
      .matches(
        /^(0|0098|\+98|98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/,
        "شماره تلفن صحیح نیست"
      ),

    birthDate: yup
      .string()
      .required("لطفا فیلد تاریخ تولد را پر کنید")
      .nullable(),
  });

  const options1 = {
    date: true,
    delimiter: "/",
    datePattern: ["Y", "m", "d"],
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
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
    defaultValues,
  });

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, "");
    }
    clearErrors();
  };

  const onSubmit = async (data) => {
    let myFormData = new FormData();
    myFormData.append("image", data.files[0]);

    const result = await UploadFile({ myFormData: myFormData });
    toggleSidebar();
    try {
      await EditEmployeeAll(
        {
          fullName: data.fullName,
          email: data.email,
          address: data.address,
          phoneNumber: data.phoneNumber,
          nationalId: data.nationalId,
          birthDate: data.birthDate,
          role: "admin",
          profile: result?.data.result
            ? result?.data.result
            : "https://mechanicwp.ir/wp-content/uploads/2018/04/user-circle.png",
        },
        teacherId
      );
      toast.success("ادمین با موفقیت ویرایش شد");
      navigate(0);
    } catch (error) {
      toast.error("ویرایش ادمین با خطا مواجه شد");
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
                  className={classnames("form-control", {
                    "is-invalid": errors.birthDate && true,
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
                <FormFeedback>{errors.nationalId.message}</FormFeedback>
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
              <FormFeedback>{errors.phoneNumber.message}</FormFeedback>
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
          <Col md="12" sm="12" className="mb-1">
            <Label className="form-label" for="profile">
              آپلود عکس :
            </Label>

            <input id="profile" type="file" {...register("files")} />
          </Col>
          <Col sm="12">
            <div className="d-flex">
              <Button className="me-1" color="primary" type="submit">
                ویرایش
              </Button>
              <Button outline color="secondary" onClick={toggleSidebar}>
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
