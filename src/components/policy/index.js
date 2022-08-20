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
  Badge
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
import * as systemApi from '../../api/system';
import Paginations from '../common/Paginations';

import moment from 'moment';

const Policy = () => {
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
  
  const actionFormatter = (dataField, { _id }) => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={()=> history.push(`/policy/update/${_id}`)}>Edit</DropdownItem>
        <DropdownItem onClick={()=> console.log(_id)} className="text-danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
  const statusFormatter = (dataField, { _id, status }) => {
    console.log(`status`, status)
    return (
      <Badge
        onClick={() => changeStatusPolicy(_id, !status)}
        className="btn"
        color={status ? 'success' : 'secondary'}
      >
       {status ? 'actived' : 'no actived'}
      </Badge>
    );
  };
  
  const columns = [
    {
      dataField: 'user.username',
      headerClasses: 'border-0',
      text: 'Người tạo',
      classes: 'border-0 py-2 align-middle',
      // formatter: imageFormatter,
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
      dataField: '',
      headerClasses: 'border-0',
      text: 'Trạng thái',
      classes: 'border-0 py-2 align-middle',
      // formatter:(cellContent, row) => {
      //   console.log(`cellContent`, cellContent);
      //   if (row.is_active) {
      //     return `Kích hoạt`;
      //   }
      //   return `Block`;
      // },
      formatter:statusFormatter,
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
        onChange={() => {}}
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
    getPolicy();
  }, []);

  useEffect(() => { 
    getPolicy();
  }, [currentPage]);

  useEffect(() => {
    setOptions({
      custom: true,
      sizePerPage: 10,
      totalSize: list.length
    })
  }, [list]);

  const getPolicy = async () => {
    const data = await systemApi.getPolicy();
    console.log(`data`, data)
    // setTotalPost(data.total);
    setList(data)
  };

  const changeStatusPolicy = async (id,status) => {
    const data = await systemApi.changeStatusPolicy({id,status});
    console.log(`data`, data)
    // setTotalPost(data.total);
    await getPolicy()
    setList(data)
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
        <h6>{ `Nội dung bài viết` }</h6>
        <p>{row?.content} </p>
      </div>
    ),
    showExpandColumn: true,
    expandColumnPosition: 'left'
  };

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Danh sách chính sách" light={false}>
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
            <ButtonIcon onClick={()=> history.push("/policy/create")} icon="plus" transform="shrink-3 down-2" color="falcon-default" size="sm">
              New
            </ButtonIcon>
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
                    data={list}
                    columns={columns}
                    bordered={false}
                    classes="table-dashboard table-striped table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap"
                    rowClasses="btn-reveal-trigger border-top border-200"
                    headerClasses="bg-200 text-900 border-y border-200"
                    {...paginationTableProps}
                  />
                </div>
                <Row noGutters className="px-1 py-3 flex-center">
                  <Col xs="auto">
                    <Button
                      color="falcon-default"
                      size="sm"
                      onClick={handlePrevPage(paginationProps)}
                      disabled={paginationProps.page === 1}
                    >
                      <FontAwesomeIcon icon="chevron-left" />
                    </Button>
                    {getPaginationArray(paginationProps.totalSize, paginationProps.sizePerPage).map(pageNo => (
                      <Button
                        color={paginationProps.page === pageNo ? 'falcon-primary' : 'falcon-default'}
                        size="sm"
                        className="ml-2"
                        onClick={() => paginationProps.onPageChange(pageNo)}
                        key={pageNo}
                      >
                        {pageNo}
                      </Button>
                    ))}
                    <Button
                      color="falcon-default"
                      size="sm"
                      className="ml-2"
                      onClick={handleNextPage(paginationProps)}
                      disabled={lastIndex >= paginationProps.totalSize}
                    >
                      <FontAwesomeIcon icon="chevron-right" />
                    </Button>
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

export default Policy;
