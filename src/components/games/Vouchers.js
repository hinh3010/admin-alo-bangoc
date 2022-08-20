import React from 'react';
import {
  Badge,
  Media,
} from 'reactstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Flex from '../common/Flex';

const Vouchers = ({data, type}) => {
  
  const statusFormatter = (dataField, { id }) => (
    <Badge color="success">Active</Badge>
  );
  
  const columns = [
    {
      dataField: type === 'voucher' ? 'code' : 'id',
      text: type === 'voucher' ? 'Code' : 'Id',
      headerClasses: 'border-0',
      classes: 'border-0 py-2 align-middle',
      sort: true
    },
    {
      dataField: 'status',
      headerClasses: 'border-0 align-right',
      text: '',
      classes: 'border-0 py-2 align-middle',
      formatter: statusFormatter,
      align: 'right'
    }
  ];
  
  return (
    <BootstrapTable keyField='id' data={ data } columns={ columns } pagination={ paginationFactory() } />
  );
};

export default Vouchers;
