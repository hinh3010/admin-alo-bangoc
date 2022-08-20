import React, { createRef, Fragment, useEffect, useState, createContext, useContext } from 'react';
import { useHistory, useLocation, useRouteMatch, Link, Route } from 'react-router-dom';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import moment from 'moment';

import {
  Badge,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../common/Avatar';
import * as stickerAPI from '../../api/sticker';
import * as urlConfig from '../../api/urlConfig';
import { getPaginationArray } from '../../helpers/utils';

import './Styles.css';
import { set } from 'lodash';
const ItemsContext = createContext();
const DetailContext = createContext();

const Stickers = () => {
  const location = useLocation();
  const [stickerList, setStickerList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [id, setId] = useState('');
  const history = useHistory();
  let table = createRef();
  const [showItem, setShowItem] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const params = (new URL(document.location)).searchParams.get('page') ? (new URL(document.location)).searchParams.get('page') : '1';
  const [options, setOptions] = useState({
    custom: true,
    sizePerPage: 10,
    totalSize: 0,
  });
  const [filterCategory, setFilterCategory] = useState();

  function handleShowItem() {
    setShowItem(true);
  }

  function handleShowDetail() {
    setShowDetail(true);
  }

  useEffect(() => {
    pageChange(params);
  }, [])

  useEffect(() => {
    (async () => {
      const data = await getStickerList();
      setOptions({
        custom: true,
        sizePerPage: 10,
        totalSize: data.totalResults,

      });
    })();


  }, []);



  const getStickerList = async () => {
    const data = await stickerAPI.getList(limit, params);
    setStickerList(data.results);
    return data;
  };


  const itemsList = async id => {
    const data = await stickerAPI.detail(id);
    setItems(data.items);
  };

  const pageChange = async (pagNo) => {
    const data = await stickerAPI.getList(limit, pagNo);
    setStickerList(data.results);
    history.push(`?page=${pagNo}`, Number(pagNo));
  }



  const setStickerDetail = async id => {
    const data = await stickerAPI.detail(id);
    setItems(data.items);
    setName(data.name);
    setCategories(data.categories);
    setHashtags(data.hashtags);
    setThumbnail(data.thumbnail);
  };

  const imageFormatter = image => {
    return <Avatar src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + image} />;
  };

  const actionFormatter = () => (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        {/* window.location.href = window.location.origin + `/sticker/add/${id}` */}
        {/* onClick={() =>  history.push(`/sticker/add/${id}`)} */}

        <DropdownItem onClick={() => history.push(`/sticker/add/${id}`)} >
          Edit
        </DropdownItem>

        <DropdownItem onClick={() => deleteSticker(id)} className="text-danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const dateFormatter = date => <span>{moment(date).format('DD/MM/YYYY')}</span>;

  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          setStickerDetail(row.id);
          handleShowDetail();
        }
      }
    },
    {
      dataField: 'thumbnail',
      headerClasses: 'border-0',
      text: 'Thumbnail',
      classes: 'border-0 py-2 align-middle',
      formatter: imageFormatter,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          handleShowItem();
          itemsList(row.id);
        }
      }
    },
    {
      dataField: 'categories',
      headerClasses: 'border-0',
      text: 'Categories',
      classes: 'border-0 py-2 align-middle',
      formatter: categories => {
        return (
          <>
            {categories.map(value => (
              <p>{value.name}</p>
            ))}
          </>
        );
      }
    },
    {
      dataField: 'hashtags',
      headerClasses: 'border-0',
      text: 'Hashtags',
      classes: 'border-0 py-2 align-middle',
      formatter: hashtags => {
        return (
          <>
            {hashtags.map(value => (
              <p>{value}</p>
            ))}
          </>
        );
      }
    },
    {
      dataField: 'createdAt',
      headerClasses: 'border-0',
      text: 'Ngày tạo',
      classes: 'border-0 py-2 align-middle',
      formatter: dateFormatter
    },
    {
      dataField: 'price',
      headerClasses: 'border-0',
      text: 'Giá',
      classes: 'border-0 py-2 align-middle',
      formatter: (cellContent, row) => {
        return cellContent ? cellContent + ' VND' : 'Free';
      }
    },
    {
      dataField: '',
      headerClasses: 'border-0',
      text: '',
      classes: 'border-0 py-2 align-middle',
      formatter: actionFormatter,
      formatExtraData: { _id: id },
      align: 'right',
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          setId(row.id);
          console.log(id);
        }
      }
    }
  ];

  const deleteSticker = async id => {
    if (window.confirm('Are you sure delete this sticker?')) {
      const result = await stickerAPI.remove(id);
      getStickerList();
    }
  };

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Sticker list" light={false}>
        <Fragment>
          <Row>
            <UncontrolledDropdown>
              <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3" caret>
                {/* <FontAwesomeIcon icon="ellipsis-h" className="fs--1" /> */}
                {filterCategory ? filterCategory : 'Categories'}
              </DropdownToggle>
              <DropdownMenu right className="border py-2">
                <DropdownItem onClick={() => setFilterCategory('Đã KYC')}>Category 1</DropdownItem>
                <DropdownItem onClick={() => setFilterCategory('Chưa KYC')}>Category 2</DropdownItem>
                <DropdownItem onClick={() => setFilterCategory('Yêu cầu xác thực')}>Category 3</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <ButtonIcon
              className="mr-1"
              onClick={() => history.push('/sticker/add')}
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

      <CardBody className="p-0">
        <PaginationProvider pagination={paginationFactory(options)} >
          {({ paginationProps, paginationTableProps }) => {
            const lastIndex = paginationProps.page * paginationProps.sizePerPage;
            return (
              <Fragment>
                <div className="table-responsive">
                  <BootstrapTable
                    ref={table}
                    bootstrap4
                    keyField="_id"
                    data={stickerList}
                    columns={columns}
                    bordered={false}
                    classes="table-dashboard table-striped table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap"
                    rowClasses="btn-reveal-trigger border-top border-200"
                    headerClasses="bg-200 text-900 border-y border-200"
                    {...paginationTableProps}
                  />
                </div>
                <Row noGutters className="px-1 py-3 flex-center" sm="3">
                  <Col></Col>
                  <Col className='text-center'>
                    <Button
                      color="falcon-default"
                      size="sm"
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
                      onClick={() => {
                        pageChange(paginationProps.page + 1);
                        history.push("?page=" + Number(paginationProps.page + 1), Number(paginationProps.page + 1));
                      }}
                      disabled={lastIndex >= paginationProps.totalSize}
                      onPageChange={paginationProps.page + 1}
                    >
                      <FontAwesomeIcon icon="chevron-right" />
                    </Button>
                  </Col>

                  <Col style={{ textAlign: 'right' }}>
                    <span>Có {paginationProps.totalSize} bộ Sticker</span>

                  </Col>
                </Row>
              </Fragment>
            );
          }}
        </PaginationProvider>
      </CardBody>

      <ItemsContext.Provider value={{ items, showItem, setShowItem }}>
        <ModalItems />
      </ItemsContext.Provider>
      <DetailContext.Provider value={{ items, name, thumbnail, categories, hashtags, showDetail, setShowDetail }}>
        <ModalDetail />
      </DetailContext.Provider>
    </Card>
  );
};

const ModalItems = () => {
  const { items, showItem, setShowItem } = useContext(ItemsContext);
  return (
    <div>
      <Modal toggle={() => setShowItem(false)} fullscreen={true} isOpen={showItem} className="modal-fullscreen-sticker">
        <ModalHeader toggle={() => setShowItem(false)}>Sticker Items</ModalHeader>
        <ModalBody>
          {items.map(value => {
            return <Avatar src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + value} />;
          })}
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setShowItem(false)}>OK</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const ModalDetail = () => {
  const { items, name, thumbnail, categories, hashtags, showDetail, setShowDetail } = useContext(DetailContext);
  return (
    <div>
      <Modal
        toggle={() => setShowDetail(false)}
        fullscreen={true}
        isOpen={showDetail}
        className="modal-fullscreen-sticker"
      >
        <ModalHeader toggle={() => setShowDetail(false)}>Sticker Detail</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <h3>{name}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Items: </h4>
              {items.map(value => {
                return <Avatar src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + value} />;
              })}
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Thumbnail: </h4>
              <Avatar src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + thumbnail} />;
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Categories: </h4>
              {categories.map(value => {
                return <p>{value.name}</p>;
              })}
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Hashtags: </h4>
              {hashtags.map(value => {
                return <p>{value}</p>;
              })}
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setShowDetail(false)}>OK</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Stickers;
