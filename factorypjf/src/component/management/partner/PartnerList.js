import React, { useState } from "react";
import api from "../../../redux/api";
import { useDispatch } from "react-redux";
import { partnerAction } from "../../../redux/actions/management/partnerAction";
const PartnerList = ({ partnerAll }) => {
  const dispatch = useDispatch();

  // 필터
  const [bizNumSearch, setbizNumSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [phNumSearch, setPhNumSearch] = useState("");
  const [empNameSearch, setEmpNameSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [addressSearch, setAddressSearch] = useState("");

  const filteredData = partnerAll.filter(
    (item) =>
      item.bizNum.includes(bizNumSearch) &&
      item.name.includes(nameSearch) &&
      item.ph_num.includes(phNumSearch) &&
      item.emp_name.includes(empNameSearch) &&
      item.email.includes(emailSearch) &&
      item.address.includes(addressSearch)
  );
  // 필터 end

  // 삭제
  const [selectIds, setSelectIds] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectIds.includes(id)) {
      setSelectIds((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setSelectIds((prev) => [...prev, id]);
    }
  };

  const handleDelete = async () => {
    await api.post("/partner/delete", selectIds);
    dispatch(partnerAction.getPartnerAll());
    setSelectIds([]);
  };
  // 삭제 end

  return (
    <div>
      <table>
        <thead className="top_table_header">
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                placeholder="사업자번호 검색"
                value={bizNumSearch}
                onChange={(e) => setbizNumSearch(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="회사명 검색"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="연락처 검색"
                value={phNumSearch}
                onChange={(e) => setPhNumSearch(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="담당자명 검색"
                value={empNameSearch}
                onChange={(e) => setEmpNameSearch(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="이메일 검색"
                value={emailSearch}
                onChange={(e) => setEmailSearch(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="주소 검색"
                value={addressSearch}
                onChange={(e) => setAddressSearch(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <th>
              <button onClick={handleDelete}>삭제</button>
            </th>
            <th>사업자번호</th>
            <th>회사명</th>
            <th>연락처</th>
            <th>담당자명</th>
            <th>이메일</th>
            <th>주소</th>
          </tr>
        </thead>
        <div className="top_table_wrap">
          <tbody>
            {filteredData.map((data) => (
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={selectIds.includes(data.partner_id)}
                    onChange={() => handleCheckboxChange(data.partner_id)}
                  />
                </td>
                <td>{data.bizNum}</td>
                <td>{data.name}</td>
                <td>{data.ph_num}</td>
                <td>{data.emp_name}</td>
                <td>{data.email}</td>
                <td>{data.address}</td>
              </tr>
            ))}
          </tbody>
        </div>
      </table>
    </div>
  );
};

export default PartnerList;
