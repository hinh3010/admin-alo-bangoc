import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Button, Card, CardBody, CardHeader, Col, CustomInput, Form, FormGroup, Row,
  Dropdown, Input, Label, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import * as notificationApi from '../../api/notification';
import * as fileManagerApi from '../../api/fileManger';
import * as urlConfig from '../../api/urlConfig';
import { toast } from 'react-toastify';
import UploadImage from '../common/UploadImage';
import Loader from '../common/Loader';
import moment from 'moment';
import DatePicker from 'reactstrap-date-picker';
import Datetime from 'react-datetime';


const NotificationCreate = () => {
  const history = useHistory();
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [option, setOption] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [link, setLink] = useState('');
  const [timerDate, settimerDate] = useState();
  const [expired, setExpired] = useState();



  useEffect(() => {
    getSampleData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (provinceData.length > 0) setProvince(provinceData[0].province_id);
  }, [provinceData]);

  useEffect(() => {
    if (districtData.length > 0) setDistrict(districtData[0].district_id);
  }, [districtData]);

  useEffect(() => {
    if (wardData.length > 0) setWard(wardData[0].ward_id);
  }, [wardData]);

  useEffect(() => {
    if (province) getDistrictData(province);
  }, [province]);

  useEffect(() => {
    if (district) getWardData(district);
  }, [district]);

  const getSampleData = async () => {
    const result = await notificationApi.getProvince();
    setProvinceData(result);
  };

  const getDistrictData = async (provinceId) => {
    const index = [{
      district_id: 'All',
      name: 'All'
    }];

    const temp = await notificationApi.getDistrict(provinceId);

    setDistrictData(index.concat(temp));
  };

  const getWardData = async (districtId) => {
    let result = [{
      ward_id: 'All',
      name: 'All'
    }];
    const index = await notificationApi.getWard(province, districtId);
    if (index) {
      setWardData(result.concat(index.ward));
    } else {
      setWardData(result);
    }
  };

  const createNotification = async (formData) => {
    const result = await notificationApi.create(formData);
    toast(
      <Fragment>
        <h6>Success message</h6>
        <hr />
        <p className="mb-0">Create successfully!</p>
      </Fragment>
    );
    history.push('/notification');
  };

  const OnSubmit = async (e) => {
    e.preventDefault();
    let imageResult;
    if (image) {
      imageResult = await fileManagerApi.uploadImage(image);
    }
    const formData = {
      province: option ? "" : province,
      district: option ? "" : district,
      wards: option ? "" : ward,
      title,
      content,
      expired: expired,
      image: imageResult?.imageId,
      publish_date: timerDate,
      all: option,
      link
    };
    console.log('formData_', formData);
    createNotification(formData);
  };

  const handleToggle = e => {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  const handleChangeExpired = (value, formmat) => {
    setExpired(value);
  }


  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-light">
          <h4 className="mb-0">Create notification</h4>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={OnSubmit}>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="option">Chọn địa điểm</Label>
                    <Dropdown toggle={handleToggle}
                      isOpen={isOpen}
                    >
                      <DropdownToggle caret >
                        {option ? "Tất cả" : "Tự chọn"}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <div onClick={() => { setOption(true) }}>Tất cả</div>
                        </DropdownItem>
                        <DropdownItem>
                          <div onClick={() => { setOption(false) }}>Tự chọn</div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </FormGroup>
                </Col>
              </Row>
              {option ?
                (<></>) :
                (<Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="province">Tỉnh/Thành phố</Label>
                      <CustomInput
                        value={province}
                        onChange={({ target }) => {
                          setProvince(target.value);
                        }}
                        type="select"
                        id="province"
                        name="province"
                        required
                      >
                        {provinceData.map((item) => {
                          return (
                            <option key={item._id} value={item.province_id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </CustomInput>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="district">Quận/Huyện</Label>
                      <CustomInput
                        value={district}
                        onChange={({ target }) => {
                          setDistrict(target.value);
                        }}
                        type="select"
                        id="district"
                        name="district"
                      >
                        {districtData.map((item) => {
                          return (
                            <option key={item.district_id} value={item.district_id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </CustomInput>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="ward">Xã/Phường</Label>
                      <CustomInput
                        value={ward}
                        onChange={({ target }) => {
                          setWard(target.value);
                        }}
                        type="select"
                        id="ward"
                        name="ward"
                      >
                        {wardData.map((item) => {
                          return (
                            <option key={item.ward_id} value={item.ward_id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </CustomInput>
                    </FormGroup>
                  </Col>
                </Row>
                )
              }


              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                      value={title}
                      onChange={({ target }) => {
                        setTitle(target.value);
                      }}
                      type="text"
                      rows="5"
                      name="title"
                      id="title"
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Label for="expired">Đặt lịch thông báo</Label>
                  <Datetime
                    value={moment(timerDate)}
                    onChange={(timerDate) => settimerDate(timerDate)}
                    timeFormat="HH:mm:ss"
                    dateFormat="DD/MM/YYYY"
                  // utc={true}
                  />
                </Col>
                <Col md={6}>
                  <Label for="expired">Ngày hết hạn</Label>
                  <DatePicker id="expired"
                    value={expired}
                    onChange={(v, f) => handleChangeExpired(v, f)}
                    showClearButton={false}
                    autoComplete={"off"}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="content">Content</Label>
                    <Input
                      value={content}
                      onChange={({ target }) => {
                        setContent(target.value);
                      }}
                      type="textarea"
                      rows="5"
                      name="content"
                      id="content"
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="link">Link</Label>
                    <Input
                      value={link}
                      onChange={({ target }) => {
                        setLink(target.value);
                      }}
                      type="text"
                      rows="5"
                      name="link"
                      id="link"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <UploadImage
                    label="Image"
                    imageLink={image && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + image}
                    setImage={setImage}
                  />
                </Col>
              </Row>

              <Button type="submit" color="primary">
                Create
              </Button>
              <Button className="ml-2" color="secondary" onClick={() => history.push('/notification')}>
                Cancel
              </Button>
            </Form>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default NotificationCreate;
