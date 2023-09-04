import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemAction } from "../../../redux/actions/management/itemAction";

const Table = () => {
  const dispatch = useDispatch();
  const { itemAll, loading } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(itemAction.getItemAll());
  }, []);

  return (
    <div style={{ height: "600px", overflowY: "scroll" }}>
      <table className="">
        <thead>
          <tr>
            <th>카테고리</th>
            <th>품목코드</th>
            <th>품목명</th>
            <th>규격</th>
            <th>단위</th>
            <th>거래처코드</th>
            <th>거래처명</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {itemAll.data &&
            itemAll.data.map((item) => (
              <tr>
                <td>{item.category}</td>
                <td>{item.item_code}</td>
                <td>{item.item_name}</td>
                <td>
                  {item.width}*{item.length}*{item.height}, {item.volume},{" "}
                  {item.weight}
                </td>
                <td>1EA</td>
                <td>{item.partner_code}</td>
                <td>거래처명</td>
                <td>수량</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
