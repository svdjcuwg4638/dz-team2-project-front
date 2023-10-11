import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import UnitPriceList from "./UnitPriceList";
import AddUnitPrice from "./AddUnitPrice";
import "../../../style/management/unitPrice.css";
import { itemAction } from "redux/actions/management/itemAction";
import "../../../style/management/management.css";

const UnitPrice = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const { itemAll } = useSelector((state) => state.item);
  useEffect(() => {
    const patchUnitPrice = async () => {
      setIsloading(true);
      try {
        await dispatch(itemAction.getItemAll());
      } catch (error) {
        console.error(error);
      } finally {
        setIsloading(false);
      }
    };
    patchUnitPrice();
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
    <div className="unitprice_wrap">
      <UnitPriceList itemAll={itemAll}/>
      {itemAll.data && <AddUnitPrice itemAll={itemAll} />}
      <div className="unitprice_title"></div>
    </div>
  );
};

export default UnitPrice;
