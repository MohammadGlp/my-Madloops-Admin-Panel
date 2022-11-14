import { useEffect, useState } from 'react';
import { Edit, Search, Trash, UserCheck, UserX } from 'react-feather';
import {
  Table,
  Button,
  Badge,
  Card,
  CardBody,
  CardHeader,
  InputGroup,
  InputGroupText,
  Input,
} from 'reactstrap';
import toast from 'react-hot-toast';
import { DeactiveEmployee } from '../../services/api/deactiveEmployee';
import { ActiveEmployee } from '../../services/api/ActiveEmployee';
import { GetAllEmployees } from './../../services/api/GetAllEmployees.api';
import { DeleteEmployee } from '../../services/api/DeleteEmployee.api';
import AdminEdit from './EmployeeEdit';
import { GetEmployeeById } from './../../services/api/GetEmployeeById.api';
import { getToken } from '../../services/AuthServices/AuthServices';
import { DecodeToken } from '../../utility/DecodeToken';
import Breadcrumbs from '@components/breadcrumbs';
import { paginate } from '../../utility/paginate';
import PaginationIcons from '../pagination';

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshAdminData, setRefreshAdminData] = useState(false);
  const userToken = getToken();
  const id = DecodeToken(userToken);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const getAdminById = async () => {
      const result = await GetEmployeeById(id._id);
      setUserData(result?.result);
    };
    getAdminById();
  }, []);

  useEffect(() => {
    const getAll = async () => {
      try {
        const employees = await GetAllEmployees();
        setEmployees(
          employees?.result.filter(
            (employee) => employee.role === 'admin'
          )
        );
      } catch (error) {}
    };
    getAll();
  }, [refreshAdminData]);

  const handleDelete = async (employeeId, employeeName) => {
    const res = await DeleteEmployee(employeeId, employeeName);
    if (res.success === true) {
      setStudents((old) => {
        let newData = [...old];
        let newAdminData = newData;
        newAdminData = newAdminData.filter(
          (item) => item._id !== employeeId
        );
        newData = newAdminData;
        return newData;
      });
      toast.success(`ادمین با موفقیت حذف شد`);
    } else {
      toast.error('خطایی رخ داده لطفا مجددا امتحان فرمایید');
    }
  };

  const handleActive = async (employeeId) => {
    try {
      await ActiveEmployee(employeeId);
      toast.success(`وضعیت ادمین به فعال تغییر کرد`);
      setRefreshAdminData((old) => !old);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('خطایی رخ داده');
      }
    }
  };

  const handleDeactive = async (employeeId) => {
    try {
      await DeactiveEmployee(employeeId);
      toast.success(`وضعیت ادمین به غیرفعال تغییر کرد`);
      setRefreshAdminData((old) => !old);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('خطایی رخ داده');
      }
    }
  };
  const [adminId, setAdminId] = useState();
  const [editAdminOpen, setEditAdminOpen] = useState(false);
  const toggleEditSidebar = () => setEditAdminOpen(!editAdminOpen);

  const handleEdit = (teacherId) => {
    toggleEditSidebar();
    setAdminId(teacherId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    const pagesCount = Math.ceil(employees.length / pageSize);
    currentPage !== pagesCount &&
      setCurrentPage((currentPage) => currentPage + 1);
  };

  const handlePrev = () => {
    currentPage !== 1 &&
      setCurrentPage((currentPage) => currentPage - 1);
  };

  const paginateData = paginate(employees, currentPage, pageSize);

  return employees ? (
    <>
      <Breadcrumbs
        title="مدیریت کارمندان"
        data={[{ title: 'مدیریت کارمندان' }]}
      />
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <div>
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
              <Input placeholder="search..." />
            </InputGroup>
          </div>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>نام دانشجو</th>
                <th>کد ملی</th>
                <th>شماره تماس</th>
                <th>تاریخ تولد</th>
                <th>وضعیت</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginateData
                .filter((em) => em.fullName !== userData?.fullName)
                .map((course) => (
                  <tr key={course._id}>
                    <td>
                      <img
                        className="me-75 rounded-circle"
                        src={course.profile}
                        alt="angular"
                        height="40"
                        width="40"
                      />
                      <span className="align-middle fw-bold">
                        {course.fullName}
                      </span>
                    </td>
                    <td>{course.nationalId}</td>
                    <td>{course.phoneNumber}</td>
                    <td>{course.birthDate}</td>
                    <td>
                      {course.isActive ? (
                        <Badge
                          className="px-1"
                          pill
                          color="light-success"
                        >
                          فعال
                        </Badge>
                      ) : (
                        <Badge className="px-2" color="light-danger">
                          غیرفعال
                        </Badge>
                      )}
                    </td>
                    <td>
                      <div className="d-inline-block me-1">
                        <Button.Ripple
                          color="primary"
                          size="sm"
                          onClick={() => handleEdit(course?._id)}
                        >
                          <Edit size={16} />
                        </Button.Ripple>
                      </div>
                      <div className="d-inline-block me-1">
                        <Button.Ripple color="danger" size="sm">
                          <Trash
                            size={16}
                            onClick={() =>
                              handleDelete(
                                course._id,
                                course.fullName
                              )
                            }
                          />
                        </Button.Ripple>
                      </div>
                      <div className="d-inline-block me-1">
                        {course.isActive === true ? (
                          <Button.Ripple
                            color="danger"
                            size="sm"
                            onClick={() => handleDeactive(course._id)}
                          >
                            <UserX size={16} />
                          </Button.Ripple>
                        ) : (
                          <Button.Ripple
                            color="success"
                            size="sm"
                            onClick={() => handleActive(course._id)}
                          >
                            <UserCheck size={16} />
                          </Button.Ripple>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h6>تعداد آیتم ها : {employees.length}</h6>
            <PaginationIcons
              itemsCount={employees.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        </CardBody>
      </Card>

      <AdminEdit
        open={editAdminOpen}
        toggleSidebar={toggleEditSidebar}
        adminId={adminId}
        setRefreshAdminData={setRefreshAdminData}
      />
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default EmployeesList;
