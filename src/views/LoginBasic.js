// ** React Imports
import { Link } from "react-router-dom";

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

const LoginBasic = () => {
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
            <Form
              className="auth-login-form mt-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  ایمیل :
                </Label>
                <Input
                  type="email"
                  id="login-email"
                  placeholder="john@example.com"
                  autoFocus
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    پسورد :
                  </Label>
                </div>
                <Input
                  className="input-group-merge"
                  id="login-password"
                  type="password"
                />
              </div>
              <Button color="primary" block>
                ورود
              </Button>
            </Form>
            <p className="text-center mt-2">
              <Link to="/register">
                <span>ثبت نام</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginBasic;
