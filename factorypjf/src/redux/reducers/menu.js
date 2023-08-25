import {createSlice} from "@reduxjs/toolkit"


const initialSubState={
    currentMenu:'production',
    currentMenuName:'생산관리'
}

const menuSlice = createSlice({
    name:'menu',
    initialState:initialSubState,
    reducers:{
        production(state){
            state.currentMenu='production'
            state.currentMenuName='생산관리'
        },
        storage(state){
            state.currentMenu='storage'
            state.currentMenuName='재고관리'
        },
        inbound(state){
            state.currentMenu='inbound'
            state.currentMenuName='입고관리'
        },
        outbound(state){
            state.currentMenu='outbound'
            state.currentMenuName='출고관리'
        },
        setting(state){
            state.currentMenu='setting'
            state.currentMenuName='기준정보관리'
        }
    }
})

export default menuSlice.reducer
export const menuActions = menuSlice.actions