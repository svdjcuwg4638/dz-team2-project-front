import React from "react";

const Table = ({ storageAll }) => {
  return (
    <div>
      <div className="table_wrap">
        <table>
          <thead>
            <tr>
              <td>창고코드</td>
            </tr>
          </thead>
          <tbody className="table_scroll">

            <tr>
              <td>A101</td>
            </tr>
            <tr>
              <td>A101</td>
            </tr>
            <tr>
              <td>A101</td>
            </tr>
            <tr>
              <td>A101</td>
            </tr>
            <tr>
              <td>A101</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
