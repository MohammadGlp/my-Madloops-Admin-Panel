import AvatarGroup from '@components/avatar-group';
import react from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import vuejs from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import angular from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import bootstrap from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import avatar1 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import avatar2 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import avatar3 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { MoreVertical, Edit, Trash } from 'react-feather';
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
} from 'reactstrap';

const avatarGroupData1 = [
  {
    title: 'Lilian',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: 'Alberto',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: 'Bruce',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26,
  },
];

const avatarGroupData2 = [
  {
    title: 'Diana',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: 'Rey',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: 'James',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26,
  },
];

const avatarGroupData3 = [
  {
    title: 'Lee',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: 'Mario',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: 'Oswald',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26,
  },
];

const avatarGroupData4 = [
  {
    title: 'Christie',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: 'Barnes',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: 'Arthur',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26,
  },
];

const TableBasic = ({ data }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>نام درس</th>
          <th>مدرس</th>
          <th>ظرفیت</th>
          <th>دانشجویان</th>
          <th>قیمت </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((course) => (
          <tr>
            <td>
              <img
                className="me-75"
                src={angular}
                alt="angular"
                height="20"
                width="20"
              />
              <span className="align-middle fw-bold">
                Angular Project
              </span>
            </td>
            <td>Peter Charles</td>
            <td>8</td>
            <td>
              <AvatarGroup data={avatarGroupData1} />
            </td>
            <td>
              <Badge pill color="light-primary" className="me-1">
                Active
              </Badge>
            </td>
            <td>
              <div className="d-inline-block me-1 mb-1">
                <Button.Ripple color="primary" size="sm">
                  ویرایش
                </Button.Ripple>
              </div>
              <div className="d-inline-block me-1 mb-1">
                <Button.Ripple color="danger" size="sm">
                  حذف
                </Button.Ripple>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableBasic;
