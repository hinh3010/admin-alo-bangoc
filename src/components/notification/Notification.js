import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import moment from 'moment';
import Avatar from '../common/Avatar';
import * as notificationApi from '../../api/notification';
import * as urlConfig from '../../api/urlConfig';
import Loader from '../common/Loader';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';

const Notification = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    getListNotification();
  }, []);

  const getListNotification = async () => {
    setLoading(true);
    const result = await notificationApi.getList(0, 1000);
    setNotificationList(result);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const creatorFormatter = (user) => <span>{user.username}</span>;

  const imageFormatter = (image) => {
    return <Avatar src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + image} />;
  };

  const dateFormatter = (created_at) => <span>{moment(created_at).format('DD/MM/YYYY HH:mm')}</span>;

  const columns = [
    {
      dataField: 'image',
      headerClasses: 'border-0',
      text: 'Image',
      classes: 'border-0 py-2 align-middle',
      formatter: imageFormatter,
    },
    {
      dataField: 'title',
      text: 'Title',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      sort: true,
    },
    {
      dataField: 'user',
      text: 'Creator',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      formatter: creatorFormatter,
      sort: true,
    },
    {
      dataField: 'created_at',
      headerClasses: 'border-0',
      text: 'Created at',
      classes: 'border-0 py-2 align-middle',
      formatter: dateFormatter,
      sort: true,
    },
  ];

  return (
    <Card className="p-3">
      <FalconCardHeader title="Notification list" light={false}>
        <Fragment>
          <ButtonIcon
            onClick={() => history.push('/notification/create')}
            icon="plus"
            transform="shrink-3 down-2"
            color="falcon-default"
            size="sm"
          >
            New
          </ButtonIcon>
        </Fragment>
      </FalconCardHeader>
      <CardBody>
        {false ? (
          <Loader />
        ) : (
          notificationList.length > 0 && (
            <BootstrapTable
              classes="table-dashboard table-striped table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap mb-3"
              headerClasses="bg-200 text-900 border-y border-200"
              rowClasses="btn-reveal-trigger border-top border-200"
              bootstrap4
              keyField="_id"
              data={notificationList}
              columns={columns}
              pagination={paginationFactory()}
            />
          )
        )}
      </CardBody>
    </Card>
  );
};

export default Notification;
