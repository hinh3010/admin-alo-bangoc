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
import Flex from '../common/Flex';
import Avatar from '../common/Avatar';
import { getPaginationArray } from '../../helpers/utils';
import * as postAPI from '../../api/post';
import Paginations from '../common/Paginations';

import moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core' //allows later to just use icon name to render-them
import { faLock, faTrash, faLockOpen, faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faLock, faTrash, faLockOpen, faFileExport, faPlus);

const Posts = () => {
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
  const imageFormatter = (dataField, { backgroud, id }) => {
    return (
      <Link to={`/games/detail/${id}`}>
        <Avatar src={backgroud} />
      </Link>
    )
  };

  const actionFormatter = (value, row) => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        {/* <DropdownItem onClick={() => history.push(`/games/update/${id}`)}>Edit</DropdownItem> */}
        {
          row.is_active ? (
            <>
              <DropdownItem onClick={() => console.log(row)}>
                Ẩn
              </DropdownItem>
              <DropdownItem onClick={() => console.log(row)} >
                Chặn user
              </DropdownItem>
            </>

          ) : (
            <>
              <DropdownItem onClick={() => console.log(row)}>
                Hiện
              </DropdownItem>
              <DropdownItem onClick={() => console.log(row)}>
                Bỏ chặn user
              </DropdownItem>
            </>

          )
        }
        <DropdownItem onClick={() => console.log(row)} className="text-danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const columns = [
    {
      dataField: 'title',
      headerClasses: 'border-0',
      text: 'Tiêu đề',
      classes: 'border-0 py-2 align-middle',
      // formatter: imageFormatter,
      sort: true
    },
    // {
    //   dataField: 'content',
    //   text: 'Nội dung',
    //   headerClasses: 'border-0',
    //   classes: 'border-0 py-2 align-middle',
    //   // formatter: nameFormatter,
    //   sort: true
    // },
    {
      dataField: 'name',
      headerClasses: 'border-0',
      text: 'Người tạo',
      classes: 'border-0 py-2 align-middle',
      // formatter: dateFormatter,
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
      dataField: 'status',
      headerClasses: 'border-0',
      text: 'Trạng thái',
      classes: 'border-0 py-2 align-middle',
      formatter: (cellContent, row) => {
        if (row.is_active) {
          return `Kích hoạt`;
        }
        return `Block`;
      },
      sort: true
    },
    {
      dataField: '',
      headerClasses: 'border-0',
      text: '',
      classes: 'border-0 py-2 align-middle',
      formatter: (value, row) => actionFormatter(value, row),
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
  const [gameList, setPostList] = useState([]);
  const [options, setOptions] = useState({
    custom: true,
    sizePerPage: 10,
    totalSize: 0
  });
  const [totalPost, setTotalPost] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  useEffect(() => {
    getListPost();
  }, []);

  useEffect(() => {
    getListPost();
  }, [currentPage]);

  useEffect(() => {
    setOptions({
      custom: true,
      sizePerPage: 20,
      totalSize: gameList.length
    })
  }, [gameList]);

  const getListPost = async () => {
    const data = await postAPI.getListPost((currentPage - 1) * limit, limit);
    console.log(`data`, data)
    setPostList(data.items);
    setTotalPost(data.total);
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
  const expandRow = {
    renderer: row => (
      <div>
        <h6>{`Nội dung bài viết`}</h6>
        <p>{row?.content} </p>
      </div>
    ),
    showExpandColumn: true,
    expandColumnPosition: 'left'
  };

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Danh sách tất cả bài viết" light={false}>
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
          <ButtonIcon onClick={() => history.push("/games/create")} icon="plus" transform="shrink-3 down-2" color="falcon-default" size="sm" className="mx-2">
            New
          </ButtonIcon>
          <ButtonIcon icon={faLock} transform="shrink-3 down-2" color="falcon-default" size="sm" className="mx-2">
            Khóa
          </ButtonIcon>
          <ButtonIcon icon={faTrash} transform="shrink-3 down-2" color="falcon-default" size="sm" className="mx-2">
            Xóa
          </ButtonIcon>
          <ButtonIcon icon={faLockOpen} transform="shrink-3 down-2" color="falcon-default" size="sm" className="mx-2">
            Public
          </ButtonIcon>
          <ButtonIcon icon={faFileExport} transform="shrink-3 down-2" color="falcon-default" size="sm" className="mx-2" >
            Export
          </ButtonIcon>


        </Fragment>
        {/* )} */}
      </FalconCardHeader>
      <CardBody className="p-0">
        <PaginationProvider pagination={paginationFactory(options)}>
          {({ paginationProps, paginationTableProps }) => {
            const lastIndex = paginationProps.page * paginationProps.sizePerPage;
            return (
              <Fragment>
                <div className="table-responsive">
                  <BootstrapTable
                    ref={table}
                    bootstrap4
                    keyField="_id"
                    data={gameList}
                    columns={columns}
                    expandRow={expandRow}
                    selectRow={selectRow(onSelect)}
                    bordered={false}
                    classes="table-dashboard table-striped table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap"
                    rowClasses="btn-reveal-trigger border-top border-200"
                    headerClasses="bg-200 text-900 border-y border-200"
                    {...paginationTableProps}
                  />
                </div>
                <Row noGutters className="px-1 py-3 flex-center">
                  <Col xs="auto">
                    <Paginations totalRecords={totalPost} pageLimit={limit} pageNeighbours={1} onPageChanged={setCurrentPage} />
                  </Col>
                </Row>
              </Fragment>
            );
          }}
        </PaginationProvider>
      </CardBody>
    </Card>
  );
};

export default Posts;
