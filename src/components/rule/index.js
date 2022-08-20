import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createRef, Fragment, useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { useHistory } from 'react-router-dom';
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
import * as systemAPI from '../../api/system';
import * as urlConfig from '../../api/urlConfig';
import { getPaginationArray } from '../../helpers/utils';
import Avatar from '../common/Avatar';
import FalconCardHeader from '../common/FalconCardHeader';
import Loader from '../common/Loader';
import ButtonIcon from '../common/ButtonIcon';
const Rule = () => {

  const actionFormatter = (dataField, { _id }) => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => history.push(`/rule/add/${_id}`)}>Edit</DropdownItem>
        <DropdownItem onClick={() => deletePolicy(_id)} className="text-danger">
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

  const imageFormatter = (image) => {
    if (image)
      return <Avatar src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + image} />;
    return <> </>
  };

  const columns = [
    {
      dataField: 'title',
      text: 'Tiêu đề',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      sort: true
    }
    ,
    {
      dataField: '',
      headerClasses: 'border-0',
      text: '',
      classes: 'border-0 py-2 align-middle',
      formatter: actionFormatter,
      align: 'right',
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          setId(row.id);
          console.log(id);
        }
      }
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
  const [id, setId] = useState('');
  const [type, setType] = useState(0);
  const [options, setOptions] = useState({
    custom: true,
    sizePerPage: 10,
    totalSize: 0
  });
  const history = useHistory();

  useEffect(() => {
    getListRule();
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

  const getListRule = async () => {
    setloading(true)
    const data = await systemAPI.getPolicyv2();
    console.log(`data`, data);
    // setList(data);
    setloading(false)
  };
  const deletePolicy = async (id) => {
    setloading(true)
    const data = await systemAPI.deletePolicy(id);
    getListRule();
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

  const editRule = (data) => {
    console.log(`data`, data)
    setDataModal(data)
    setModal(true)
  };

  return (
    loading ? <Loader /> :
      <Card className="mb-3">
        <FalconCardHeader title="Danh sách" light={false}>
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
              <ButtonIcon
                onClick={() => history.push('/rule/add')}
                icon="plus"
                transform="shrink-3 down-2"
                color="falcon-default"
                size="sm"
              >
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

export default Rule;
