function createApiActionConstantsForType(type='') {
    type = type.toUpperCase();
    return {
        [`GET_ALL_${type}_REQUEST`]: `GET_ALL_${type}_REQUEST`,
        [`GET_ALL_${type}_CACHE_HIT`]: `GET_ALL_${type}_CACHE_HIT`,
        [`GET_ALL_${type}_CACHE_MISS`]: `GET_ALL_${type}_CACHE_MISS`,
        [`GET_ALL_${type}_SUCCESS`]: `GET_ALL_${type}_SUCCESS`,
        [`GET_ALL_${type}_FAIL`]: `GET_ALL_${type}_FAIL`,

        [`GET_${type}_REQUEST`]: `GET_${type}_REQUEST`,
        [`GET_${type}_CACHE_HIT`]: `GET_${type}_CACHE_HIT`,
        [`GET_${type}_CACHE_MISS`]: `GET_${type}_CACHE_MISS`,
        [`GET_${type}_SUCCESS`]: `GET_${type}_SUCCESS`,
        [`GET_${type}_FAIL`]: `GET_${type}_FAIL`,

        [`ADD_${type}_REQUEST`]: `ADD_${type}_REQUEST`,
        [`ADD_${type}_SUCCESS`]: `ADD_${type}_SUCCESS`,
        [`ADD_${type}_FAIL`]: `ADD_${type}_FAIL`,

        [`UPDATE_${type}_REQUEST`]: `UPDATE_${type}_REQUEST`,
        [`UPDATE_${type}_SUCCESS`]: `UPDATE_${type}_SUCCESS`,
        [`UPDATE_${type}_FAIL`]: `UPDATE_${type}_FAIL`,

        [`DELETE_${type}_REQUEST`]: `DELETE_${type}_REQUEST`,
        [`DELETE_${type}_SUCCESS`]: `DELETE_${type}_SUCCESS`,
        [`DELETE_${type}_FAIL`]: `DELETE_${type}_FAIL`
    };
}

function createApiAction(action='', type='', promise=null, dispatch=null) {
    action = action.toUpperCase();
    type = type.toUpperCase();

    dispatch({
        type: `${action}_${type}_REQUEST`
    });

    return promise
        .then((result) => {
            dispatch({
                type: `${action}_${type}_SUCCESS`,
                payload: result
            });
        })
        .catch((rejection) => {
            dispatch({
                type: `${action}_${type}_FAIL`
            });
        });
}

export {
    createApiActionConstantsForType,
    createApiAction
};