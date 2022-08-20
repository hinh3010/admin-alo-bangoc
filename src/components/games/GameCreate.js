import React from 'react';
import { Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import GameForm from './GameForm';
import * as gamesAPI from '../../api/games';

const GameCreate = () => {
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
