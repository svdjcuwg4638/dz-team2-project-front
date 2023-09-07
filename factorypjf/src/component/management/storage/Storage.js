import React, { useEffect } from "react";
import "../../../style/management/storage.css";
import { useDispatch, useSelector } from "react-redux";
import { storageAction } from "../../../redux/actions/management/storageAction";
import LeftBox from "./LeftBox";
import ClipLoader from "react-spinners/ClipLoader";
import RightBox from "./RightBox";

const Storage = () => {
  const dispatch = useDispatch();

  const { storageAll, loading,locationAll } = useSelector((state) => state.storage);

  useEffect(() => {
    dispatch(storageAction.getstorageAll());
  }, []);


  if (loading) {
    return (
      <div className="loader_wrap container">
        <ClipLoader
          color="#000"
          loading={loading}
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
      <div>
        { storageAll && <LeftBox storageAll={storageAll.data} />}
      </div>
      <div>
        { locationAll && <RightBox storageAll={storageAll.data} locationAll={locationAll.data}/>}
      </div>
    </div>
  );
};

export default Storage;
