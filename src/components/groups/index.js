import React, { createRef, Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Col,
  CustomInput,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
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
import Flex from '../common/Flex';
import Avatar from '../common/Avatar';
import { getPaginationArray } from '../../helpers/utils';
// import * as gamesAPI from '../../api/games';
import * as groupsAPI from '../../api/groups';
import moment from 'moment';
import Loader from '../common/Loader';
import ModalDetail from './ModalDetail';
import "./style.scss";

const Groups = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const [filterValue, setFilterValue] = useState();
  const [showFilter, setShowFilter] = useState(false);

  const hanldeGroup = async (groupId, status) => {
    const resp = await groupsAPI.handelGroup({ groupId, status });
    if (resp) {
      alert('sucsess')
    }
  };


  const nameFormatter = (cellContent, row) => {
    console.log(`dataField`, row);

    return `${row.user.first_name} ${row.user.last_name}`;
  };

  const dateFormatter = date => <span>{moment(date).format('DD/MM/YYYY HH:mm')}</span>;
  const imageFormatter = (dataField, { backgroud, id }) => {
    return (
      <Link to={`/games/detail/${id}`}>
        <Avatar src={backgroud} />
      </Link>
    );
  };

  const actionFormatter = (dataField, { _id }) => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => hanldeGroup(_id, 'BLOCK')}>Khoá</DropdownItem>
        {/* <DropdownItem onClick={() => console.log(id)} className="text-danger">
          Delete
        </DropdownItem> */}
        <DropdownItem onClick={() => hanldeGroup(_id, 'BLOCK')} >
          Xoá
        </DropdownItem>
        {/* <DropdownItem onClick={() => console.log(id)} className="text-danger">
          Delete
        </DropdownItem> */}
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

  const columns = [

    {
      dataField: 'name',
      text: 'Tên nhóm',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      // formatter: nameFormatter,
      sort: true
    },
    {
      dataField: 'description',
      headerClasses: 'border-0',
      text: 'Mô tả',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'creator',
      headerClasses: 'border-0',
      text: 'Người tạo',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'created_at',
      headerClasses: 'border-0',
      text: 'Ngày tạo',
      classes: 'border-0 py-2 align-middle',
      formatter: dateFormatter,
      sort: true
    },
    {
      dataField: 'totalUser',
      headerClasses: 'border-0',
      text: 'Số lượng User',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'totalPost',
      headerClasses: 'border-0',
      text: 'Số lượng post',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'nearest',
      headerClasses: 'border-0',
      text: 'Hành động mới',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'status',
      headerClasses: 'border-0',
      text: 'Trạng thái',
      classes: 'border-0 py-2 align-middle',
      formatter: (cellContent, row) => {
        console.log(`cellContent`, cellContent);
        if (row.status) {
          return `Kích hoạt`;
        }
        return `Chờ`;
      },
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
    onSelectAll: onSelect,
  });

  let table = createRef();
  // State
  const [isSelected, setIsSelected] = useState(false);
  const [list, setList] = useState([]);
  const [options, setOptions] = useState({
    custom: true,
    sizePerPage: 20,
    totalSize: 0
  });
  const history = useHistory();

  useEffect(() => {
    getGroupsList();
  }, []);

  useEffect(() => {
    setOptions({
      custom: true,
      sizePerPage: 10,
      totalSize: list.length
    });
  }, [list]);

  const getGroupsList = async () => {
    const data = await groupsAPI.getListGroup();
    setList(data);
    setLoading(false);
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

  const filter = () => {
    console.log('eee')
  }

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setCurrentRow(row)
      setShowModal(true)
    }
  };

  const toggle = () => {
    setShowFilter(!showFilter)
  }

  const changeFilter = (value) => {
    setFilterValue(value);
  }

  return (
    <>
      <Card className="mb-3">
        <FalconCardHeader title="Danh sách nhóm" light={false}>
          {/* {isSelected ? (
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
          ) : ( */}
          <Fragment>
            <div className="filter-custom">
              <Dropdown isOpen={showFilter} toggle={toggle}>
                <DropdownToggle caret>
                  {filterValue ? filterValue : "Filter"}
                </DropdownToggle>

                <DropdownMenu >
                  <DropdownItem onClick={() => changeFilter("Keyword")}>
                    Keyword
                  </DropdownItem>
                  <DropdownItem onClick={() => changeFilter("Trạng thái")}>
                    Trạng thái
                  </DropdownItem>
                  <DropdownItem onClick={() => changeFilter("Ngày tháng")}>
                    Ngày tháng
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">
                Export
              </ButtonIcon>
            </div>
          </Fragment>
          {/* )} */}
        </FalconCardHeader>
        <CardBody className="p-0">
          {false ? (
            <Loader />
          ) : <Row>
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
                  rowEvents={rowEvents}
                />
              </div>
            </Col>
          </Row>}

        </CardBody>
      </Card>

      {
        showModal && (
          <ModalDetail currentRow={currentRow} showModal={showModal} setShowModal={setShowModal} />
        )
      }

    </>

  );
};

export default Groups;
