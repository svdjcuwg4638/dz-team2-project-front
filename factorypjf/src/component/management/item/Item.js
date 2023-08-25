import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddItem from "./AddItem";
import ItemList from "./ItemList";
import { itemAction } from "../../../redux/actions/management/itemAction";
import { ClipLoader } from "react-spinners";

const Item = () => {
  const dispatch = useDispatch();

  const { itemAll, storageAll, loading, locationAll } = useSelector(
    (state) => state.item
  );

  useEffect(() => {
    dispatch(itemAction.getItemAll());
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
    <div className="content_wrap">
      {itemAll.data && (
        <ItemList
          itemAll={itemAll}
          storageAll={storageAll}
          locationAll={locationAll}
        />
      )}
      {storageAll.data && (
        <AddItem storageAll={storageAll} locationAll={locationAll} />
      )}
    </div>
  );
};

export default Item;
