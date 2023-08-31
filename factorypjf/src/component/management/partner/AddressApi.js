import React  from "react";
import DaumPostcode from "react-daum-postcode";

const AddressApi = (props) => {
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let fullpost_num = data.zonecode

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    props.setcompany({
      ...props.company,
      address: fullAddress,
      post_num:fullpost_num,
    });
  };

  return (
    <div>
      <DaumPostcode
      style={{width:'100%'}} autoClose onComplete={complete} />
    </div>
  );
};

export default AddressApi;
