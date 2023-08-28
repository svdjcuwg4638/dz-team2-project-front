import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { codeAction } from 'redux/actions/management/codeAction';
import CommonCode from './CommonCode';
import ManageCode from './ManageCode';
import "../../../style/management/code.css"

const Code = () => {

  const dispatch = useDispatch();

  const [selectId, setSelectId] = useState(null);

  const { codeAll, manageCodeAll, loading } = useSelector(
    (state) => state.code
  );

  useEffect(() => {
    dispatch(codeAction.getCodeAll());
  }, []);

  useEffect(()=>{
    if(manageCodeAll.data){
      setSelectId(manageCodeAll.data[0].management_code_id)
    }
  },[manageCodeAll])

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
    <div className='flex code_wrap'>
      {selectId && manageCodeAll.data && <ManageCode manageCodeAll={manageCodeAll.data} setSelectId={setSelectId} selectId={selectId}/>}
      {manageCodeAll.data && codeAll.data &&  <CommonCode manageCodeAll={manageCodeAll.data} codeAll={codeAll.data} selectId={selectId}/>}
    </div>
  )
}

export default Code