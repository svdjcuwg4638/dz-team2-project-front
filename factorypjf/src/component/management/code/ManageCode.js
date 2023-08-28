const ManageCode = ({ manageCodeAll, setSelectId, selectId }) => {
  console.log("selectId", selectId);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>관리코드</th>
            <th>관리코드명</th>
          </tr>
        </thead>
        <tbody>
          {manageCodeAll &&
            manageCodeAll.map((data) => (
              <tr onClick={() => setSelectId(data.management_code_id)}>
                <td
                style={{backgroundColor: selectId == data.management_code_id ? "#dadada" : "transparent",}}
                >{data.management_code}</td>
                <td
                style={{backgroundColor: selectId == data.management_code_id ? "#dadada" : "transparent",}}
                >{data.management_name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCode;
