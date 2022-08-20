import React, { useContext, useEffect, useState } from 'react';
import { KanbanContext } from '../../context/Context';
import { Button, Form, Input, Row, Col } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import ButtonIcon from '../common/ButtonIcon';
import GameForm from './GameForm';
import GameWheel from './GameWheel';
import * as gamesAPI from '../../api/games';
import moment from 'moment';

const GameUpdate = () => {
  const { kanbanColumns, kanbanColumnsDispatch } = useContext(KanbanContext);

  const [showForm, setShowForm] = useState(false);
  const [columnHeaderTitle, setColumnHeaderTitle] = useState('');
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
        <GameWheel callbackDelete={deleteWheel} callbackUpdate={updateWheel} callbackAdd={addWheel} data={wheels}/>
      </Col>
    </Row>
  );
};

export default GameUpdate;
