import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  Input,
  Button,
  UncontrolledTooltip,
  Form,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuillEditor from '../common/QuillEditor';
import { toast } from 'react-toastify';
import Flex from '../common/Flex';
import moment from 'moment';
import * as fileManagerApi from '../../api/fileManger';
import * as urlConfig from '../../api/urlConfig';
import UploadImage from '../common/UploadImage';


const PolicyForm = ({ handleSubmit, data = null }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [suggets, setSuggets] = useState('');
  const [scheme, setScheme] = useState('');
  const [deal, setDeal] = useState('');
  const [commitment, setCommitment] = useState('');
  const [occupations, setOccupations] = useState('');
  const [obligations, setObligations] = useState('');

  console.log(`data`, data)

  const handleClear = () => {
    setSuggets(data ? data.suggets : '');
    setScheme(data ? data.scheme : '');
    setDeal(data ? data.deal : '');
    setCommitment(data ? data.commitment : '');
    setOccupations(data ? data.occupations : '');
    setObligations(data ? data.obligations : '');
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let imageResult = null;
    let backgorundResult = null;
    // if (image instanceof File) imageResult = await fileManagerApi.uploadImage(image);
    // if (background instanceof File) backgorundResult = await fileManagerApi.uploadImage(background);

    const dataForm = {
      suggets,
      scheme,
      deal,
      commitment,
      occupations,
      obligations,
    };
    handleSubmit(dataForm);
    toast(
      <Fragment>
        <p className="mb-0">{data ? 'Update' : 'Create'} successfully!</p>
      </Fragment>
    );
    handleClear();
  };

  // useEffect(() => {
  //   setIsDisabled(!name || !startAt || !endAt || !image || !background);
  // }, [name, startAt, endAt, image, background]);

  useEffect(() => {
    if (data) {
      setSuggets(data.suggets);
      setOccupations(data.occupations);
      setDeal(data.deal);
      setScheme(data.scheme);
      setCommitment(data.commitment);
      setObligations(data.obligations);
    }
  }, [data]);

  return (
    <Fragment>
      <Card tag={Form} onSubmit={handleSubmitForm}>

        <CardHeader className="bg-light">
          <h5 className="mb-0">{'Đề nghị Vdiarybook'}</h5>
        </CardHeader>
        <CardBody className="p-0">
          <QuillEditor value={suggets??''} onChange={setSuggets} style={{ height: 300, marginBottom: 80 }} />
        </CardBody>

        <CardHeader className="bg-light">
          <h5 className="mb-0">{'Đề án Vdiarybook'}</h5>
        </CardHeader>
        <CardBody className="p-0">
          <QuillEditor value={scheme??''} onChange={setScheme} style={{ height: 300, marginBottom: 80 }} />
        </CardBody>

        <CardHeader className="bg-light">
          <h5 className="mb-0">{'Thỏa thuận Vdiarybook'}</h5>
        </CardHeader>
        <CardBody className="p-0">
          <QuillEditor value={deal??''} onChange={setDeal} style={{ height: 300, marginBottom: 80 }} />
        </CardBody>

        <CardHeader className="bg-light">
          <h5 className="mb-0">{'Bản cam kết'}</h5>
        </CardHeader>
        <CardBody className="p-0">
          <QuillEditor value={commitment??''} onChange={setCommitment} style={{ height: 300, marginBottom: 80 }} />
        </CardBody>

        <CardHeader className="bg-light">
          <h5 className="mb-0">{'Danh sách ngành nghề'}</h5>
        </CardHeader>
        <CardBody className="p-0">
          <QuillEditor value={occupations??''} onChange={setOccupations} style={{ height: 300, marginBottom: 80 }} />
        </CardBody>

        <CardHeader className="bg-light">
          <h5 className="mb-0">{'Quyền và nghĩa vụ của kiểm soát viên'}</h5>
        </CardHeader>
        <CardBody className="p-0">
          <QuillEditor value={obligations??''} onChange={setObligations} style={{ height: 300, marginBottom: 80 }} />
        </CardBody>

        <CardFooter tag={Flex} justify="between" className="border-top border-200">
          <Flex align="center">
            <Button color="primary" size="sm" className="px-5 mr-2" disabled={isDisabled} type="submit">
              {data ? 'Update' : 'Create'}
            </Button>
            <Label onClick={handleClear} className="mr-2 btn btn-light btn-sm mb-0 cursor-pointer" id="clear-info">
              <FontAwesomeIcon icon="times" className="fs-1" />
            </Label>
            <UncontrolledTooltip placement="top" target="clear-info">
              Clear Info
            </UncontrolledTooltip>
          </Flex>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

PolicyForm.propTypes = { recipientOption: PropTypes.object };

PolicyForm.defaultProps = {
  recipientOption: {
    closeMenuOnSelect: false,
    autoFocus: true,
    isMulti: true,
    isCreatable: true,
  },
};

export default PolicyForm;
