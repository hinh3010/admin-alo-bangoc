import React,{useState,useEffect} from 'react';
import { Row, Col } from 'reactstrap';
import { useHistory,useParams } from 'react-router-dom';
import PolicyForm from './policyForm';
import * as systemApi from '../../api/system';

const PolicyUpdate = () => {
  const history = useHistory();
  const { id } = useParams();

  const [policy, getPolicy] = useState();

  useEffect(() => {
    getPolicyDetail();
  }, []);

  const getPolicyDetail = async () => {
    const result = await systemApi.getPolicyByid(id);
    console.log(`result`, result)
    getPolicy(result);
  }

  const handleSubmit = async (data) => {
    console.log(`object data`, data)
    const result = await systemApi.updatePolicy(id,data);
     history.push(`/policy`)
  };

  return (
    <Row>
      <Col sm="12">
        <PolicyForm handleSubmit={handleSubmit} data={policy} />
      </Col>
    </Row>
  );
};

export default PolicyUpdate;
