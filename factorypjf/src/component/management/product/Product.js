import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../../redux/actions/management/productAction";
import ProductInput from "./ProductInput";
import ComponentInput from "./ComponentInput";
import { ClipLoader } from "react-spinners";
import "../../../style/management/product.css";
import api from "../../../redux/api";

const Product = () => {
  const dispatch = useDispatch();

  const { loading, itemAll, locationAll, storageAll, partnerAll } = useSelector(
    (state) => state.product
  );

  const [selectedItem, setSelectedItem] = useState(null);
  const [selComponentList, setSelComponentList] = useState([]);

  const submitHandler = async (event)=>{

    const dataToSend = {
      productId: selectedItem?.item_id,
      components: selComponentList.map(component => ({
        item_id: component.item_id,
        quantity: component.quantity 
      }))
    }
    try{
      const response = await api.post("/product/add",dataToSend)
      setSelComponentList([])
    }catch(error){
      console.error("Error submit data :" ,error)
    }
    
  }

  useEffect(() => {
    dispatch(productAction.getProductAll());
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
        <ProductInput
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          itemAll={itemAll}
          locationAll={locationAll}
          storageAll={storageAll}
          partnerAll={partnerAll}
        />
      )}
      {itemAll.data &&(
      <ComponentInput
        selComponentList={selComponentList}
        setSelComponentList={setSelComponentList}
        itemAll={itemAll}
        locationAll={locationAll}
        storageAll={storageAll}
        partnerAll={partnerAll}
      />
      )}
      <button onClick={submitHandler}>저장</button>
    </div>
  );
};

export default Product;
