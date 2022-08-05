import React, {useEffect, useState} from 'react';
import {Nav, Table} from "react-bootstrap";
import axios from "axios";
import PageNavi from "../compnents/PageNavi";
import CommuteTable from "../compnents/CommuteTable";

function Commute() {

  const [commuteList, setCommuteList] = useState([]);
  const [standard, setStandard] = useState('today-list');

  useEffect(() => {
    axios.get('http://localhost:8080/'+standard)
      .then((res) => {
        setCommuteList(res.data)
      })
      .catch((res) => {
        console.log(res.data)
      })
  }, [standard]);

  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="today">
        <Nav.Item>
          <Nav.Link onClick={() => setStandard('today-list')} eventKey="today">Today</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setStandard('yesterday-list')} eventKey="yesterday">Yesterday</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setStandard('list')} eventKey="all">ALL</Nav.Link>
        </Nav.Item>
      </Nav>
    <Table striped bordered hover variant="dark">
      <thead>
      <tr>
        <th>Dates</th>
        <th>Name</th>
        <th>Go to work time</th>
        <th>Get off work time</th>
      </tr>
      </thead>
      <tbody>
      {
        commuteList == null
        ? null
        : commuteList.map((data, i) => <CommuteTable data={data} />)
      }
      </tbody>
    </Table>
    <PageNavi className="page-navi"/>
    </div>
  );
}

export default Commute;