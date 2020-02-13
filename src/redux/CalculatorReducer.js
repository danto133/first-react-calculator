export const initialState = {
    isShowHistory: false
}

const CalculatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_SHOW_HISTORY': {
            const updateState = {...state}
            return { ...state, isShowHistory: !updateState.isShowHistory };
        }
        default:
            return state;
    }

}

export default CalculatorReducer;