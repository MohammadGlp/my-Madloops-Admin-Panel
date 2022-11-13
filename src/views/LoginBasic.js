// ** React Imports
import { Link, useNavigate } from "react-router-dom";

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
} from "reactstrap";

// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Custom Components
import Avatar from "@components/avatar";
// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { LoginEmployee } from "../services/api/employee/LoginEmployee.api";

const LoginBasic = () => {
  const navigate = useNavigate();
  const SignupSchema = yup.object().shape({
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
  });

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(SignupSchema) });

  const onSubmit = async (data) => {
    const result = await LoginEmployee(data);
    if (result?.success === true) {
      setTimeout(() => {
        navigate("/home");
      }, 2000);
      toast.success(result?.message[0].message);
    }
  };

  const handleLanding = () => {
    window.location.href = "http://localhost:2000";
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
            <CardTitle tag="h4" className="mb-1 text-center font-bold">
              خوش آمدید
            </CardTitle>
            <CardText className="mb-2 text-center">ورود کارمندان</CardText>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
              <Button color="primary" block type="submit">
                ورود
              </Button>
            </Form>

            <p className="d-flex justify-content-evenly text-center mt-2">
              <Link to="/register">
                <Button.Ripple color="flat-primary">
                  <span>ثبت نام</span>
                </Button.Ripple>
              </Link>

              <Button.Ripple onClick={handleLanding} color="flat-primary">
                <span>بازگشت به سایت</span>
              </Button.Ripple>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginBasic;
