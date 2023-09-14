import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { partnerAction } from "redux/actions/management/partnerAction";

const UnitPriceList = ({ unitPriceAll, itemAll }) => {
  const dispatch = useDispatch();

  const { partnerAll } = useSelector((state) => state.partner);

  useEffect(() => {
    dispatch(partnerAction.getPartnerAll());
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>품목코드</th>
            <th>품목이름</th>
            <th>거래처</th>
            <th>단가</th>
            <th>입고/출고</th>
            <th>시작일</th>
            <th>종료일</th>
          </tr>
        </thead>
        {unitPriceAll.map((data) => (
          <tbody>
            <tr>
              <td>{data.item_code}</td>
              <td>
                {
                  itemAll.find((idata) => idata.item_code == data.item_code)
                    .item_name
                }
              </td>
              <td>
                {
                  partnerAll?.data?.find(
                    (pdata) => pdata.partner_code == data.partner_code
                  ).partner_name
                }
              </td>
              <td>{data.unit_price}</td>
              <td>{data.type == "inbound" ? "입고" : "출고"}</td>
              <td>{data.start_date}</td>
              <td>{data.end_date}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default UnitPriceList;
