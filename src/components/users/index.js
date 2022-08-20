import React, { createRef, Fragment, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Badge,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paginations from '../common/Paginations';
import Avatar from '../common/Avatar';
import * as usersAPI from '../../api/users';
import * as urlConfig from '../../api/urlConfig';
import Loader from '../common/Loader';
import { toast } from 'react-toastify';
import DatePicker from 'reactstrap-date-picker';
import moment from 'moment';
import "./customDatePickerWidth.css";
import "./style.scss";
import axios from 'axios';
import { getToken } from '../../services/storages/userStorage'
import { library } from '@fortawesome/fontawesome-svg-core' //allows later to just use icon name to render-them
import { faLock, faTrash, faLockOpen, faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ModalConfirm } from '../common/ModalConfirm/ModalConfirm';
import ModalDetail from './ModalDetail';
import ModalChangePassword from './ModalChangePassword';

library.add(faLock, faTrash, faLockOpen, faFileExport, faPlus);

const InputCustom = ({ handleSubmit, dataField }) => {
  const [input, setinput] = useState()
  const sucsess = () => {
    setinput('')
  }
  return <Input onKeyPress={(e) => handleSubmit(e, dataField, input, sucsess)} onChange={({ target }) => setinput(target.value)} />
}

const Users = () => {
  const token = getToken();
  const [userList, setUserList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [totalUser, setTotalUser] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resetPagination, setResetPagination] = useState(false);
  const [inpuPass, setinpuPass] = useState('')
  const history = useHistory();
  const [timerDate, settimerDate] = useState();
  const [kyc, setKyc] = useState();
  const [typeLogin, setTypeLogin] = useState();
  const [currentRow, setCurrentRow] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModalReset, setShowModalReset] = useState(false);
  const [typeUser, setTypeUser] = useState();
  const [isResetPass, setIsResetPass] = useState(true);

  const ref = useRef(null);

  useEffect(() => {
    getUserList(1);
    // filterUserType();
  }, []);

  useEffect(() => {
    if (resetPagination) {
      setResetPagination(false);
    }
  }, [resetPagination]);

  const nameFormatter = (dataField, { first_name, last_name }) => {
    return <span className="mb-0 fs--1">{first_name + ' ' + last_name}</span>;
  };

  const statusFormatter = (dataField, { _id, status }) => {
    return (
      <Badge
        onClick={() => handleChangeStatus(_id, status)}
        className="btn"
        color={status === 'ACTIVE' ? 'success' : 'secondary'}
      >
        {status}
      </Badge>
    );
  };
  const avatarFormatter = (dataField, avatar) => {
    if (dataField) {
      return <Avatar src={`${urlConfig.GET_FILE_IMAGE}?width=45&height=45&image_id=${dataField}&fit=contain`} />;
    }
    return <Avatar />;
  };

  const hanldeSubmitChangePassuser = async (e, userId, password, setinput) => {
    console.log(`setinput`, setinput)
    if (e.key === 'Enter') {
      console.log(`inpuPass`, userId, password)
      if (window.confirm('Are you sure to change pass password?')) {
        const result = await usersAPI.chanePassForUser({ userId, email: '', password });
        setinput()
        toast(
          <Fragment>
            <hr />
            <p className="mb-0">Change password successfully!</p>
          </Fragment>
        );
      }
    }

  }

  const inputHandle = (dataField) => {
    return (
      <InputCustom
        dataField={dataField}
        handleSubmit={hanldeSubmitChangePassuser}
      />
    );
  };

  const actionFormatter = (dataField, { _id }) => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        {/* <DropdownItem onClick={() => resetPassword(_id)}>Reset Password</DropdownItem> */}
        <DropdownItem onClick={() => handleResetPass(_id, true)}>Reset Password</DropdownItem>
        <DropdownItem onClick={() => handleResetPass(_id, false)}>Change Password</DropdownItem>
        <DropdownItem onClick={() => handleDetail(_id)}>Xem chi tiết</DropdownItem>
        <DropdownItem onClick={() => ModalConfirm("Xác nhận", "Bạn chắc chắn muốn khóa user này?", () => handleOk(_id))}>Khóa</DropdownItem>
        <DropdownItem onClick={() => ModalConfirm("Xác nhận", "Bạn chắc chắn muốn xóa user này?", () => handleOk(_id))}>Xóa</DropdownItem>

      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const handleOk = (_id) => {
    console.log(_id)
  }

  const handleDetail = (id) => {
    const currentUser = userList.find(e => e._id === id);
    setCurrentRow(currentUser);
    setShowModal(true);
  }

  const handleResetPass = (id, check) => {

    if (check) {
      setIsResetPass(true)
    } else {
      setIsResetPass(false)
    }
    const currentUser = userList.find(e => e._id === id);
    setCurrentRow(currentUser);
    setShowModalReset(true);
  }

  const columns = [
    {
      dataField: 'avatar',
      headerClasses: 'border-0',
      text: 'Avatar',
      classes: 'border-0 py-2 align-middle',
      formatter: avatarFormatter,
      sort: true
    },
    {
      dataField: 'name',
      text: 'Name',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      formatter: nameFormatter,
      sort: true
    },
    {
      dataField: 'email',
      headerClasses: 'border-0',
      text: 'Email',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'phone',
      headerClasses: 'border-0',
      text: 'Phone',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'status',
      headerClasses: 'border-0',
      text: 'Status',
      classes: 'border-0 py-2 align-middle',
      formatter: statusFormatter,
      sort: true
    },
    {
      dataField: 'date',
      headerClasses: 'border-0',
      text: 'Ngày đăng ký',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'last-login',
      headerClasses: 'border-0',
      text: 'Last login',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    // {
    //   dataField: '_id',
    //   headerClasses: 'border-0',
    //   text: 'Đổi mật khẩu',
    //   classes: 'border-0 py-2 align-middle',
    //   formatter: inputHandle,
    //   sort: true
    // },
    {
      dataField: '',
      headerClasses: 'border-0',
      text: '',
      classes: 'border-0 py-2 align-middle',
      formatter: actionFormatter,
      align: 'right'
    }
  ];

  const resetPassword = async userId => {
    if (window.confirm('Are you sure to reset password?')) {
      const result = await usersAPI.resetPW({ userId });
      toast(
        <Fragment>
          <h6>Name: {result.first_name + ' ' + result.last_name}</h6>
          <hr />
          <p className="mb-0">Reset password successfully!</p>
        </Fragment>
      );
    }
  };

  const getUserList = async (currentPage) => {
    setLoading(true);
    const resp = await axios({
      method: 'GET',
      params: {
        offset: (currentPage - 1) * limit,
        limit: limit,
        keyword
      },
      url: `${urlConfig.USER_2}/filter`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    console.log(resp);
    setUserList(resp.data.data.data);
    setTotalUser(resp.data.data.total);
    setLoading(false);
  };

  const filterUserWithType = async (currentPage, type) => {
    setLoading(true);
    const resp = await axios({
      method: 'GET',
      params: {
        offset: (currentPage - 1) * limit,
        limit: limit,
        type: type,
        keyword
      },
      url: `${urlConfig.USER_2}/filter`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    console.log(resp);
    setUserList(resp.data.data.data);
    setTotalUser(resp.data.data.total);
    setLoading(false);
  }

  const searchUser = async e => {
    if (e.key === 'Enter') {
      if (currentPage === 1) {
        getUserList(1);
      } else {
        setCurrentPage(1);
        setResetPagination(true);
      }
    }
  };

  const handleChangeStatus = async (userId, status) => {
    const data = {
      userId,
      status: status === 'ACTIVE' ? 'BLOCK' : 'ACTIVE'
    };
    if (window.confirm('Are you sure change status?')) {
      const result = await usersAPI.changeStatus(data);
      getUserList(1);
    }
  };

  const selectRow = {
    mode: 'checkbox',
  };

  return (
    <>
      <Card className="mb-3 tinhnx-card">
        <div></div>
        <FalconCardHeader title={<h4 className="mb-3">User List</h4>} light={false}>
          <Fragment>
            <Row>
              <Input
                onKeyDown={searchUser}
                onChange={({ target }) => setKeyword(target.value)}
                className="mr-3"
                placeholder="Search..."
                style={{
                  flex: 1,
                  borderColor: '#FFF',
                  boxShadow:
                    '0 0 0 1px rgb(43 45 80 / 10%), 0 2px 5px 0 rgb(43 45 80 / 8%), 0 1px 1.5px 0 rgb(0 0 0 / 7%), 0 1px 2px 0 rgb(0 0 0 / 8%)'
                }}
              />

              <UncontrolledDropdown>
                <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3" caret>
                  {/* <FontAwesomeIcon icon="ellipsis-h" className="fs--1" /> */}
                  {kyc ? kyc : 'Chọn loại KYC'}
                </DropdownToggle>
                <DropdownMenu right className="border py-2">
                  <DropdownItem onClick={() => setKyc('Đã KYC')}>Đã KYC</DropdownItem>
                  <DropdownItem onClick={() => setKyc('Chưa KYC')}>Chưa KYC</DropdownItem>
                  <DropdownItem onClick={() => setKyc('Yêu cầu xác thực')}>Yêu cầu xác thực</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown className='min-width'>
                <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3" caret>
                  {/* <FontAwesomeIcon icon="ellipsis-h" className="fs--1" /> */}
                  {typeLogin ? typeLogin : 'Login Type'}
                </DropdownToggle>
                <DropdownMenu right className="border py-2">
                  <DropdownItem onClick={() => setTypeLogin('All')}>All</DropdownItem>
                  <DropdownItem onClick={() => setTypeLogin('Google')}>Google</DropdownItem>
                  <DropdownItem onClick={() => setTypeLogin('Facebook')}>Facebook</DropdownItem>
                  <DropdownItem onClick={() => setTypeLogin('Apple')}>Apple</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown className='min-width'>
                <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3" caret>
                  {/* <FontAwesomeIcon icon="ellipsis-h" className="fs--1" /> */}
                  {typeUser ? typeUser : 'User Type'}
                </DropdownToggle>
                <DropdownMenu right className="border py-2">
                  <DropdownItem onClick={() => {
                    setTypeUser('All');
                    getUserList(1);
                    setResetPagination(true);
                  }}>All</DropdownItem>
                  <DropdownItem onClick={() => {
                    setTypeUser('Personal');
                    filterUserWithType(1, 'USER');
                    setResetPagination(true);
                  }}>Personal</DropdownItem>
                  <DropdownItem onClick={() => {
                    setTypeUser('Business');
                    filterUserWithType(1, 'BUSINESS');
                    setResetPagination(true);
                  }}>Business</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>


              <label className='mr-3'>
                <DatePicker
                  value={(timerDate)}
                  onChange={(timerDate) => settimerDate(timerDate)}
                  dateFormat="DD/MM/YYYY"
                  showClearButton={false}
                  placeholder="Chọn ngày"
                  autoFocus={false}
                  ref={ref}
                />
              </label>
            </Row>



          </Fragment>

        </FalconCardHeader>

        <div className='action-all-table'>
          <Row>
            <Button color="falcon-default" size="sm" className="mr-3"
              onClick={() => history.push('/users/create')}>
              <FontAwesomeIcon
                icon={faPlus}
                className="mr-1 left"
                transform="shrink-3 down-2"
              />
              New
            </Button>
            <Button color="falcon-default" size="sm" className="mr-3">
              <FontAwesomeIcon
                icon={faFileExport}
                className="mr-1 left"
                transform="shrink-3 down-2"
              />
              Export
            </Button>

            <Button color="falcon-default" size="sm" className="mr-3">
              <FontAwesomeIcon
                icon={faLock}
                className="mr-1 left"
                transform="shrink-3 down-2"
              />
              Khóa
            </Button>
            <Button color="falcon-default" size="sm" className="mr-3">
              <FontAwesomeIcon
                icon={faTrash}
                className="mr-1 left"
                transform="shrink-3 down-2"
              />
              Xóa
            </Button>
            <Button color="falcon-default" size="sm">
              <FontAwesomeIcon
                icon={faLockOpen}
                className="mr-1 left"
                transform="shrink-3 down-2"
              />
              Active
            </Button>

          </Row>
        </div>

        <CardBody className="p-3">
          {false ? (
            <Loader />
          ) : (
            <>
              <Row>
                <Col sm="12" />
              </Row>
              <Row>
                <Col sm="12">
                  <BootstrapTable keyField="_id" data={userList} columns={columns}
                    selectRow={selectRow} />
                </Col>
              </Row>
            </>
          )}
          <Row>
            <Col sm="12">
              <Paginations
                totalRecords={totalUser}
                pageLimit={limit}
                pageNeighbours={1}
                onPageChanged={(result) => {
                  if (typeUser && typeUser !== "All") {
                    if (typeUser === "Personal") {
                      filterUserWithType(result, 'USER');
                    }
                    if (typeUser === "Business") {
                      filterUserWithType(result, 'BUSINESS');
                    }
                  }
                  else {
                    getUserList(result);
                  }
                  // setCurrentPage(result);
                }}
                reset={resetPagination}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      {
        showModal && (
          <ModalDetail currentRow={currentRow} showModal={showModal} setShowModal={setShowModal} />
        )
      }

      {
        showModalReset && (
          <ModalChangePassword currentRow={currentRow} showModal={showModalReset} setShowModal={setShowModalReset} isResetPass={isResetPass} />
        )
      }

    </>
  );
};

export default Users;
