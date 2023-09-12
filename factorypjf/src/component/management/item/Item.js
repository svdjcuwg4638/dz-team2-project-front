import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddItem from "./AddItem";
import ItemList from "./ItemList";
import { itemAction } from "../../../redux/actions/management/itemAction";
import { ClipLoader } from "react-spinners";
import "../../../style/management/item.css";
import DetailItem from "./DetailItem";
const Item = () => {
  const dispatch = useDispatch();

  const { itemAll} = useSelector(
    (state) => state.item
  );

  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    const patchItems = async ()=>{
      setIsloading(true)
      try{
        await dispatch(itemAction.getItemAll())
      }catch(error){
        console.error(error);
      }finally{
        setIsloading(false)
      }
    }
    patchItems()
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
      <div style={{height:"90%", margin:'50px'}}>
        {itemAll.data && <ItemList itemAll={itemAll} />}
        <div style={{display:'flex', justifyContent:'flex-end', marginTop:'20px'}}>
          <button className="button" onClick={addFormViewHandler}>
            추가
          </button>
        </div>
      </div>
      <div className="detail_items_wrap">
        <DetailItem />
      </div>
      <div className="item_add_wrap" style={{ right: view }}>
        <AddItem addFormViewHandler={addFormViewHandler} />
      </div>
    </div>
  );
};

export default Item;
