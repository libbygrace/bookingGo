export default (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH_ACTION':
            return {
                result: action.payload
            };
        default:
            return state
    }
}