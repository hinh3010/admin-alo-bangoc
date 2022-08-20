import React, { Fragment, useEffect, useState, createRef } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, CardBody, Button,
  Col,
  Row
} from 'reactstrap';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import moment from 'moment';
import Avatar from '../common/Avatar';
import * as gift from '../../api/gift';
import * as urlConfig from '../../api/urlConfig';
import Loader from '../common/Loader';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';
import LightBoxGallery from '../common/LightBoxGallery';
import { GET_FILE } from '../../api/urlConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPaginationArray } from '../../helpers/utils';



const Gift = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [giftList, setGiftList] = useState([]);
  const [options, setOptions] = useState({
    custom: true,
    sizePerPage: 10,
    totalSize: 0
  });

  let table = createRef();

  useEffect(() => {
    getListGift();
  }, []);

  useEffect(() => {
    setOptions({
      custom: true,
      sizePerPage: 10,
      totalSize: giftList.length
    });
  }, [giftList]);



  const getListGift = async () => {
    setLoading(true);
    const result = await gift.getListGift(0, 1000);
    setGiftList(result.items);
    setTimeout(() => {
      console.log('gift', result);
      setLoading(false);
    }, 1000);
  };

  const creatorFormatter = (user) => <span>{user.username}</span>;

  const imageFormatter = (image) => {
    return <Avatar src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + image} />;
  };

  const dateFormatter = date => <span>{moment(date).format('DD/MM/YYYY')}</span>;

  const columns = [
    {
      dataField: 'title',
      headerClasses: 'border-0',
      text: 'Tiêu đề',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'content',
      headerClasses: 'border-0',
      text: 'Nội dung',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'link',
      headerClasses: 'border-0',
      text: 'Link',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'expired',
      headerClasses: 'border-0',
      text: 'Ngày hết hạn',
      classes: 'border-0 py-2 align-middle',
      formatter: dateFormatter,
      sort: true
    },
    {
      dataField: 'publish_date',
      headerClasses: 'border-0',
      text: 'Ngày công khai',
      classes: 'border-0 py-2 align-middle',
      formatter: dateFormatter,
      sort: true
    }
  ];

  const expandRow = {
    renderer: row => {
      let images = [];
      images.push(`${GET_FILE}/${row.file}`);
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
    },
    showExpandColumn: true,
    expandColumnPosition: 'left'
  };

  const handleNextPage = ({ page, onPageChange }) => () => {
    onPageChange(page + 1);
  };

  const handlePrevPage = ({ page, onPageChange }) => () => {
    onPageChange(page - 1);
  };

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Danh sách quà tặng" light={false}>
        <Fragment>
          <ButtonIcon
            onClick={() => history.push('/gift/create')}
            icon="plus"
            transform="shrink-3 down-2"
            color="falcon-default"
            size="sm"
          >
            New
          </ButtonIcon>
        </Fragment>
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
                    data={giftList}
                    columns={columns}
                    expandRow={expandRow}
                    //selectRow={selectRow(onSelect)}
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
        {/* <ModalFrom onSubmit={onSubmit} /> */}
      </CardBody>
    </Card>

  );
};

export default Gift;
