// ** Custom Components
import Avatar from "@components/avatar";
import React, { useEffect, useState } from "react";

// ** Icons Imports
import * as Icon from "react-feather";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { getAllCourses } from "./../services/api/GetAllCourses.api";

const CardTransactions = () => {
  const [myCourse, setMyCourse] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await getAllCourses();
      setMyCourse(result?.data.result);
    };

    getData();
  }, []);

  return (
    <Card className="card-transaction">
      <CardHeader>
        <CardTitle tag="h4">آمار بیشترین فروش ها</CardTitle>
        <small>تومان</small>
      </CardHeader>
      <CardBody>
        {myCourse
          ?.slice(0, 6)
          .sort((a, b) => {
            return b.cost * b.students?.length - a.cost * a.students?.length;
          })
          .map((item) => (
            <div key={item._id} className="transaction-item">
              <div className="d-flex">
                <Avatar className="rounded bg-white" img={item.lesson?.image} />
                <div>
                  <h6 className="transaction-title">{item.title}</h6>
                  <small>{item.lesson?.lessonName}</small>
                </div>
              </div>
              <div
                className={`fw-bolder ${
                  item.cost < 500000 ? "text-danger" : "text-success"
                }`}
              >
                {item.cost * item.students?.length >= 1000000
                  ? `${(item.cost * item.students?.length) / 1000000}M+`
                  : `${(item.cost * item.students?.length) / 1000}K+`}
              </div>
            </div>
          ))}
      </CardBody>
    </Card>
  );
};

export default CardTransactions;
