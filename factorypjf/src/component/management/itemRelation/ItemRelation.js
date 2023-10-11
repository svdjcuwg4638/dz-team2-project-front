import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import RelationItem from "./RelationItem";
import { itemAction } from "redux/actions/management/itemAction";
import { ClipLoader } from "react-spinners";
import { relationAction } from "redux/actions/management/relationAction";
import "../../../style/management/relation.css"
import "../../../style/management/management.css"
const ItemRelation = () => {
  const dispatch = useDispatch();

  const [selectId, setSelectId] = useState(null);


  //#region 데이터 로딩
  const [isLoading, setIsloading] = useState(false);
  const { itemAll } = useSelector((state) => state.item);
  const { relationAll } = useSelector((state) => state.relation);

  useEffect(() => {
    const patchItems = async () => {
      setIsloading(true);
      try {
        await dispatch(itemAction.getItemAll());
        await dispatch(relationAction.getRelationAll());
      } catch (error) {
        console.error(error);
      } finally {
        setIsloading(false);
      }
    };
    patchItems();
  }, []);
  //#endregion

  const [codeAllData,setCodeAllData] = useState(null)

  useEffect(()=>{
    if(!isLoading && itemAll && itemAll.data){
      setCodeAllData(relationAll.data)
    }
  },[isLoading,relationAll])

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
    <div className="flex code_wrap">
      <div></div>
      {itemAll.data && codeAllData &&
        <>
          <ProductItem itemAll={itemAll} setSelectId={setSelectId} selectId={selectId}/>
          <RelationItem itemAll={itemAll} selectId={selectId} codeAllData={codeAllData} setCodeAllData={setCodeAllData}/>
        </>
      }
    </div>
  );
};

export default ItemRelation;
