import React from 'react';
import ButtonIcon from '../common/ButtonIcon';

const AddWheel = ({ setModal }) => {
  return (
    <div className="kanban-column-footer">
      <ButtonIcon
        onClick={() => setModal(true)}
        className="btn-add-card text-600 text-decoration-none"
        color="link"
        block
        icon="plus"
        iconClassName="mr-1"
        size="sm"
      >
        Add wheel
      </ButtonIcon>
    </div>
  );
};

export default AddWheel;
