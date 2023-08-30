import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from "react-spinners";
import UnitPriceList from './UnitPriceList';
import AddUnitPrice from './AddUnitPrice';
import { unitPriceAction } from '../../../redux/actions/management/unitPriceAction';


const UnitPrice = () => {

    const dispatch = useDispatch()

    const {itemAll, loading, unitPriceAll} = useSelector((state)=> state.unitPrice)

    useEffect(()=>{
      dispatch(unitPriceAction.getUnitPriceAll())
    },[])

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
    <div className='content_wrap'>
      
      {unitPriceAll.data && (
      <UnitPriceList unitPriceAll={unitPriceAll.data} itemAll={itemAll.data}/>
      )}
      {itemAll.data && (
      <AddUnitPrice itemAll={itemAll}/>
      )}
    </div>
  )
}

export default UnitPrice