import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import ListGroup from 'reactstrap/es/ListGroup';
import ListGroupItem from 'reactstrap/es/ListGroupItem';
import { rawEarlierNotifications, rawNewNotifications } from '../../data/notification/notification';
import { isIterableArray } from '../../helpers/utils';
import useFakeFetch from '../../hooks/useFakeFetch';
import FalconCardHeader from '../common/FalconCardHeader';
import Notification from '../notification/Notification';
import BoxNoti from '../notification/BoxNoti';
import AppContext from '../../context/Context';

import { getProfile } from '../../services/storages/userStorage';
import useSocket from '../../hooks/useSocket';
import * as notiApi from '../../api/notification'
import { io } from 'socket.io-client';
// import { REALTIME_URL } from '../../api/urlConfig';



const NotificationDropdown = () => {
  // State
  const { data: newNotifications, setData: setNewNotifications } = useFakeFetch(rawNewNotifications);
  const { data: earlierNotifications, setData: setEarlierNotifications } = useFakeFetch(rawEarlierNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [isAllRead, setIsAllRead] = useState();
  const history = useHistory();
  const [listNoti, setlistNoti] = useState([]);
  const userProfile = getProfile();
  // const socket = io(REALTIME_URL);
  const divRef = useRef();
  const [lastItem, setLastItem] = useState();


  window.onload = function () {
    if (document.readyState !== 'loading') {
      console.log('document is already ready, just execute code here');
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log('alooooooooo');
              addMore();
            }
          })
        }, {
        threshold: 0.5
      })

      const rep = document.getElementById('loader');
      if (typeof rep == 'Element') {
        observer.observe(rep);
      }

    }
  };

  useEffect(() => {
    getListNoti();
    checkReadAll();
    // socket.emit('setSocketId', `${userProfile?._id}`);
  }, []);

  useEffect(() => {
    // socket.on('io_notifi_send_admin', msg => {
    //   console.log('1');
    //   if (msg) {
    //     getListNoti();
    //     setIsAllRead(false);
    //   }
    getListNoti();
    setIsAllRead(false);
    // });

  }, [listNoti]);



  const getListNoti = async (offset = 0, limit = 10) => {
    const resp = await notiApi.getListNoti(offset, limit)
    setLastItem(resp.data.at(-1));
    if (resp && JSON.parse(JSON.stringify(resp.data)) != JSON.parse(JSON.stringify(listNoti))) {
      setlistNoti(resp.data)
    }
  }


  // Handler
  const handleToggle = e => {
    e.preventDefault();
    setIsOpen(!isOpen);
    checkReadAll();
  };

  const checkReadAll = () => {
    const isReadNew = newNotifications.forEach(notification => {
      if (notification.hasOwnProperty('unread')) {
        return true;
      }
      return false;
    });
    const isReadOld = earlierNotifications.forEach(notification => {
      if (notification.hasOwnProperty('unread')) {
        return true;
      }
      return false;
    });

    if (isReadNew || isReadOld) {
      setIsAllRead(false);
    } else {
      setIsAllRead(true);
    }
  }

  const navigate = () => {
    history.push('/censor/list-notification')
  }

  const markAsRead = e => {
    e.preventDefault();
    const updatedNewNotifications = newNotifications.map(notification => {
      if (notification.hasOwnProperty('unread')) {
        return {
          ...notification,
          unread: false
        };
      }
      return notification;
    });
    const updatedEarlierNotifications = earlierNotifications.map(notification => {
      if (notification.hasOwnProperty('unread')) {
        return {
          ...notification,
          unread: false
        };
      }
      setIsAllRead(true);
      return notification;
    });

    setNewNotifications(updatedNewNotifications);
    setEarlierNotifications(updatedEarlierNotifications);
  };

  const addMore = () => {
    let a = listNoti.slice();
    a.push(listNoti.at(0));
    //listNoti.push(listNoti.at(0));
    setlistNoti(a);
  }

  return (

    <Dropdown
      nav
      inNavbar
      isOpen={isOpen} // 
      toggle={handleToggle}
      onMouseOver={() => {
        let windowWidth = window.innerWidth;
        windowWidth > 992 && setIsOpen(true);
      }}
      onMouseLeave={() => {
        let windowWidth = window.innerWidth;
        windowWidth > 992 && setIsOpen(false);
      }}
    >
      <DropdownToggle
        nav
        className={classNames('px-0', {
          'notification-indicator notification-indicator-primary': !isAllRead
        })}
      >
        <FontAwesomeIcon icon="bell" transform="shrink-6" className="fs-4" />
      </DropdownToggle>

      <DropdownMenu right className="dropdown-menu-card" style={{ maxWidth: '20rem', maxHeight: '80vh' }} >
        <Card className="card-notification shadow-none" >
          <FalconCardHeader className="card-header" title="Thông báo" titleTag="h6" light={false}>
            <Link className="card-link font-weight-normal" to="#!" onClick={markAsRead}>
              Đánh dấu đã đọc
            </Link>
          </FalconCardHeader>
          <ListGroup flush className="font-weight-normal fs--1">
            <div className="list-group-title" onClick={() => addMore()}>Mới nhất</div>
            <div style={{ maxHeight: '40vh', overflow: 'auto' }} id='scroll'>
              {isIterableArray(listNoti) &&
                listNoti.map((notification, index) => (
                  <ListGroupItem key={index} onClick={handleToggle} id={notification._id}>
                    <BoxNoti {...notification} navigate={navigate} flush /> + {notification._id}
                  </ListGroupItem>
                ))}
              <div id='loader'>Loading...</div>
            </div>

            <div className="list-group-title">Thông báo hệ thống</div>
            {isIterableArray(earlierNotifications) &&
              earlierNotifications.map((notification, index) => (
                <ListGroupItem key={index} onClick={handleToggle}>
                  <BoxNoti {...notification} flush />
                </ListGroupItem>
              ))}
          </ListGroup>
          <div className="card-footer text-center border-top" onClick={handleToggle}>
            <Link className="card-link d-block" to="/pages/notifications">
              View all
            </Link>
          </div>
        </Card>
      </DropdownMenu>

    </Dropdown>
  );
};



export default NotificationDropdown;
