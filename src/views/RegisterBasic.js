// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

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
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

const RegisterBasic = () => {
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
              // onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="register-username">
                  نام و نام خانوادگی:
                </Label>
                <Input
                  type="text"
                  id="register-username"
                  placeholder="تقی تقیان"
                  autoFocus
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-email">
                  ایمیل:
                </Label>
                <Input
                  type="email"
                  id="register-email"
                  placeholder="john@example.com"
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-username">
                  تاریخ تولد:
                </Label>
                <Input
                  type="text"
                  id="register-username"
                  placeholder="1350/01/01"
                  autoFocus
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-username">
                  شماره همراه:
                </Label>
                <Input
                  type="text"
                  id="register-username"
                  placeholder="09112345678"
                  autoFocus
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-username">
                  کد ملی:
                </Label>
                <Input
                  type="text"
                  id="register-username"
                  placeholder="12345678912"
                  autoFocus
                />
              </div>

              <div className="mb-1">
                <Label className="form-label" for="register-password">
                  پسورد:
                </Label>
                <Input
                  className="input-group-merge"
                  id="register-password"
                  type="password"
                />
              </div>
              <Button color="primary" block>
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
