import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemAction } from "../../../redux/actions/management/itemAction";
import { InventoryAction } from "redux/actions/storage/InventoryAction";

const Table = () => {
  const dispatch = useDispatch();
  // const { itemAll, loading } = useSelector((state) => state.item);
  const { inventoryAll, loading } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(InventoryAction.getInventoryAll());
  }, []);

  console.log(inventoryAll.data);
  return (
    <div style={{ height: "300px", overflowY: "scroll" }}>
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
          {inventoryAll.data &&
            inventoryAll.data.map((inventory) => (
              <tr>
                <td>{inventory.category}</td>
                <td>{inventory.item_code}</td>
                <td>{inventory.item_name}</td>
                <td>
                  {inventory.width}*{inventory.length}*{inventory.height},{" "}
                  {inventory.volume}, {inventory.weight}
                </td>
                <td>1EA</td>
                <td>{inventory.partner_code}</td>
                <td>{inventory.partner_name}</td>
                <td>{inventory.total}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
