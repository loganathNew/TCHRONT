export default (state, action) => {
    switch (action.type) {
        case "hamActivation":
            return {
                ...state,
                hamActive: action.payload
            };
        case "statusAction":
            return {
                ...state,
                status: action.payload
            };
        case "authAction":
            return {
                ...state,
                auth: action.payload
            };
        default:
            return state;
    }
};
