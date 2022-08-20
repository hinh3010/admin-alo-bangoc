import React, { useContext, useState } from 'react';
import { KanbanContext } from '../../context/Context';
import { Button, Form, Input, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import ButtonIcon from '../common/ButtonIcon';
import GameForm from './GameForm';
import GameWheel from './GameWheel';
import * as gamesAPI from '../../api/games';

const GameCreate = () => {
  const { kanbanColumns, kanbanColumnsDispatch } = useContext(KanbanContext);

  const [showForm, setShowForm] = useState(false);
  const [columnHeaderTitle, setColumnHeaderTitle] = useState('');
  const history = useHistory();

  const handleSubmit = async (data) => {
    const result = await gamesAPI.add(data);
    history.push(`/games/update/${result.id}`)
  };

  return (
    <Row>
      <Col sm="12">
        <GameForm handleSubmit={handleSubmit} />
      </Col>
    </Row>
  );
};

export default GameCreate;
