import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddItem from "./AddItem";
import ItemList from "./ItemList";
import { itemAction } from "../../../redux/actions/management/itemAction";
import { ClipLoader } from "react-spinners";
import "../../../style/management/item.css";
import DetailItem from "./DetailItem";
import api from "redux/api";
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

  //#region 추가모달표시
  const [view, setView] = useState("-100%");

  const addFormViewHandler = () => {
    if (view == "-100%") {
      setView("0");
    } else {
      setView("-100%");
    }
  };
  //#endregion

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
      <div style={{ height: "90%", margin: "50px" }}>
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
            marginTop: "20px",
          }}
        >
          <button
            className="button"
            style={{ marginRight: "10px" }}
            onClick={addFormViewHandler}
          >
            추가
          </button>
          <button
            className="button "
            style={{ backgroundColor: "red" }}
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      </div>
      <div className="detail_items_wrap">
        <DetailItem selectItem={selectItem} />
      </div>
      <div className="item_add_wrap" style={{ right: view }}>
        <AddItem addFormViewHandler={addFormViewHandler} />
      </div>
    </div>
  );
};

export default Item;
