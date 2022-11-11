import { useState, useEffect } from "react";

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

import { RegisterEmployee } from "./../../services/api/employee/RegisterEmployee.api";

const AddTeacher = ({ open, toggleSidebar }) => {
  const navigate = useNavigate();

  const defaultValues = {
    fullName: "",
    nationalId: "",
    phoneNumber: "",
    address: "",
    email: "",
    birthDate: "",
  };

  const SignupSchema = yup.object().shape({
    fullName: yup.string().required("لطفا فیلد نام خانوادگی را پر کنید"),
    address: yup.string().required("لطفا فیلد آدرس را پر کنید"),
    email: yup
      .string()
      .email("الگوی وارد شده صحیح نمی باشد")
      .required("لطفا فیلد ایمیل را پر کنید"),
    password: yup
      .string()
      .required("لطفا رمز عبور خود را وارد کنید")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "باید شامل 8 نویسه، یک حروف بزرگ، یک عدد و یک نویسه خاص باشد"
      ),
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

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, "");
    }
    clearErrors();
  };

  const onSubmit = async (data) => {
    toggleSidebar();
    try {
      console.log(data);
      await RegisterEmployee({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        nationalId: data.nationalId,
        birthDate: data.birthDate,
        password: data.password,
        role: "teacher",
        address: data.address,
        profile:
          "https://mechanicwp.ir/wp-content/uploads/2018/04/user-circle.png",
      });
      navigate(0);
      toast.success("استاد با موفقیت اضافه شد");
    } catch (error) {
      toast.error("افزودن استاد با خطا مواجه شد");
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="استاد جدید"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="12" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="fullName">
                نام کاربری :
              </Label>
              <Controller
                id="fullName"
                name="fullName"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Bruce"
                    invalid={errors.fullName && true}
                  />
                )}
              />
              {errors.fullName && (
                <FormFeedback>{errors.fullName.message}</FormFeedback>
              )}
            </div>
          </Col>
          <Col md="12" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="email">
                ایمیل :
              </Label>
              <Controller
                id="email"
                name="email"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="bruce.wayne@email.com"
                    invalid={errors.email && true}
                  />
                )}
              />
              {errors.email && (
                <FormFeedback>{errors.email.message}</FormFeedback>
              )}
            </div>
          </Col>
          <Col md="12" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="date">
                تاریخ تولد:
              </Label>
              <Controller
                control={control}
                id="date"
                name="birthDate"
                defaultValue=""
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": errors.birthDate && true,
                    })}
                    placeholder="1300-01-01"
                    options={options1}
                  />
                )}
              />
              {errors.birthDate && (
                <FormFeedback>{errors.birthDate.message}</FormFeedback>
              )}
            </div>
          </Col>
          <Col md="12" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="phoneNumber">
                شماره همراه:
              </Label>

              <Controller
                id="phoneNumber"
                name="phoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="09112345678"
                    invalid={errors.phoneNumber && true}
                  />
                )}
              />
              {errors.phoneNumber && (
                <FormFeedback>{errors.phoneNumber.message}</FormFeedback>
              )}
            </div>
          </Col>
          <Col md="12" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="nationalId">
                کد ملی:
              </Label>
              <Controller
                id="nationalId"
                name="nationalId"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="12345678912"
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
                  placeholder="شیکاگو منهتن"
                  invalid={errors.address && true}
                />
              )}
            />
            {errors.address && (
              <FormFeedback>{errors.address.message}</FormFeedback>
            )}
          </Col>
          <Col md="12" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="password">
                پسورد :
              </Label>
              <Controller
                id="password"
                name="password"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    invalid={errors.password && true}
                  />
                )}
              />
              {errors.password && (
                <FormFeedback>{errors.password.message}</FormFeedback>
              )}
            </div>
          </Col>
          <Col sm="12">
            <div className="d-flex">
              <Button className="me-1" color="primary" type="submit">
                افزودن
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

export default AddTeacher;
