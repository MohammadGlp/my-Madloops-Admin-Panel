import { useEffect, useState } from "react";
import { CheckCircle, MessageCircle } from "react-feather";
import {
  Table,
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Form,
  FormFeedback,
  CardHeader,
  CardBody,
  Card,
} from "reactstrap";
import toast from "react-hot-toast";
import { GetAllComments } from "./../../services/api/GetAllComments.api";
import { VarifyComment } from "./../../services/api/VarifyComment.api";
import { AnswerComment } from "./../../services/api/AnswerComment.api";
import {
  dateConvert,
  timeConvert,
  toFarsiNumber,
} from "../../utility/TimeAndDateConverter";
import Breadcrumbs from "@components/breadcrumbs";

import Avatar from "@components/avatar";
import profileImg from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { paginate } from "../../utility/paginate";
import PaginationIcons from "../pagination";
import Skeleton from "./../skeleton";

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [RefreshComments, setRefreshComments] = useState(false);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    reset(defaultValues);
  }, [comment]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const comment = await GetAllComments();
        setComments(comment?.data);
      } catch (error) {}
    };
    getAll();
  }, [RefreshComments]);

  const handleVerify = async (commentId) => {
    try {
      await VarifyComment(commentId);
      setRefreshComments((old) => !old);
      toast.success(`کامنت تایید شد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
    }
  };

  const convertDate = (date) => {
    const convertedDate = dateConvert(date);
    const m = `${convertedDate.day} ${convertedDate.monthTitle} ${convertedDate.year}`;
    return m;
  };
  const defaultValues = { answer: comment?.answer };

  const handleModalActive = (commentId) => {
    setShow(!show);

    const comment = comments.find((comment) => comment._id === commentId);
    setComment(comment);

    setDate(convertDate(comment?.createDate));
    setTime(toFarsiNumber(timeConvert(comment?.createDate)));
  };

  const SignupSchema = yup.object().shape({
    answer: yup.string().required("لطفا جوابی برای کامنت در نظر بگیرید"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    handleVerify(comment._id);
    try {
      await AnswerComment(data.answer, comment._id, true);
      toast.warning(`وضعیت دانشجو به فعال تغییر کرد`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("خطایی رخ داده");
      }
    }
    setShow(!show);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    const pagesCount = Math.ceil(comments.length / pageSize);
    currentPage !== pagesCount &&
      setCurrentPage((currentPage) => currentPage + 1);
  };

  const handlePrev = () => {
    currentPage !== 1 && setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleLead = (value, num) => {
    const trimmedLead =
      value
        .substring(0, num)
        .substring(0, value.substring(0, 200).lastIndexOf(" ")) + "...";
    return trimmedLead;
  };

  const paginateData = paginate(comments, currentPage, pageSize);

  return (
    <>
      <Breadcrumbs
        title="مدیریت کامنت ها"
        data={[{ title: "مدیریت کامنت ها" }]}
      />
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>نام کاربری فرستنده</th>
                <th>متن کامنت</th>
                <th>تاریخ ارسال</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {paginateData.length > 0
                ? paginateData.map((comment) => (
                    <tr key={comment._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div style={{ width: "30px" }}>
                            {comment.answer ? (
                              <CheckCircle className="text-success" size={14} />
                            ) : null}
                          </div>

                          <div>
                            <span className="align-middle fw-bold d-block">
                              {comment.username}
                            </span>
                            <small className="text-muted">
                              {comment.email}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>{handleLead(comment.comment, 50)}</td>
                      <td>{convertDate(comment?.createDate)}</td>

                      <td>
                        {comment.verified ? (
                          <Badge className="px-1" pill color="light-success">
                            تایید
                          </Badge>
                        ) : (
                          <Badge className="px-2" color="light-danger">
                            عدم تایید
                          </Badge>
                        )}
                      </td>
                      <td>
                        <div className="d-inline-block me-1">
                          <Button.Ripple
                            color="success"
                            size="sm"
                            onClick={() => handleVerify(comment._id)}
                            disabled={comment.verified}
                          >
                            <CheckCircle size={16} />
                          </Button.Ripple>
                        </div>
                        <div className="d-inline-block me-1">
                          <Button.Ripple
                            color="primary"
                            size="sm"
                            onClick={() => handleModalActive(comment._id)}
                          >
                            <MessageCircle size={16} />
                          </Button.Ripple>
                        </div>
                      </td>
                    </tr>
                  ))
                : Array(pageSize)
                    .fill()
                    .map((i) => <Skeleton key={i} />)}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
              <Input
                className="mx-50"
                type="select"
                id="rows-per-page"
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                style={{ width: "5rem" }}
              >
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
              </Input>
              <h6>تعداد کل کامنت ها : {comments.length}</h6>
            </div>
            <PaginationIcons
              itemsCount={comments.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        </CardBody>
      </Card>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div className="d-flex align-items-center">
              <Avatar
                className="me-1"
                img={profileImg}
                imgHeight="42"
                imgWidth="42"
              />
              <div>
                <h6 className="mb-0">{comment.username}</h6>
                <small className="text-muted">{date}</small>{" "}
                <small className="text-muted">{time}</small>
              </div>
            </div>
            {comment.verified ? (
              <Badge className="px-1" pill color="light-success">
                تایید
              </Badge>
            ) : (
              <Badge className="px-2" color="light-danger">
                عدم تایید
              </Badge>
            )}
          </div>
          {/* <div className="apply-job-package bg-light-primary rounded py-3 text-center">
            اطلاعات مربوط به پست
          </div> */}
          <h5 className="apply-job-title my-2">{comment?.comment}</h5>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1">
              <Label className="form-label" for="answer">
                جواب کامنت
              </Label>
              <Controller
                name="answer"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="textarea"
                    invalid={errors.answer && true}
                  />
                )}
              />
              {errors.answer && (
                <FormFeedback>{errors.answer.message}</FormFeedback>
              )}
            </div>
            <div className="d-grid">
              <Button color="primary" type="submit">
                ارسال
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CommentList;
