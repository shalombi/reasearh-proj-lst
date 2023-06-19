const { createStore } = Redux

import { userService } from "../services/user.service.js";

const initialState = {
    user: userService.getLoggedinUser(),
    isDeactivated: true,
    timeIsStopped: false,
    gIsFirstClick: true,
    timeliness: [],
    time: 0,
}


function myReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOGGLE_DEACTIVATED':
            return { ...state, isDeactivated: !state.isDeactivated }

        case 'SET_TIME_IS_STOPPED':
            return { ...state, timeIsStopped: action.timeIsStopped }

        case 'SET_TIMELINES':
            return { ...state, timeliness: [...state.timeliness, action.time] }

        case 'SET_IS_FIRST_CLICK':
            return { ...state, gIsFirstClick: !state.gIsFirstClick }

        case 'SET_USER':
            return { ...state, user: action.user }

        default:
            return state
    }
}

export const store = createStore(myReducer) //Passing the reducer
// For debug 
store.subscribe(() => {
    console.log('Store state is:', store.getState())
})






