import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import GameForm from './GameForm';
import GameWheel from './GameWheel';
import * as gamesAPI from '../../api/games';

const GameUpdate = () => {
  const [detailGame, setDetailGame] = useState(null);
  const [wheels, setWheels] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getGameDetail();
    getWheels();
  }, []);

  const getGameDetail = async () => {
    const result = await gamesAPI.detail(id);
    setDetailGame(result);
  }

  const getWheels = async () => {
    const result = await gamesAPI.getWheels(id);
    setWheels(result);
  }

  const handleSubmit = async (data) => {
    const result = await gamesAPI.update(id, data);
    setDetailGame(result);
  };

  const deleteWheel = (id) => {
    const newWheels = wheels.filter(item => item.id !== id);
    setWheels(newWheels);
  }

  const updateWheel = (id, newWhell) => {
    const newWheels = wheels.map(item => {
      if (item.id === id) {
        return {...item, ...newWhell};
      }
      return item;
    });
    setWheels(newWheels);
  }

  const addWheel = (newWhell) => {
    const newWheels = [...wheels, newWhell]
    setWheels(newWheels);
  }


  return (
    <Row>
      <Col sm="8">
        <GameForm handleSubmit={handleSubmit} data={detailGame}/>
      </Col>
      <Col sm="4">
        <GameWheel gameStatus={detailGame && detailGame.isActive} callbackDelete={deleteWheel} callbackUpdate={updateWheel} callbackAdd={addWheel} data={wheels}/>
      </Col>
    </Row>
  );
};

export default GameUpdate;
