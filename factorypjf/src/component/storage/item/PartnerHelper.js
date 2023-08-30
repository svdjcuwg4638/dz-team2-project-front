import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { partnerAction } from "../../../redux/actions/management/partnerAction";

const PartnerHelper = ({ searchPartner, handleRowClick, menu }) => {
  const dispatch = useDispatch();

  const { partnerAll, loading } = useSelector((state) => state[menu.eng_name]);

  const [InputPartner, setInputPartner] = useState("");
  const [selectedPartner, setSelectedPartner] = useState();
  const [Category, setCategory] = useState("default");

  useEffect(() => {
    dispatch(partnerAction.getPartnerAll());
  }, [InputPartner]);

  let filteredPartner = [];

  if (partnerAll.data) {
    if (Category === "default") {
      filteredPartner = partnerAll.data.filter(
        (item) =>
          item.partner_code.includes(InputPartner) ||
          item.partner_name.includes(InputPartner)
      );
    } else if (Category === "code") {
      filteredPartner = partnerAll.data.filter((item) =>
        item.partner_code.includes(InputPartner)
      );
    } else if (Category === "name") {
      filteredPartner = partnerAll.data.filter((item) =>
        item.partner_name.includes(InputPartner)
      );
    }
  }

  const rowClickHandler = (partner) => {
    setSelectedPartner(partner);
    searchPartner(partner.partner_code);
    handleRowClick(partner);
  };
  const selectHandler = (event) => {
    setCategory(event.target.value);
  };
  const clickFn = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    setInputPartner(e.target[0].value);
  };
  return (
    <div
      style={{
        border: "1px solid black",
        width: "400px",
        height: "500px",
        backgroundColor: "white",
      }}
    >
      <div className="header" style={{ backgroundColor: "#5390F0" }}>
        <div>
          <select className="mt-3" style={{ width: "25%", height: "30px" }}>
            <option value="default">공통</option>
            <option value="code">{menu.name}코드</option>
            <option value="name">{menu.name}명</option>
          </select>
          <form style={{ display: "inline" }} onSubmit={(e) => clickFn(e)}>
            <input
              style={{
                border: "1px solid black",
                width: "70%",
                height: "31px",
              }}
            ></input>
            <button type="submit">조회 </button>
          </form>
        </div>
      </div>
      <div>
        <div
          className="body m-3"
          style={{ height: "400px", overflowY: "scroll" }}
        >
          <table>
            <thead>
              <th>{menu.name}코드</th>
              <th>{menu.name}명</th>
            </thead>
            <tbody>
              {filteredPartner.map((partner) => (
                <tr onClick={() => rowClickHandler(partner)}>
                  <td>{partner[menu.code_column]}</td>{" "}
                  <td> {partner[menu.name_column]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PartnerHelper;
