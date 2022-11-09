import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
} from 'reactstrap';
import { getCourseById } from '../../services/api/courses/courses';

const CoursesEdit = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  useEffect(() => {
    const getCourse = async () => {
      const course = await getCourseById(courseId);
      setCourse(course.data.result);
    };
    getCourse();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Multiple Column</CardTitle>
      </CardHeader>

      <CardBody>
        <Form>
          <Row>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="nameMulti">
                First Name
              </Label>
              <Input
                type="text"
                name="name"
                id="nameMulti"
                placeholder="First Name"
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="lastNameMulti">
                Last Name
              </Label>
              <Input
                type="text"
                name="lastname"
                id="lastNameMulti"
                placeholder="Last Name"
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="cityMulti">
                City
              </Label>
              <Input
                type="text"
                name="city"
                id="cityMulti"
                placeholder="City"
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="CountryMulti">
                Country
              </Label>
              <Input
                type="text"
                name="country"
                id="CountryMulti"
                placeholder="Country"
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="CompanyMulti">
                Company
              </Label>
              <Input
                type="text"
                name="company"
                id="CompanyMulti"
                placeholder="Company"
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="EmailMulti">
                Email
              </Label>
              <Input
                type="email"
                name="Email"
                id="EmailMulti"
                placeholder="Email"
              />
            </Col>
            <Col sm="12">
              <div className="d-flex">
                <Button
                  className="me-1"
                  color="primary"
                  type="submit"
                  onClick={(e) => e.preventDefault()}
                >
                  Submit
                </Button>
                <Button outline color="secondary" type="reset">
                  Reset
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
