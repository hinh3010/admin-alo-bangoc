import React, { Fragment } from 'react';
import {
  Card,
  CardBody,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
