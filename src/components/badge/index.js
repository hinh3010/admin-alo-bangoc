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
import * as badgeAPI from '../../api/badge';
import * as urlConfig from '../../api/urlConfig';
import Loader from '../common/Loader';

const BadgeList = () => {
  const [badgeList, setBadgeList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [totalBadge, setTotalBadge] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  let table = createRef();

  useEffect(() => {
    getBadgeList();
  }, []);
  useEffect(() => {
    getBadgeList();
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
        <DropdownItem onClick={() => history.push(`/badge/update/${_id}`)}>Edit</DropdownItem>
        <DropdownItem onClick={() => deleteBadge(_id)} className="text-danger">
          Delete
        </DropdownItem>
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
      dataField: 'level',
      headerClasses: 'border-0',
      text: 'Level',
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

  const deleteBadge = async (id) => {
    if (window.confirm('Are you sure delete this badge?')) {
      const result = await badgeAPI.remove(id);
      getBadgeList();
    }
  }

  const getBadgeList = async () => {
    const data = await badgeAPI.getList((currentPage - 1) * limit, limit, keyword);
    setTotalBadge(data.total);
    setBadgeList(data.items);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const searchBadge = async (e) => {
    if (e.key === 'Enter') {
      if (keyword) {
        getBadgeList();
        setCurrentPage(1);
      }
    }
  };

  const handleChangeStatus = async (id, status) => {
    const data = {
      id,
      status: !status,
    };
    if (window.confirm('Are you sure change status?')) {
      const result = await badgeAPI.changeStatus(data);
      getBadgeList();
    }
  };

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Badge list" light={false}>
        <Fragment>
          <Row>
            <ButtonIcon
              className="mr-1"
              onClick={() => history.push('/badge/create')}
              icon="plus"
              transform="shrink-3 down-2"
              color="falcon-default"
              size="sm"
            >
              New
            </ButtonIcon>
            <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">
              Export
            </ButtonIcon>
          </Row>
        </Fragment>
      </FalconCardHeader>
      <CardBody className="p-2">
        {loading ? (
          <Loader />
        ) : (
          <>
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
                    data={badgeList}
                    columns={columns}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Paginations
                  className="mt-2"
                  totalRecords={totalBadge}
                  pageLimit={limit}
                  pageNeighbours={1}
                  onPageChanged={setCurrentPage}
                />
              </Col>
            </Row>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default BadgeList;
