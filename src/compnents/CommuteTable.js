import React from 'react';

function CommuteTable({data}) {
  return (
    <tr>
      <td>{data.date}</td>
      <td>{data.name}</td>
      <td>{data.goToWorkTime}</td>
      <td>{data.getOffWorkTime}</td>
    </tr>
  );
}

export default CommuteTable;