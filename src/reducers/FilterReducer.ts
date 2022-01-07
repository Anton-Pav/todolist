import React from 'react';
import {FilterValuesType} from "../App";

const initialState: FilterValuesType= 'all'

export const FilterReducer = (state=initialState, action:changeFilterACType) => {
    switch (action.type){
        case "CHANGE-FILTER":{
            return action.payload.value
        }
        default: return state
    }
};

type changeFilterACType=ReturnType<typeof changeFilterAC>
export const changeFilterAC=(value: FilterValuesType)=>{
    return{
        type:"CHANGE-FILTER",
        payload:{
            value:value
        }
    }as const
}


