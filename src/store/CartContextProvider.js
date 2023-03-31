import CartContext from "./cart-context";
import React, {useReducer} from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD_ITEM') {
        let isSameItems = false;
        let updatedItems;
        updatedItems = state.items.map((item) => {
            if(item.name === action.item.name) {
                isSameItems = true;
                item.amount += action.item.amount;
            }
            return item;
        });

        if(!isSameItems) {
            updatedItems = state.items.concat(action.item);
        }
       
       const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
       return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
       }
    } 

    if(action.type === 'REMOVE_ITEM') {
        let isLastItem = true;
        let updatedItems;
        updatedItems = state.items.map((item) => {
            if(item.id === action.id && item.amount > 1) {
                isLastItem = false;
                item.amount --;
            }
            return item;
        }); 
        
        if(isLastItem) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        }

        const updatedTotalAmount = state.totalAmount - action.price;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
       }
    }

    if(action.type === 'CLEAR_BASKET') {
        return defaultCartState;
    }

    return defaultCartState
}

const CartContextProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = item => {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item: item
        });
    };
    const removeItemHandler = (id, price) => {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id: id,
            price: price
        });
    };

    const clearBasketHandler = () => {
        dispatchCartAction({type: 'CLEAR_BASKET'});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clear: clearBasketHandler,
    }

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartContextProvider;