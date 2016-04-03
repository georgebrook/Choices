export const addItemToStore = (value, element, id) => {
    return {
        type: 'ADD_ITEM',
        value: value,
        element: element,
        id: id
    }
};

export const removeItemFromStore = (id) => {
    return {
        type: 'REMOVE_ITEM',
        id: id
    }
};

export const selectItemFromStore = (id, value) => {
    return {
        type: 'SELECT_ITEM',
        id: id,
        value: value
    }
};