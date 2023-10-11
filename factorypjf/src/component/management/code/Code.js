import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { codeAction } from "redux/actions/management/codeAction";
import CommonCode from "./CommonCode";
import ManageCode from "./ManageCode";
import "../../../style/management/code.css";
import "../../../style/management/management.css";

const Code = () => {
  const dispatch = useDispatch();

  const [selectId, setSelectId] = useState(null);

  const [isLoading, setIsloading] = useState(false);

  const { codeAll, manageCodeAll } = useSelector(
    (state) => state.code
  );

  const [codeAllData,setCodeAllData] = useState(codeAll.data)

  useEffect(() => {

    const patchItems = async () => {
      setIsloading(true);
      try {
        await dispatch(codeAction.getCodeAll())
      } catch (error) {
        console.error(error);
      } finally {
        setIsloading(false);
      }
    };
    patchItems();
  }, []);

  useEffect(()=>{
    setCodeAllData(codeAll.data)
  },[codeAll])


  if (isLoading) {
    return (
      <div className="loader_wrap container">
        <ClipLoader
          color="#000"
          loading={isLoading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="loading"
        />
      </div>
    );
  }

  return (
    <div className="flex code_wrap" style={{marginTop:"23px"}}>
      <div></div>
      {manageCodeAll && (
        <ManageCode
          manageCodeAll={manageCodeAll.data}
          setSelectId={setSelectId}
          selectId={selectId}
        />
      )}
      { codeAll && !isLoading&& (
        <CommonCode
          manageCodeAll={manageCodeAll.data}
          codeAll={codeAllData}
          selectId={selectId}
          setCodeAllData={setCodeAllData}
        />
      )}
    </div>
  );
};

export default Code;
