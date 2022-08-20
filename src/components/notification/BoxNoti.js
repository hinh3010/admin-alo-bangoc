import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar';
import createMarkup from '../../helpers/createMarkup';
import * as urlConfig from '../../api/urlConfig'
import {formatTime} from '../../helpers/utils'

const BoxNoti = ({created_at,navigate, to, avatar, time, className, unread, flush, emoji, children, title, user_sender }) => {
  const src=`${urlConfig.BASE_URL_FILE_MANAGER}/uploads/${user_sender?.avatar}`
  const newAvatar = {...avatar,src}
  return (
    <Link className={classNames('notification', { 'bg-200': unread, 'notification-flush': flush }, className)} to={`/censor/list-notification`}>
      {src && (
        <div className="notification-avatar">
          <Avatar {...newAvatar} className="mr-3" />
        </div>
      )}
      <div onClick={()=>navigate()} className="notification-body">
        <p className={emoji ? 'mb-1' : 'mb-0'} dangerouslySetInnerHTML={createMarkup(children)} />
        <p>{title}</p>
        <span className="notification-time">
          {emoji && (
            <span className="mr-1" role="img" aria-label="Emoji">
              {emoji}
            </span>
          )}
          {created_at ? formatTime(created_at):''}
        </span>
      </div>
    </Link>
  );
};

BoxNoti.propTypes = {
  to: PropTypes.string.isRequired,
  avatar: PropTypes.shape(Avatar.propTypes),
  time: PropTypes.string.isRequired,
  className: PropTypes.string,
  unread: PropTypes.bool,
  flush: PropTypes.bool,
  emoji: PropTypes.string,
  children: PropTypes.node
};

BoxNoti.defaultProps = { unread: false, flush: false };

export default BoxNoti;
