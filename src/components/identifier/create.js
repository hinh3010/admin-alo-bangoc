import React from 'react';
import { Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import PolicyForm from './policyForm';
import * as systemApi from '../../api/system';

const PolicyCreate = () => {
  const history = useHistory();

  const handleSubmit = async (data) => {
    console.log(`object data`, data)
    const result = await systemApi.createPolicy(data);
     history.push(`/policy`)
  };

  return (
    <Row>
      <Col sm="12">
        <PolicyForm handleSubmit={handleSubmit} />
      </Col>
    </Row>
  );
};

export default PolicyCreate;
