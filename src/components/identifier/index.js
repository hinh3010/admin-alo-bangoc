import React, { createRef, Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Col,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroup,
  Media,
  Row,
  UncontrolledDropdown,
  Badge,
} from 'reactstrap';
import LightBoxGallery from '../common/LightBoxGallery';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Flex from '../common/Flex';
import Avatar from '../common/Avatar';
import { getPaginationArray } from '../../helpers/utils';
import * as userApi from '../../api/users';
import * as urlConfig from '../../api/urlConfig'
import Paginations from '../common/Paginations';
import { GET_FILE } from '../../api/urlConfig'
import Loader from '../common/Loader';

import moment from 'moment';




const Identifier = () => {

  // const enum STARUS_IDENTIFIER {
  //   ACTIVED = "ACTIVED",
  //   REJECT = "REJECT",
  //   PENDING="PENDING"
  // }

  const nameFormatter = (dataField, { id, name, image }) => {
    return (
      <Link to={`/games/detail/${id}`}>
        <Media tag={Flex} align="center">
          <Avatar src={image} />
          <Media body className="ml-2">
            <h5 className="mb-0 fs--1">{name}</h5>
          </Media>
        </Media>
      </Link>
    );
  };

  const dateFormatter = date => <span>{moment(date).format('DD/MM/YYYY HH:mm')}</span>;
  const avatarFormatter = (dataField, avatar) => {
    if (dataField) {
      return <Avatar src={`${urlConfig.GET_FILE_IMAGE}?width=45&height=45&image_id=${dataField}&fit=contain`} />;
    }
    return <Avatar />;
  };

  const actionFormatter = (dataField, { _id }) => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => handleIdentifier(_id, 'ACTIVED')}>Xác minh</DropdownItem>
        <DropdownItem onClick={() => handleIdentifier(_id, 'REJECT')} className="text-danger">
          Làm lại
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
  const lightboxFormatter = (cellContent, row) => {
    console.log(`status`, { cellContent, row })
    let images = []
    images.push(`${GET_FILE}${row.cccd_font}`, `${GET_FILE}${row.cccd_back}`)
    console.log(`images`, images)
    return (
      <LightBoxGallery images={images}>
        {openImgIndex => (
          <Row noGutters className="m-n1">
            {images.map((src, index) => (
              <Col xs={6} className="p-1" key={index}>
                <img
                  className="rounded w-100 cursor-pointer"
                  src={images[index]}
                  alt=""
                  onClick={() => {
                    openImgIndex(index);
                  }}
                />
              </Col>
            ))}
          </Row>
        )}
      </LightBoxGallery>
    );
  };

  const expandRow = {
    renderer: row => {
      let images = []
      images.push(`${GET_FILE}/${row.cccd_font}`, `${GET_FILE}/${row.cccd_back}`)
      console.log(`images`, images)
      return (
        <LightBoxGallery images={images}>
          {openImgIndex => (
            <Row noGutters className="m-n1">
              {images.map((src, index) => (
                <Col xs={6} className="p-1" key={index}>
                  <img
                    className="rounded w-100 cursor-pointer"
                    src={images[index]}
                    alt=""
                    onClick={() => {
                      openImgIndex(index);
                    }}
                  />
                </Col>
              ))}
            </Row>
          )}
        </LightBoxGallery>
      )
    },
    showExpandColumn: true,
    expandColumnPosition: 'left'
  };

  const columns = [
    {
      dataField: 'user.avatar',
      headerClasses: 'border-0',
      text: 'Avatar',
      classes: 'border-0 py-2 align-middle',
      formatter: avatarFormatter,
      sort: true
    },

    {
      dataField: 'full_name',
      headerClasses: 'border-0',
      text: 'Tên',
      classes: 'border-0 py-2 align-middle',
      // formatter: dateFormatter,
      sort: true
    },
    {
      dataField: 'user.email',
      headerClasses: 'border-0',
      text: 'Email',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'nationality',
      headerClasses: 'border-0',
      text: 'Quốc tịch',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'papers',
      headerClasses: 'border-0',
      text: 'Loại giấy',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'cccd',
      headerClasses: 'border-0',
      text: 'Số thẻ căn cước',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'created_at',
      headerClasses: 'border-0',
      text: 'Ngày gửi',
      classes: 'border-0 py-2 align-middle',
      formatter: dateFormatter,
      sort: true
    },
    {
      dataField: '',
      headerClasses: 'border-0',
      text: '',
      classes: 'border-0 py-2 align-middle',
      formatter: actionFormatter,
      align: 'right'
    }
  ];

  const SelectRowInput = ({ indeterminate, rowIndex, ...rest }) => (
    <div className="custom-control custom-checkbox">
      <input
        className="custom-control-input"
        {...rest}
        onChange={() => { }}
        ref={input => {
          if (input) input.indeterminate = indeterminate;
        }}
      />
      <label className="custom-control-label" />
    </div>
  );

  const selectRow = onSelect => ({
    mode: 'checkbox',
    columnClasses: 'py-2 align-middle',
    clickToSelect: false,
    selectionHeaderRenderer: ({ mode, ...rest }) => <SelectRowInput type="checkbox" {...rest} />,
    selectionRenderer: ({ mode, ...rest }) => <SelectRowInput type={mode} {...rest} />,
    headerColumnStyle: { border: 0, verticalAlign: 'middle' },
    selectColumnStyle: { border: 0, verticalAlign: 'middle' },
    onSelect: onSelect,
    onSelectAll: onSelect
  });

  let table = createRef();
  // State
  const [isSelected, setIsSelected] = useState(false);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState({
    custom: true,
    sizePerPage: 1000,
    totalSize: 0
  });
  const [totalPost, setTotalPost] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  useEffect(() => {
    getIdentifier();
  }, []);

  useEffect(() => {
    getIdentifier();
  }, [currentPage]);

  useEffect(() => {
    setOptions({
      custom: true,
      sizePerPage: 20,
      totalSize: list.length
    })
  }, [list]);

  const getIdentifier = async () => {
    const data = await userApi.getIdentifier();
    console.log(`data`, data)
    // setTotalPost(data.total);
    setList(data);
    setLoading(false);
  };

  const handleIdentifier = async (id, status) => {
    console.log(`object`, { id, status })
    const data = await userApi.handleIdentifier({ id, status });
    // setTotalPost(data.total);
    if (status === 'ACTIVED') {
      toast.success('Xác minh thành công')
    }
    else {
      toast.success('Yêu cầu xác minh lại')
    }
    await getIdentifier()
  };

  const handleNextPage = ({ page, onPageChange }) => () => {
    onPageChange(page + 1);
  };

  const handlePrevPage = ({ page, onPageChange }) => () => {
    onPageChange(page - 1);
  };

  const onSelect = () => {
    setImmediate(() => {
      setIsSelected(!!table.current.selectionContext.selected.length);
    });
  };


  return (
    <Card className="mb-3">
      <FalconCardHeader title="Danh sách người dùng yêu cầu xác minh" light={false}>
        {isSelected ? (
          <InputGroup size="sm" className="input-group input-group-sm">
            <CustomInput type="select" id="bulk-select">
              <option>Bulk actions</option>
              <option value="Delete">Delete</option>
              <option value="Archive">Archive</option>
            </CustomInput>
            <Button color="falcon-default" size="sm" className="ml-2">
              Apply
            </Button>
          </InputGroup>
        ) : (
          <Fragment>
            {/* <ButtonIcon onClick={()=> history.push("/policy/create")} icon="plus" transform="shrink-3 down-2" color="falcon-default" size="sm">
              New
            </ButtonIcon> */}
            {/* <ButtonIcon icon="filter" transform="shrink-3 down-2" color="falcon-default" size="sm" className="mx-2">
              Filter
            </ButtonIcon>
            <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">
              Export
            </ButtonIcon> */}
          </Fragment>
        )}
      </FalconCardHeader>
      <CardBody className="p-0">
        {false ? (
          <Loader />
        ) :

          <Row>
            <Col sm="12">
              <div className="table-responsive">
                <BootstrapTable
                  ref={table}
                  bootstrap4
                  keyField="_id"
                  data={list}
                  columns={columns}
                  expandRow={expandRow}
                  bordered={false}
                  classes="table-dashboard table-striped table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap"
                  rowClasses="btn-reveal-trigger border-top border-200"
                  headerClasses="bg-200 text-900 border-y border-200"
                  pagination={paginationFactory({ sizePerPage: 10 })}
                />
              </div>
            </Col>
          </Row>}



      </CardBody>
    </Card>
  );
};

export default Identifier;
