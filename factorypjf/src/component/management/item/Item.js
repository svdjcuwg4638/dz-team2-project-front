import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { itemAction } from "../../../redux/actions/management/itemAction";
import { ClipLoader } from "react-spinners";
import "../../../style/management/item.css";
import DetailItem from "./DetailItem";
import api from "redux/api";
import "../../../style/management/management.css";
const Item = () => {
  const dispatch = useDispatch();

  const [selectItem, setSelectItem] = useState(null);

  const { itemAll } = useSelector((state) => state.item);

  const [isLoading, setIsloading] = useState(false);

  const [selectIds, setSelectIds] = useState([]);

  const handleDelete = async () => {
    await api.post("/item/delete", selectIds);
    dispatch(itemAction.getItemAll());
    setSelectIds([]);
  };

  useEffect(() => {
    const patchItems = async () => {
      setIsloading(true);
      try {
        await dispatch(itemAction.getItemAll());
      } catch (error) {
        console.error(error);
      } finally {
        setIsloading(false);
      }
    };
    patchItems();
  }, []);

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
    <div className="item_wrap">
      <div style={{ height: "90%", margin: "5px" }}>
        {itemAll.data && (
          <ItemList
            itemAll={itemAll}
            setSelectItem={setSelectItem}
            selectItem={selectItem}
            setSelectIds={setSelectIds}
            selectIds={selectIds}
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            className="btn_delete"
            style={{ backgroundColor: selectIds.length > 0 ? "#fff" :"rgb(245, 245, 245)", color:selectIds.length > 0 ? "" : "#fff"  }}
            disabled={selectIds.length > 0 ? false : true}
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      </div>
      <div>
        <DetailItem selectItem={selectItem} setSelectItem={setSelectItem}/>
      </div>
    </div>
  );
};

export default Item;
