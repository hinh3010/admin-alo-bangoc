import React, { useState } from 'react';
import WheelItem from './WheelItem';
import AddWheel from './AddWheel';
import WheelModal from './WheelModal';

const GameWheel = ({ data = [], callbackDelete, callbackUpdate, callbackAdd, gameStatus }) => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [typeModal, setTypeModal] = useState('create');
  return (
    <>
      {data.map((item) => {
        return (
          <WheelItem
            key={item.id}
            data={item}
            callbackDelete={callbackDelete}
            setModal={(modal) => {
              setModal(modal);
              if (modal) {
                setModalContent(item);
                setTypeModal('update');
              }
            }}
          />
        );
      })}
      {!gameStatus && (
        <AddWheel
          setModal={(modal) => {
            setModal(modal);
            if (modal) {
              setModalContent(null);
              setTypeModal('create');
            }
          }}
        />
      )}
      <WheelModal
        gameStatus={gameStatus}
        modal={modal}
        callbackUpdate={callbackUpdate}
        callbackAdd={callbackAdd}
        setModal={setModal}
        modalContent={modalContent}
        type={typeModal}
      />
    </>
  );
};
GameWheel.propTypes = {};
export default GameWheel;
