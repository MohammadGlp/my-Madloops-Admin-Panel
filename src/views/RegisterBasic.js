// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Check } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Cleave from "cleave.js/react";
// ** Custom Components
import Avatar from "@components/avatar";
// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
  Row,
  Col,
} from "reactstrap";
import { selectThemeColors } from "@utils";
import Select from "react-select";
// ** Styles
import classnames from "classnames";
import "@styles/react/pages/page-authentication.scss";
import "cleave.js/dist/addons/cleave-phone.ir";
import "@styles/react/pages/page-form-validation.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { RegisterEmployee } from "../services/api/employee/RegisterEmployee.api";

const RegisterBasic = () => {
  const colourOptions = [
    { value: "admin", label: "اَدمین" },
    { value: "teacher", label: "تیچر" },
  ];

  const SignupSchema = yup.object().shape({
    fullName: yup.string().required("لطفا فیلد نام خانوادگی را پر کنید"),
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
  const options1 = { date: true, delimiter: "-", datePattern: ["Y", "m", "d"] };

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    const response = await RegisterEmployee({
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      nationalId: data.nationalId,
      birthDate: data.birthDate,
      password: data.password,
      role: `${data.role.value}`,
      address: "sari/darband/shahan",
      profile:
        "https://mechanicwp.ir/wp-content/uploads/2018/04/user-circle.png",
    });
    console.log(response);
    if (response) {
      toast.success(response.message[0].message);
    } else if (response === null) {
      toast.error("مشکلی رخ داده است");
    } else {
      toast.error(response.message[0].message);
    }
    console.log(response);
    if (Object.values(data).every((field) => field.length > 0)) {
    }
  };
  return (
    <div className="auth-wrapper auth-basic px-2" dir="rtl">
      <div className="auth-inner my-2">
        <Card className="mb-0">
          <CardBody>
            <Link
              className="brand-logo"
              to="/"
              onClick={(e) => e.preventDefault()}
            >
              <h2 className="brand-text text-primary ms-1">Mad Loops</h2>
            </Link>
            <CardTitle tag="h4" className="mb-1">
              ثبت نام کارمندان
            </CardTitle>

            <Form
              className="auth-register-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
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
              <Row>
                <Col className="mb-1" md="6" sm="12">
                  <Label className="form-label">رول</Label>
                  <Controller
                    name="role"
                    theme={selectThemeColors}
                    defaultValue={colourOptions[0]}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={colourOptions}
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                      />
                    )}
                  />
                </Col>
              </Row>
              <Button color="primary" block type="submit">
                ثبت نام
              </Button>
            </Form>
            <p className="text-center mt-2">
              <Link to="/login">
                <span>صفحه ورود</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default RegisterBasic;
