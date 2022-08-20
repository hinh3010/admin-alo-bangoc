import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';

import { Button, Card, CardBody, CardHeader, Col, CustomInput, Form, FormGroup, Input, Label, Row, UncontrolledTooltip } from 'reactstrap';
import moment from 'moment';
import * as mediaSystemApi from '../../api/mediaSystem';
import * as fileManagerApi from '../../api/fileManger';
import * as urlConfig from '../../api/urlConfig';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';
import UploadImage from '../common/UploadImage';
import Loader from '../common/Loader';
import Avatar from '../common/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {getUrlYoutube} from '../../helpers/utils'

const MediaSystemEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  const { register, handleSubmit, errors } = useForm();

  const [loading, setLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [backgroundProfile, setBackgroundProfile] = useState('');
  const [backgroundGroup, setBackgroundGroup] = useState('');
  const [backgroundlogin, setBackgroundlogin] = useState('');
  const [backgroundHome, setBackgroundHome] = useState('');
  const [mainLogo, setMainLogo] = useState('');
  const [imageGame, setImageGame] = useState('');
  const [backgroundHeader, setBackgroundHeader] = useState('');

  const [bannerLeft, setbannerLeft] = useState('');
  const [bannerRight, setbannerRight] = useState('');


  const [slide, setSlide] = useState('');
  const [slideDefault, setSlideDefault] = useState([]);
  const [mediaSystem, setMediaSystem] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (id) {
      getMediaSystem();
    } else {
      resetData();
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    if (!isEmpty(mediaSystem)) {
      setBackgroundProfile(mediaSystem.background_profile);
      setBackgroundGroup(mediaSystem.background_group);
      setYoutubeLink(mediaSystem.youtube.link);
      setSlideDefault(mediaSystem.slide_default);
      setBackgroundlogin(mediaSystem.background_login);
      setBackgroundHome(mediaSystem.background_home);
      setMainLogo(mediaSystem.main_logo);
      setImageGame(mediaSystem.image_game);
      setBackgroundHeader(mediaSystem.background_header);
      setbannerLeft(mediaSystem.banner_home_left);
      setbannerRight(mediaSystem.banner_home_right);
    }
  }, [mediaSystem]);

  useEffect(() => {
    if (!isEmpty(formData) && isSubmit) {
      if (id) {
        updateMediaSystem();
      } else {
        createMediaSystem();
      }
    }
    
    console.log('formData', formData);
  }, [formData, isSubmit]);

  const getMediaSystem = async () => {
    const result = await mediaSystemApi.detail(id);
    setMediaSystem(result);
    setFormData({ youtube: result.youtube, status: result.status, slide_default: result.slide_default });
  };

  const resetData = () => {
    setLoading(true);
    setMediaSystem({});
    setFormData({});
    setYoutubeLink('');
    setBackgroundGroup('');
    setBackgroundProfile('');
    setSlide('');
    setSlideDefault([]);
    setBackgroundlogin('');
    setBackgroundHome('');
    setMainLogo('');
    setImageGame('');
    setBackgroundHeader('')
    setbannerLeft('')
    setbannerRight('')
  };

  const updateMediaSystem = async () => {
    const result = await mediaSystemApi.update(id, formData);
    toast(
      <Fragment>
        <h6>Message</h6>
        <hr />
        <p className="mb-0">Update successfully!</p>
      </Fragment>
    );
    history.push('/media-system');
  };

  const createMediaSystem = async () => {
    const result = await mediaSystemApi.create(formData);
    toast(
      <Fragment>
        <h6>Message</h6>
        <hr />
        <p className="mb-0">Create successfully!</p>
      </Fragment>
    );
    history.push('/media-system');
  };

  const addSlide = async () => {
    if (slide instanceof File) {
      const slideResult = await fileManagerApi.uploadImage(slide);
      setSlideDefault([...slideDefault, slideResult.imageId]);
      setSlide('');
    }
  };

  const OnSubmit = async (data, e) => {
    console.log(`object 33333333`)
    const youtubeData = {
      link: data.youtube_link,
      width: data.youtube_width,
      height: data.youtube_height,
      embed: data.youtube_embed,
      start: data.youtube_start,
      end: data.youtube_end,
    };
    let backgroundProfileResult = null;
    let backgroundGroupResult = null;
    let backgroundloginResult = null;
    let backgroundHomeResult = null;
    let backgroundHeaderResult = null;
    let mainLogoResult = null;
    let imageGameResult = null;
    let bannerLeftResult = null;
    let bannerRightResult = null;
    if (backgroundProfile instanceof File)
      backgroundProfileResult = await fileManagerApi.uploadImage(backgroundProfile);
    if (backgroundGroup instanceof File) backgroundGroupResult = await fileManagerApi.uploadImage(backgroundGroup);
    if (backgroundlogin instanceof File) backgroundloginResult = await fileManagerApi.uploadImage(backgroundlogin);
    console.log(`backgroundloginResult`, backgroundloginResult)
    if (backgroundHome instanceof File) backgroundHomeResult = await fileManagerApi.uploadImage(backgroundHome);
    if (mainLogo instanceof File) mainLogoResult = await fileManagerApi.uploadImage(mainLogo);
    if (imageGame instanceof File) imageGameResult = await fileManagerApi.uploadImage(imageGame);
   
    if (backgroundHeader instanceof File) backgroundHeaderResult = await fileManagerApi.uploadImage(backgroundHeader);
  
    if (bannerLeft instanceof File) bannerLeftResult = await fileManagerApi.uploadImage(bannerLeft);
    if (bannerRight instanceof File) bannerRightResult = await fileManagerApi.uploadImage(bannerRight);
    setFormData({
      ...formData,
      youtube: youtubeData,
      background_profile: backgroundProfileResult ? backgroundProfileResult.imageId : backgroundProfile,
      background_group: backgroundGroupResult ? backgroundGroupResult.imageId : backgroundGroup,
      background_login: backgroundloginResult ? backgroundloginResult.imageId : backgroundlogin,
      background_home: backgroundHomeResult ? backgroundHomeResult.imageId : backgroundHome,
      background_header: backgroundHeaderResult ? backgroundHeaderResult.imageId : backgroundHeader,
      main_logo: mainLogoResult ? mainLogoResult.imageId : mainLogo,
      image_game: imageGameResult ? imageGameResult.imageId : imageGame,

      banner_home_left: bannerLeftResult ? bannerLeftResult.imageId : bannerLeft,
      banner_home_right: bannerRightResult ? bannerRightResult.imageId : bannerRight,
      slide_default: slideDefault,
    });
    setIsSubmit(true);
  };

  const handleRemoveSlide = (slide) => {
    if (window.confirm('Are you sure to remove this slide?')) {
      setSlideDefault(slideDefault.filter(item => item !== slide));
    }
  }

  console.log('mediaSystem', mediaSystem);
  return (
    <Fragment>
      <Card>
        <CardHeader className="bg-light">
          <h4 className="mb-0">Media System</h4>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit(OnSubmit)}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="youtube_link">Youtube link</Label>
                    <Input
                      value={youtubeLink}
                      onChange={({ target }) => {
                        setYoutubeLink(target.value);
                      }}
                      innerRef={register({
                        required: 'required',
                      })}
                      type="text"
                      name="youtube_link"
                      id="youtube_link"
                      placeholder="Enter link"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="youtube_embed">Youtube embed</Label>
                    <Input
                      defaultValue={!isEmpty(formData) ? formData.youtube.embed : ''}
                      innerRef={register({
                        required: 'required',
                      })}
                      type="text"
                      name="youtube_embed"
                      id="youtube_embed"
                      placeholder="Enter embed"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="youtube_width">Youtube width</Label>
                        <Input
                          defaultValue={!isEmpty(formData) ? formData.youtube.width : ''}
                          innerRef={register({
                            required: 'required',
                            pattern: {
                              value: /^\d+$/i,
                              message: 'Must be number',
                            },
                          })}
                          type="text"
                          name="youtube_width"
                          id="youtube_width"
                          placeholder="Enter width"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="youtube_height">Youtube height</Label>
                        <Input
                          defaultValue={!isEmpty(formData) ? formData.youtube.height : ''}
                          innerRef={register({
                            required: 'required',
                            pattern: {
                              value: /^\d+$/i,
                              message: 'Must be number',
                            },
                          })}
                          type="text"
                          name="youtube_height"
                          id="youtube_height"
                          placeholder="Enter height"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="youtube_start">Youtube start</Label>
                        <Input
                          type="datetime-local"
                          name="youtube_start"
                          id="youtube_start"
                          defaultValue={
                            !isEmpty(formData) ? moment.utc(formData.youtube.start).format('YYYY-MM-DDTHH:mm') : ''
                          }
                          innerRef={register({
                            required: 'required',
                          })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="youtube_end">Youtube end</Label>
                        <Input
                          type="datetime-local"
                          name="youtube_end"
                          id="youtube_end"
                          defaultValue={
                            !isEmpty(formData) ? moment.utc(formData.youtube.end).format('YYYY-MM-DDTHH:mm') : ''
                          }
                          innerRef={register({
                            required: 'required',
                          })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  {youtubeLink && (
                          <div className="video-responsive">
                          <iframe
                            width={400}
                            height={300}
                            src={`//www.youtube.com/embed/${getUrlYoutube(youtubeLink)}?autoplay=1 `}
                            // title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                  )}
                </Col>
              </Row>

              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label for="status">Media system status</Label>
                    <CustomInput
                      value={!isEmpty(formData) ? formData.status : true}
                      onChange={({ target }) => {
                        setFormData({ ...formData, status: target.value });
                      }}
                      type="select"
                      id="status"
                      name="status"
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Disable</option>
                    </CustomInput>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <UploadImage
                    label="Logo"
                    imageLink={mainLogo && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + mainLogo}
                    setImage={setMainLogo}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <UploadImage
                    label="Bìa trái"
                    imageLink={bannerLeft && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + bannerLeft}
                    setImage={setbannerLeft}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <UploadImage
                    label="Bìa phải"
                    imageLink={bannerRight && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + bannerRight}
                    setImage={setbannerRight}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <UploadImage
                    label="Ảnh Game"
                    imageLink={imageGame && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + imageGame}
                    setImage={setImageGame}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <UploadImage
                    label="Bìa trang chủ"
                    imageLink={backgroundHome && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + backgroundHome}
                    setImage={setBackgroundHome}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <UploadImage
                    label="Bìa trang đăng nhập"
                    imageLink={backgroundlogin && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + backgroundlogin}
                    setImage={setBackgroundlogin}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <UploadImage
                    label="Bìa header"
                    imageLink={backgroundHeader && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + backgroundHeader}
                    setImage={setBackgroundHeader}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <UploadImage
                    label="Ảnh bìa cá nhân"
                    imageLink={backgroundProfile && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + backgroundProfile}
                    setImage={setBackgroundProfile}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <UploadImage
                    label="Background Group"
                    imageLink={backgroundGroup && urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + backgroundGroup}
                    setImage={setBackgroundGroup}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12} style={{ position: 'relative' }}>
                  <UploadImage label="Slide Image" setImage={setSlide} required={false} />
                  <div style={{ position: 'absolute', bottom: 0, left: '15px' }}>
                    <Button onClick={addSlide} color="success">
                      Add
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                {slideDefault.map((slide, index) => {
                  return (
                    <Col key={index} md={2} style={{ position: 'relative' }}>
                      <Avatar
                        className="mb-2"
                        size="4xl"
                        src={urlConfig.BASE_URL_FILE_MANAGER + '/uploads/' + slide}
                        alt="slide"
                      />
                      <div style={{ position: 'absolute', top: 0, right: 0 }}>
                        <Label
                          onClick={() => handleRemoveSlide(slide)}
                          className="mr-2 btn btn-light btn-sm mb-0 cursor-pointer"
                        >
                          <FontAwesomeIcon icon="times" className="fs-1" />
                        </Label>
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <Button type="submit" color="primary">
                Update
              </Button>
              <Button className="ml-2" color="secondary" onClick={() => history.push('/media-system')}>
                Cancel
              </Button>
            </Form>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default MediaSystemEdit;
