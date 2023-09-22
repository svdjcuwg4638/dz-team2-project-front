import {createSlice} from "@reduxjs/toolkit"

const initialSubState= JSON.parse(sessionStorage.getItem('menuState')) ||{
    currentMenu:'production',
    currentMenuName:'생산관리',
}

const menuSlice = createSlice({
    name:'menu',
    initialState:initialSubState,
    reducers:{
        production(state){
            state.currentMenu='production'
            state.currentMenuName='생산관리'
            sessionStorage.setItem('menuState', JSON.stringify(state));
        },
        storage(state){
            state.currentMenu='storage'
            state.currentMenuName='재고관리'
            sessionStorage.setItem('menuState', JSON.stringify(state));
        },
        inbound(state){
            state.currentMenu='inbound'
            state.currentMenuName='입고관리'
            sessionStorage.setItem('menuState', JSON.stringify(state));
        },
        outbound(state){
            state.currentMenu='outbound'
            state.currentMenuName='출고관리'
            sessionStorage.setItem('menuState', JSON.stringify(state));
        },
        management(state){
            state.currentMenu='management'
            state.currentMenuName='기준정보관리'
            sessionStorage.setItem('menuState', JSON.stringify(state));
        },
        setBookmarkMenu(state, action) {
            const { menu, menuName } = action.payload;
            state.currentMenu = menu;
            state.currentMenuName = menuName;
            sessionStorage.setItem('menuState', JSON.stringify(state));
        },
    }
})

export default menuSlice.reducer
export const menuActions = menuSlice.actions