import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import KanbanColumnHeder from './KanbanColumnHeader';
import { KanbanContext } from '../../context/Context';
import { Droppable } from 'react-beautiful-dnd';
import users from '../../data/dashboard/users';
import ButtonIcon from '../common/ButtonIcon';
import WheelItem from './WheelItem';
import AddWheel from './AddWheel';
import WheelModal from './WheelModal';

const GameWheel = ({ data = [], callbackDelete, callbackUpdate, callbackAdd }) => {
  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [typeModal, setTypeModal] = useState('create')
  return (
    <>
      {data.map((item) => {
        return <WheelItem key={item.id} data={item} callbackDelete={callbackDelete} setModal={(modal) => {
          setModal(modal);
          if (modal) {
            setModalContent(item);
            setTypeModal('update');
          }
        }}/>;
      })}
      <AddWheel setModal={(modal) => {
          setModal(modal);
          if (modal) {
            setModalContent(null);
            setTypeModal('create');
          }
        }}/>
      <WheelModal modal={modal} callbackUpdate={callbackUpdate} callbackAdd={callbackAdd} setModal={setModal} modalContent={modalContent} type={typeModal} />
    </>
  );
};
GameWheel.propTypes = {};
export default GameWheel;
