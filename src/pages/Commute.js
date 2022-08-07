import React, {useEffect, useState} from 'react';
import {Nav, Pagination, Table} from "react-bootstrap";
import axios from "axios";
import CommuteTable from "../compnents/CommuteTable";

function Commute() {

  const [commuteList, setCommuteList] = useState([]);
  const [standard, setStandard] = useState('today-list');
  const [page, setPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    setPage(0)
  }, [standard]);


  useEffect(() => {
    axios.get(`http://localhost:8080/${standard}?page=${page}`)
      .then((res) => {
        setCommuteList(res.data.content)
        setPageInfo(res.data)
      })
      .catch((res) => {
        console.log(res.data)
      })
  }, [standard, page]);

  const movePage = (n) => {
    if (page + n < 0)
      setPage(0);
    else if (page + n > pageInfo.totalPages-1)
      setPage(pageInfo.totalPages-1)
    else setPage(page+n)
   }

  return (
    <div className="commute">
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
      <Pagination className="page-navi">
        <Pagination.First onClick={() => movePage(-10)}/>
        <Pagination.Item onClick={() => setPage(0)}>1</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Prev onClick={() => movePage(-1)}/>
        <Pagination.Item>{page+1}</Pagination.Item>
        <Pagination.Next onClick={() => movePage(1)}/>

        <Pagination.Ellipsis />
        <Pagination.Item onClick={() => setPage(pageInfo.totalPages -1)}>{pageInfo.totalPages}</Pagination.Item>
        <Pagination.Last onClick={() => movePage(10)}/>
      </Pagination>
    </div>
  );
}

export default Commute;