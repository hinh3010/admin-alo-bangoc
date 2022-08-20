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
  UncontrolledDropdown
} from 'reactstrap';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Flex from '../common/Flex';
import Avatar from '../common/Avatar';
import ModalProvine from './ModalProvine'
import { getPaginationArray } from '../../helpers/utils';
// import * as gamesAPI from '../../api/games';
import * as systemAPI from '../../api/system';
import Loader from '../common/Loader';
import * as urlConfig from '../../api/urlConfig';
import moment from 'moment';



const Province = () => {

  const actionFormatter = (cell, row) => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => editProvince(row)}>Edit</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const HandeleFormatter = (dataField, { id }) => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => history.push(`/games/update/${id}`)}>Edit</DropdownItem>
        <DropdownItem onClick={() => console.log(id)} className="text-danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const imageFormatter = (image) => {
    if (image)
      return <Avatar src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + image} />;
    return <> </>
  };

  const linkFormatter = (pageId) => {
    if (pageId) {
      return <a target="_blank" href={`https://vdiarybook.vn/profile?id=${pageId}`}>Link</a>
    }
    return <p style={{ color: '#2c7be5', cursor: 'pointer', marginTop: '15px' }} onClick={() => {
      toast(
        <Fragment>
          <p className="mb-0">This province does not have a page yet !</p>
        </Fragment>
      );
    }} >Link</p>
  };

  const columns = [
    {
      dataField: 'province_icon',
      text: 'Biểu tượng',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      formatter: imageFormatter,
      sort: true
    },
    {
      dataField: 'name',
      text: 'Tên tỉnh',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      // formatter: nameFormatter,
      sort: true
    },
    {
      dataField: 'pageId',
      text: 'Page link',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      formatter: linkFormatter,
      sort: true
    },
    {
      dataField: 'type',
      text: 'Đơn vị hành chính',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
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
  const [loading, setloading] = useState(true)
  const [isSelected, setIsSelected] = useState(false);
  const [list, setList] = useState([]);
  const [dataModal, setDataModal] = useState({});
  const [modal, setModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [type, setType] = useState(0);
  const [options, setOptions] = useState({
    custom: true,
    sizePerPage: 10,
    totalSize: 0
  });
  const history = useHistory();
  const [isAssigned, setIsAssigned] = useState();


  useEffect(() => {
    getListProvince();
  }, [reload]);

  const reloadCallback = () => {
    setReload(!reload)
  }

  useEffect(() => {
    setOptions({
      custom: true,
      sizePerPage: 100,
      totalSize: list.length
    });
  }, [list]);

  const getListProvince = async () => {
    setloading(true)
    const data = await systemAPI.getListProvince(isAssigned);
    console.log(`data`, data);
    setList(data);
    setloading(false)
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

  const editProvince = (data) => {
    console.log(`data`, data)
    setDataModal(data)
    setModal(true)
  };

  const actionFilter = (value) => {
    setIsAssigned(value);
    reloadCallback();
  }

  return (
    false ? <Loader /> :
      <Card className="mb-3">
        <FalconCardHeader title="Danh sách tỉnh/ thành phố" light={false}>
          {isSelected ? (
            <InputGroup size="sm" className="input-group input-group-sm">
              {/* <CustomInput type="select" id="bulk-select">
              <option>Bulk actions</option>
              <option value="Delete">Delete</option>
              <option value="Archive">Archive</option>
            </CustomInput>
            <Button color="falcon-default" size="sm" className="ml-2">
              Apply
            </Button> */}
            </InputGroup>
          ) : (
            <Fragment>
              <UncontrolledDropdown>
                <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3" caret>
                  {/* <FontAwesomeIcon icon="ellipsis-h" className="fs--1" /> */}
                  {isAssigned === '0' ? 'Chưa config' : (isAssigned === '1' ? 'Đã config' : 'Tất cả')}
                </DropdownToggle>
                <DropdownMenu right className="border py-2">
                  <DropdownItem onClick={() => actionFilter('')}>Tất cả</DropdownItem>
                  <DropdownItem onClick={() => actionFilter('0')}>Chưa config</DropdownItem>
                  <DropdownItem onClick={() => actionFilter('1')}>Đã config</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Fragment>
          )}
        </FalconCardHeader>
        <CardBody className="p-0">
          <Row>
            <Col sm="12">
              <div className="table-responsive">
                <BootstrapTable
                  ref={table}
                  bootstrap4
                  keyField="_id"
                  data={list}
                  columns={columns}
                  selectRow={selectRow(onSelect)}
                  bordered={false}
                  classes="table-dashboard table-striped table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap"
                  rowClasses="btn-reveal-trigger border-top border-200"
                  headerClasses="bg-200 text-900 border-y border-200"
                  pagination={paginationFactory({ sizePerPage: 10 })}
                />
              </div>
            </Col>
          </Row>
          <ModalProvine modal={modal} reload={reloadCallback} setModal={setModal} modalContent={dataModal} />
        </CardBody>
      </Card>
  );
};

export default Province;
