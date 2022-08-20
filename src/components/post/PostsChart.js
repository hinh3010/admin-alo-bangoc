import React, { createRef, Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    Col,
    CustomInput,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    InputGroup,
    Media,
    Row,
    UncontrolledDropdown
} from 'reactstrap';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Flex from '../common/Flex';
import Avatar from '../common/Avatar';
import { getPaginationArray } from '../../helpers/utils';
import * as postAPI from '../../api/post';
import Paginations from '../common/Paginations';
import moment from 'moment';
import { CanvasJSChart } from 'canvasjs-react-charts'
import DatePicker, { DateObject, getAllDatesInRange } from "react-multi-date-picker"


const PostsChart = () => {

    console.log('123')
    const [dataPoints, setDataPoints] = useState();
    const [options, setOptions] = useState();
    const [dates, setDates] = useState();

    useEffect(() => {
        setDataPoints([
            { label: "Apple", y: 10 },
            { label: "Orange", y: 15 },
            { label: "Banana", y: 25 },
            { label: "Mango", y: 30 },
            { label: "Grape", y: 28 }
        ]);
    }, []);
    useEffect(() => {
        setOptions({
            theme: "light2",
            title: {
                text: "Biểu đồ"
            },
            axisY: {
                title: "Số lượng",
                prefix: ""
            },
            data: [{
                type: "line",
                // xValueFormatString: "MMM YYYY",
                yValueFormatString: "$#,##0.00",
                dataPoints: dataPoints
            }]
        });
    }, [dataPoints]);

    return (
        <Card className="mb-3">
            <FalconCardHeader light={false}>
                <Fragment>

                    <DatePicker
                        style={{ height: 'auto' }}
                        id="date-picker"
                        placeholder="Từ ngày - đến ngày"
                        range
                        calendarPosition="bottom-center"
                        value={dates}
                        minDate={new DateObject().toFirstOfMonth()}
                        maxDate={new DateObject().toLastOfMonth()}
                        // onChange={dateObjects => {
                        //     setDates(dateObjects)
                        //     setAllDates(getAllDatesInRange(dateObjects))
                        // }}
                        buttons={true}
                        format="DD/MM/YYYY"
                        showOtherDays={true}
                        shouldCloseOnSelect={false}
                        showCalendar={true}
                        showDateInput
                        showPopperArrow={true}
                        editable={true}
                        autofocus={true}
                    />

                </Fragment>

            </FalconCardHeader>
            <CardBody className="p-0">
                <div>
                    <CanvasJSChart options={options}
                    // onRef={ref => this.chart = ref}
                    />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>
            </CardBody>
        </Card>
    );
};

export default PostsChart;
