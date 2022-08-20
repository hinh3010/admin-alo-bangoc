import React, { createRef, Fragment, useEffect, useState } from 'react';
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
} from 'reactstrap';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paginations from '../common/Paginations';
import Avatar from '../common/Avatar';
import * as backgroundPostAPI from '../../api/backgroundPost';
import * as urlConfig from '../../api/urlConfig';
import Loader from '../common/Loader';

const BackgroundPosts = () => {
  const [backgroundPostList, setBackgroundPostList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [totalBackgroundPost, setTotalBackgroundPost] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  let table = createRef();

  useEffect(() => {
    getBackgroundPostList();
  }, []);
  useEffect(() => {
    getBackgroundPostList();
  }, [currentPage]);

  const statusFormatter = (dataField, { _id, status }) => {
    return (
      <Badge onClick={() => handleChangeStatus(_id, status)} className="btn" color={status ? 'success' : 'secondary'}>
        {status ? 'Active' : 'Disable'}
      </Badge>
    );
  };
  const imageFormatter = (image) => {
    return <Avatar src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + image} />;
  };

  const actionFormatter = (dataField, { _id }) => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => history.push(`/background-post/update/${_id}`)}>Edit</DropdownItem>
        <DropdownItem onClick={() => deleteBackgroundPost(_id)} className="text-danger">
          Delete
        </DropdownItem>
        <DropdownItem onClick={() => handleChangeStatus(_id, false)}>Active</DropdownItem>
        <DropdownItem onClick={() => handleChangeStatus(_id, true)}>Disable</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const columns = [
    {
      dataField: 'image',
      headerClasses: 'border-0',
      text: 'Image',
      classes: 'border-0 py-2 align-middle',
      formatter: imageFormatter,
    },
    {
      dataField: 'name',
      text: 'Name',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      sort: true,
    },
    {
      dataField: 'key',
      headerClasses: 'border-0',
      text: 'Key',
      classes: 'border-0 py-2 align-middle',
      sort: true,
    },
    {
      dataField: 'status',
      headerClasses: 'border-0',
      text: 'Status',
      classes: 'border-0 py-2 align-middle',
      formatter: statusFormatter,
      sort: true,
    },
    {
      dataField: '',
      headerClasses: 'border-0',
      text: '',
      classes: 'border-0 py-2 align-middle',
      formatter: actionFormatter,
      align: 'right',
    },
  ];

  const deleteBackgroundPost = async (id) => {
    if (window.confirm('Are you sure delete this background post?')) {
      const result = await backgroundPostAPI.remove(id);
      getBackgroundPostList();
    }
  };

  const getBackgroundPostList = async () => {
    setLoading(true);
    const data = await backgroundPostAPI.getList((currentPage - 1) * limit, limit);
    setTotalBackgroundPost(data.total);
    setBackgroundPostList(data.items);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleChangeStatus = async (id, status) => {
    const data = {
      id,
      status: !status,
    };
    if (window.confirm('Are you sure change status?')) {
      const result = await backgroundPostAPI.changeStatus(data);
      getBackgroundPostList();
    }
  };

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Background Post List" light={false}>
        <Fragment>
          <Row>
            <ButtonIcon
              className="mr-1"
              onClick={() => history.push('/background-post/create')}
              icon="plus"
              transform="shrink-3 down-2"
              color="falcon-default"
              size="sm"
            >
              New
            </ButtonIcon>
          </Row>
        </Fragment>
      </FalconCardHeader>
      <CardBody className="p-2">
        {false ? (
          <Loader />
        ) : (
          <Row>
            <Col sm="12">
              <div className="table-responsive">
                <BootstrapTable
                  ref={table}
                  classes="table-dashboard table-striped table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap"
                  headerClasses="bg-200 text-900 border-y border-200"
                  rowClasses="btn-reveal-trigger border-top border-200"
                  bootstrap4
                  keyField="_id"
                  data={backgroundPostList}
                  columns={columns}
                />
              </div>
            </Col>
          </Row>
        )}

        <Row>
          <Col sm="12">
            <Paginations
              className="mt-2"
              totalRecords={totalBackgroundPost}
              pageLimit={limit}
              pageNeighbours={1}
              onPageChanged={setCurrentPage}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default BackgroundPosts;
