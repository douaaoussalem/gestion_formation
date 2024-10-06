import { act } from "react-dom/test-utils";

const initialState={
    employes:[],formations:[],participations:[]
};
const reducer=(state=initialState,action)=>{
switch(action.type){
case 'SET_EMPLOYE' :
    return {...state,employes:action.payload}
case 'SET_FORMATION' :
    return {...state,formations:action.payload}   
   case 'SET_PARTCIPATION':
    return {...state,participations:action.payload}
default: return state
}

}
export default reducer;