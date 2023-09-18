import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ItemRelation = () => {
  const dispatch = useDispatch();

  const [selectId, setSelectId] = useState(null);

  const { itemAll } = useSelector((state) => state.item);

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
    <div>
      {itemAll.data && 
        <>
          <ProductItem itemAll={itemAll} setSelectId={setSelectId} selectId={selectId}/>
          <RelationItem itemAll={itemAll} selectId={selectId}/>
        </>
      }
    </div>
  );
};

export default ItemRelation;
