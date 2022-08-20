import React, { useState } from 'react';
import { Label, Input, FormGroup, Row, Col } from 'reactstrap';
import Flex from './Flex';
import Avatar from './Avatar';

const UploadImage = ({ imageLink = null, setImage, label, required = true }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const imageHandler = (e) => {
    setImagePreview(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <Row>
      <Col sm="9">
        <FormGroup>
          <Label for="imageThuml">{label}</Label>
          <Input type="file" accept="image/*" onChange={imageHandler}  />
        </FormGroup>
      </Col>
      <Col sm="3">
        <Flex align="center">
          <Avatar
            className="mb-2"
            size="4xl"
            src={imagePreview ? URL.createObjectURL(imagePreview) : imageLink}
            alt={imagePreview ? imagePreview.name : 'image'}
          />
        </Flex>
      </Col>
    </Row>
  );
};

export default UploadImage;
