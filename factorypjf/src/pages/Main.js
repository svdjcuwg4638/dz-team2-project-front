import React from 'react'
import { useDispatch } from 'react-redux'
import { ImUserTie } from "react-icons/im";
const Main = () => {

  const dispatch = useDispatch();

  return (
    <div className='main_wrap'>
      <div className='main_box_wrap'>
        <div>
          <ImUserTie size={40}/>
          <div>김성민</div>
        </div>
        <div>
          <ImUserTie size={40}/>
          <div>옥승철</div>
        </div>
        <div>
          <ImUserTie size={40}/>
          <div>최원호</div>
        </div>
        <div>
          <ImUserTie size={40}/>
          <div>김대현</div>
        </div>
      </div>
    </div>
  )
}

export default Main