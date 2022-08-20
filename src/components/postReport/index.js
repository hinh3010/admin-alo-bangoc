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

const PostReport = () => {
  const nameFormatter = (cellContent, row) => {
    console.log(`dataField`, row);

    return `${row.user_id.first_name} ${row.user_id.last_name}`;
  };

  const contentFormatter = (dataField,{content}) => {
    console.log(`dataField`, content);

    return `${content}`;
  };


  
  const dateFormatter = date => <span>{moment(date).format('DD/MM/YYYY HH:mm')}</span>;
  const imageFormatter = (dataField, { backgroud, id }) => {
    return (
      <Link to={`/games/detail/${id}`}>
        <Avatar src={backgroud} />
      </Link>
    )
  };
  
  const actionFormatter = (dataField, { post_id }) => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem className="text-danger" onClick={()=> handelPostReport(post_id?._id,'BLOCK')}>Khoá</DropdownItem>
        <DropdownItem onClick={()=> console.log(post_id?._id)} >
        Bỏ qua
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const expandRow = {
    renderer: row => (
      <div>
        <h6>{ `Nội dung bài viết` }</h6>
        <p>{row?.post_id?.content} </p>
      </div>
    ),
    showExpandColumn: true,
    expandColumnPosition: 'left'
  };
  
  const columns = [
    {
      dataField: 'post_id.title',
      headerClasses: 'border-0',
      text: 'Tiêu đề',
      classes: 'border-0 py-2 align-middle',
      // formatter: imageFormatter,
      sort: true
    },
    {
      dataField: 'user_id.content',
      headerClasses: 'border-0',
      text: 'Người báo cáo',
      classes: 'border-0 py-2 align-middle',
      formatter: nameFormatter,
      sort: true
    },
    {
      dataField: '',
      headerClasses: 'border-0',
      text: 'Nội dung báo cáo',
      classes: 'border-0 py-2 align-middle',
      formatter: contentFormatter,
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
  
  // const selectRow = onSelect => ({
  //   mode: 'checkbox',
  //   columnClasses: 'py-2 align-middle',
  //   clickToSelect: false,
  //   selectionHeaderRenderer: ({ mode, ...rest }) => <SelectRowInput type="checkbox" {...rest} />,
  //   selectionRenderer: ({ mode, ...rest }) => <SelectRowInput type={mode} {...rest} />,
  //   headerColumnStyle: { border: 0, verticalAlign: 'middle' },
  //   selectColumnStyle: { border: 0, verticalAlign: 'middle' },
  //   onSelect: onSelect,
  //   onSelectAll: onSelect
  // });

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
    getListPostReport();
  }, []);

  useEffect(() => { 
    getListPostReport();
  }, [currentPage]);

  useEffect(() => {
    setOptions({
      custom: true,
      sizePerPage: 10,
      totalSize: gameList.length
    })
  }, [gameList]);

  const getListPostReport = async () => {
    const data = await postAPI.getListPostreport((currentPage - 1) * limit, limit);
    console.log(`data`, data)
    setPostList(data);
    setTotalPost(1000);
  };

  const handelPostReport =async (postId,status)=>{
   const resp = await postAPI.handelPostReport({postId,status})
    console.log(`handelPostReport`, {postId,status})
  }

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
      <FalconCardHeader title="Danh sách bài viết bị báo cáo" light={false}>
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
            <ButtonIcon onClick={()=> history.push("/games/create")} icon="plus" transform="shrink-3 down-2" color="falcon-default" size="sm">
              New
            </ButtonIcon>
            <ButtonIcon icon="filter" transform="shrink-3 down-2" color="falcon-default" size="sm" className="mx-2">
              Filter
            </ButtonIcon>
            <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">
              Export
            </ButtonIcon>
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
                    data={gameList}
                    columns={columns}
                    // selectRow={selectRow(onSelect)}
                    expandRow={ expandRow }
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

export default PostReport;
