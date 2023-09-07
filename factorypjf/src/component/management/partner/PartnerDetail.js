import React from "react";

const PartnerDetail = ({ selectPartner }) => {
  return (
    <div className="detail_wrap">
      {selectPartner && (
      <>
        <div>
          <div>
            <div>회사코드 </div>
            <input
              readOnly
              style={{ width: "130px" }}
              type="text"
              name="partner_code"
              value={selectPartner?.partner_code}
              required
            />
          </div>
          <div>
            <div>사업자번호 </div>
            <input
              readOnly
              style={{ width: "130px" }}
              type="text"
              name="bizNum"
              value={selectPartner?.bizNum}
              required
            />
          </div>
          <div>
            <div>거래처이름 </div>
            <input
              readOnly
              style={{ width: "135px" }}
              type="text"
              name="partner_name"
              required
              value={selectPartner?.partner_name}
            />
          </div>
        </div>

        <div>
          <div>
            <div>대표자 </div>
            <input
              readOnly
              style={{ width: "60px" }}
              type="text"
              name="representative"
              required
              value={selectPartner?.representative}
            />
          </div>
          <div>
            <div>전화번호 </div>
            <input
              readOnly
              style={{ width: "130px" }}
              type="text"
              name="ph_num"
              required
              value={selectPartner?.ph_num}
            />
          </div>
          <div>
            <div>이메일 </div>
            <input readOnly type="text" name="email" required 
            value={selectPartner?.email}/>
          </div>
        </div>

        <div>
          <div>
            <div>우편번호 </div>
            <input
              readOnly
              style={{ width: "120px" }}
              type="text"
              name="post_num"
              required
              value={selectPartner?.post_num}
            />
          </div>
        </div>
        <div>
          <div>
            <div>주소</div>
            <input readOnly type="text" required name="address" 
            value={selectPartner?.address}/>
          </div>
        </div>

        <div>
          <div>
            <div>상세주소</div>
            <input readOnly type="text" required name="address_detail" 
            value={selectPartner?.address_detail}/>
          </div>
        </div>

        <div>
          <div>
            <div>홈페이지 </div>
            <input readOnly type="text" name="url" required 
            value={selectPartner?.url}/>
          </div>
        </div>
        <div>
          <div>
            <div>은행이름 </div>
            <input
              readOnly
              style={{ width: "100px" }}
              type="text"
              name="account_code"
              required
              value={selectPartner?.account_code}
            />
          </div>
          <div>
            <div>예금주 </div>
            <input
              readOnly
              style={{ width: "59px" }}
              type="text"
              name="account_holder"
              required
              value={selectPartner?.account_holder}
            />
          </div>
          <div>
            <div>계좌번호 </div>
            <input readOnly type="text" name="account_num" required
            value={selectPartner?.account_num} />
          </div>
        </div>

        <div>
          <div>수금/지급 예정일 </div>
          매월
          <input
            readOnly
            style={{ width: "30px", textAlign: "center" }}
            type="text"
            name="collect_date"
            required
            value={selectPartner?.collect_date}
          />
          일
        </div>
      </>
      )}
    </div>
  );
};

export default PartnerDetail;
