import React, { useEffect, useState } from "react";
import "../../../style/management/storage.css";
import { useDispatch, useSelector } from "react-redux";
import { storageAction } from "../../../redux/actions/management/storageAction";
import LeftBox from "./LeftBox";
import ClipLoader from "react-spinners/ClipLoader";
import RightBox from "./RightBox";
import "../../../style/management/management.css"

const Storage = () => {
  const dispatch = useDispatch();

  const { storageAll, locationAll } = useSelector((state) => state.storage);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const patchItems = async () => {
      setIsloading(true);
      try {
        await dispatch(storageAction.getstorageAll());
      } catch (error) {
        console.error(error);
      } finally {
        setIsloading(false);
      }
    };
    patchItems();
  }, []);

  const [selectId, setSelectId] = useState(null);

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
    <div className="storage_wrap">
      <div></div>
      <div>
        <div style={{width:"40%"}}>
          {storageAll && (
            <LeftBox
              storageAll={storageAll.data}
              selectId={selectId}
              setSelectId={setSelectId}
            />
          )}
        </div>
        <div style={{width:"40%"}}>
          {locationAll && (
            <RightBox locationAll={locationAll.data} selectId={selectId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Storage;
