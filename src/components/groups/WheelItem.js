import React, { useContext, Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Card,
  CardBody,
  Badge,
  CardImg,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { KanbanContext } from '../../context/Context';
import * as gamesAPI from '../../api/games';
import { toast } from 'react-toastify';

const WheelItem = ({ data, setModal, callbackDelete }) => {
  const deleteWheel = async () => {
    if (window.confirm('Are you sure delete wheel?')) {
      const result = await gamesAPI.deleteWheel(data.game, data.id);
      callbackDelete(data.id)
      toast(
        <Fragment>
          <h6>Name: {data.name}</h6>
          <hr />
          <p className="mb-0">Delete wheel successfully!</p>
        </Fragment>
      );
    }
  }
  return (
    <div className="mb-3">
      <Card className="kanban-item-card hover-actions-trigger">
        <CardBody className="p-2">
          <div className="mb-2">
            <Badge className="d-inline-block py-1 mr-1 mb-1">{data.wheel_type}</Badge>
          </div>
          <p className="mb-0 font-weight-medium text-sans-serif"
          dangerouslySetInnerHTML={{ __html: data.name }}
          />
          {/* <div className="kanban-item-footer">
            <div className="text-500">
              <>
                <FontAwesomeIcon icon="eye" className="mr-2" id="cardId" transform="grow-1" />
                <UncontrolledTooltip target="cardId">You're assigned in this card</UncontrolledTooltip>
              </>

              <span id="taskCard" className="mr-2">
                <FontAwesomeIcon icon="paperclip" className="mr-1" />
                <span>taskCard</span>
                <UncontrolledTooltip target="taskCard">Attachments</UncontrolledTooltip>
              </span>
              <span id="checklist">
                <FontAwesomeIcon icon="check" className="mr-1" />
                <span>checklist</span>
                <UncontrolledTooltip target="checklist">Checklist</UncontrolledTooltip>
              </span>
            </div>
            <div>
              <Link to="#!" className="p-0" id="testUser">
                <Avatar size="l" />
                <UncontrolledTooltip target="testUser">Test user</UncontrolledTooltip>
              </Link>
            </div>
          </div> */}
          <UncontrolledDropdown className="position-absolute text-sans-serif t-0 r-0 mt-card mr-card hover-actions">
            <DropdownToggle color="falcon-default" size="sm" className="py-0 px-2">
              <FontAwesomeIcon icon="ellipsis-h" />
            </DropdownToggle>
            <DropdownMenu right className="py-0">
              <DropdownItem onClick={() => setModal(true)}>Edit</DropdownItem>
              <DropdownItem className="text-danger" onClick={deleteWheel}>Remove</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </CardBody>
      </Card>
    </div>
  );
};

export default WheelItem;
