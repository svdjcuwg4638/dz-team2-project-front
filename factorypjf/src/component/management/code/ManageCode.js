import React from 'react'

const ManageCode = ({ manageCodeAll, setSelectId, selectId }) => {

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{width:'150px'}}>관리코드</th>
            <th>관리코드명</th>
          </tr>
        </thead>
        <tbody >
          {manageCodeAll &&
            manageCodeAll.map((data) => (
              <tr onClick={() => setSelectId(data)}>
                <td
                  style={{
                    backgroundColor:
                      selectId?.management_code == data.management_code
                        ? "#dadada"
                        : "transparent",
                  }}
                >
                  {data.management_code}
                </td>
                <td
                  style={{
                    backgroundColor:
                      selectId?.management_code == data.management_code
                        ? "#dadada"
                        : "transparent",
                  }}
                >
                  {data.management_name}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCode;
