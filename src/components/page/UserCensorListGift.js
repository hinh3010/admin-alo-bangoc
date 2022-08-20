import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { createRef, Fragment, useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  Card,
  CardBody,
  Col, DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroup, Row,
  UncontrolledDropdown
} from 'reactstrap';
// import * as gamesAPI from '../../api/games';
import * as censorAPI from '../../api/censor';
import { getPaginationArray } from '../../helpers/utils';
import Avatar from '../common/Avatar';
import FalconCardHeader from '../common/FalconCardHeader';
import LightBoxGallery from '../common/LightBoxGallery';
import { GET_FILE } from '../../api/urlConfig'
import ModalFrom from '../../components/common/ModalForm'
import "../../../src/components/users/customDatePickerWidth.css";


const UserCensorListGift = () => {
  const hanldeCensor = async ({ giffId, note }, { status }) => {
    console.log(`giffId`, giffId)
    const resp = await censorAPI.handleGift({ giffId, note }, { status });
    getGiftList()
    if (resp) {
      toast('sucsess')
      setmodal(false)
    }
  };

  const nameFormatter = (cellContent, row) => {
    return `${row.createBy.fullName}`;
  };

  const dateFormatter = date => <span>{moment(date).format('DD/MM/YYYY HH:mm')}</span>;
  const linkFormatter = (cellContent) => {
    return (
      <a href={cellContent} style={{ wordBreak: 'break-word' }} >{cellContent}</a>
    );
  };

  const actionFormatter = (dataField, { id }) => (
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
    // {
    //   dataField: 'avatar',
    //   headerClasses: 'border-0',
    //   text: 'Avatar',
    //   classes: 'border-0 py-2 align-middle',
    //   formatter: imageFormatter,
    //   sort: true
    // },
    {
      dataField: '',
      text: 'Tên kiểm duyệt',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      formatter: nameFormatter,
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      }
    },
    {
      dataField: 'name',
      headerClasses: 'border-0',
      text: 'Tiêu đề',
      classes: 'border-0 py-2 align-middle',
      // formatter: dateFormatter,
      sort: true,
      headerStyle: () => {
        return { width: "15%" };
      }
    },
    {
      dataField: 'url',
      headerClasses: 'border-0',
      text: 'Link',
      classes: 'border-0 py-2 align-middle',
      formatter: linkFormatter,
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      }
    },
    {
      dataField: 'content',
      headerClasses: 'border-0',
      text: 'Nội dung',
      classes: 'border-0 py-2 align-middle',
      // formatter: dateFormatter,
      sort: true,
      headerStyle: () => {
        return { width: "20%" };
      }
    },
    {
      dataField: 'expiredDate',
      headerClasses: 'border-0',
      text: 'Lịch gửi',
      classes: 'border-0 py-2 align-middle',
      //formatter: dateFormatter,
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      }
    },
    {
      dataField: 'createdAt',
      headerClasses: 'border-0',
      text: 'Ngày gửi',
      classes: 'border-0 py-2 align-middle',
      formatter: dateFormatter,
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      }
    },
    {
      dataField: '',
      headerClasses: 'border-0',
      text: '',
      classes: 'border-0 py-2 align-middle',
      formatter: (cellContent, row) => {
        console.log(`cellContent`, cellContent)
        console.log(`row`, row)
        if (true) {
          return (
            <>
              <Button onClick={() => hanldeCensor({ giffId: row.id }, { status: 'accepted' })}
                color="falcon-success" size="sm" className="ml-2">
                Duyệt
              </Button>
              <Button onClick={() => handleFrom(row.id)} color="falcon-danger" size="sm" className="ml-2">
                Huỷ bỏ
              </Button>
            </>
          );
        }
      },
      align: 'right',
      headerStyle: () => {
        return { width: "13%" };
      }
    },
    // {
    //   dataField: '',
    //   headerClasses: 'border-0',
    //   text: '',
    //   classes: 'border-0 py-2 align-middle',
    //   formatter: actionFormatter,
    //   align: 'right'
    // }
  ];
  const onSubmit = ({ data, content }) => {
    console.log(`object`, { data, content })
    hanldeCensor({ giffId: data, note: content }, { status: 'reject' });
  }
  const handleFrom = (id) => {
    setmodal(true)
    setData(id)
  }

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
  const expandRow = {
    renderer: row => {
      let images = []
      images.push(`${GET_FILE}/${row.file}`)
      console.log(`row`, row)
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
  const [modal, setmodal] = useState(false)
  const [data, setData] = useState()
  const [options, setOptions] = useState({
    custom: true,
    sizePerPage: 10,
    totalSize: 0
  });
  const [totalResults, setTotalResults] = useState();
  const history = useHistory();
  const params = (new URL(document.location)).searchParams.get('page') ? (new URL(document.location)).searchParams.get('page') : '1';

  useEffect(() => {
    pageChange(params);
  }, [])

  useEffect(() => {
    setOptions({
      custom: true,
      sizePerPage: 10,
      totalSize: totalResults
    });
  }, [list]);

  const getGiftList = async (page = 1) => {
    const data = await censorAPI.getlistGiftCenrsor(page);
    setTotalResults(data.totalResults);
    setList(data.results);
  };

  const pageChange = async (page = 1) => {
    const data = await censorAPI.getlistGiftCenrsor(page);
    setTotalResults(data.totalResults);
    setList(data.results);
    history.push(`?page=${page}`, Number(page));
  };

  const onSelect = () => {
    setImmediate(() => {
      setIsSelected(!!table.current.selectionContext.selected.length);
    });
  };

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Danh sách hộp quà chờ duyệt" light={false}>
        {isSelected ? (
          <InputGroup size="sm" className="input-group input-group-sm">
            {/* <CustomInput type="select" id="bulk-select">
              <option>Bulk actions</option>
              <option value="Delete">Delete</option>
              <option value="Archive">Archive</option>
            </CustomInput> */}
            <Button color="falcon-default" size="sm" className="ml-2">
              Apply
            </Button>
          </InputGroup>
        ) : (
          <Fragment>
            {/* <ButtonIcon
              onClick={() => history.push('/games/create')}
              icon="plus"
              transform="shrink-3 down-2"
              color="falcon-default"
              size="sm"
            >
              New
            </ButtonIcon>
            <ButtonIcon icon="filter" transform="shrink-3 down-2" color="falcon-default" size="sm" className="mx-2">
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
                    <Button
                      color="falcon-default"
                      size="sm"
                      //onClick={handlePrevPage(paginationProps)}
                      onClick={() => {
                        pageChange(paginationProps.page - 1);
                        history.push("?page=" + Number(paginationProps.page - 1), Number(paginationProps.page - 1));
                      }}
                      disabled={paginationProps.page === 1}
                    >
                      <FontAwesomeIcon icon="chevron-left" />
                    </Button>
                    {getPaginationArray(paginationProps.totalSize, paginationProps.sizePerPage).map(pageNo => (
                      <Button
                        color={pageNo === parseInt(params) ? 'falcon-primary' : 'falcon-default'}
                        size="sm"
                        className="ml-2"
                        //onClick={() => paginationProps.onPageChange(pageNo)}
                        onClick={() => { pageChange(pageNo); }}
                        key={pageNo}
                      >
                        {pageNo}
                      </Button>
                    ))}
                    <Button
                      color="falcon-default"
                      size="sm"
                      className="ml-2"
                      //onClick={handleNextPage(paginationProps)}
                      onClick={() => {
                        pageChange(paginationProps.page + 1);
                        history.push("?page=" + Number(paginationProps.page + 1), Number(paginationProps.page + 1));
                      }}
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
        <ModalFrom data={data} setModal={setmodal} modal={modal} onSubmit={onSubmit} />
      </CardBody >
    </Card>
  );
};

export default UserCensorListGift;
