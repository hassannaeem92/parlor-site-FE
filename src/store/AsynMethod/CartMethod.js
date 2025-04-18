import backendValidUser from "../../api/backendVerifiedUser";
import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
} from "../Types/AuthTypes";
import { GET_USER_CART_ITEM } from "../Types/CartTypes";

// export const addItemToCart = (data) => {
//   return async (dispatch) => {
//     dispatch({ type: SET_LOADER });
//     try {
//       const response = await backendValidUser.post(`/add-item-to-cart`, data);
//       dispatch({ type: CLOSE_LOADER });

//       dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });
//       dispatch(getUserCartItem());

//       return true;
//     } catch (err) {
//       dispatch({ type: CLOSE_LOADER });
//       console.log(err);
//       dispatch({
//         type: SET_ERROR,
//         payLoad: err.response?.data?.error?.msg,
//       });
//     }
//     return false;
//   };
// };

export const removeAllCartItems = () => async (dispatch) => {
  try {
    // Assuming you have an API endpoint to clear the cart
    await axios.delete("/api/cart/clear");

    dispatch({ type: "CLEAR_CART" });
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};

// export const getUserCartItem = () => {
//   debugger
//   return async (dispatch, getState) => {
//     const { AuthReducers } = getState();

//     dispatch({ type: SET_LOADER });
//     try {
//       // const response = await backendValidUser.get(
//       //   `/get-user-cart-item/${AuthReducers.user.id}`
//       // );
//       const response = await backendValidUser.get(
//         `/get-user-cart-item`
//       );
//       dispatch({ type: CLOSE_LOADER });

//       dispatch({ type: GET_USER_CART_ITEM, payLoad: response.data });
//       return true;
//     } catch (err) {
//       dispatch({ type: CLOSE_LOADER });
//       console.log(err);
//       dispatch({
//         type: SET_ERROR,
//         payLoad: err.response?.data?.error?.msg,
//       });
//     }
//     return false;
//   };
// };

// export const removeUserCartItem = (id) => {
//   return async (dispatch) => {
//     dispatch({ type: SET_LOADER });
//     try {
//       const response = await backendValidUser.get(
//         `/remove-user-cart-item/${id}`
//       );
//       dispatch({ type: CLOSE_LOADER });

//       dispatch(getUserCartItem());

//       return true;
//     } catch (err) {
//       dispatch({ type: CLOSE_LOADER });
//       console.log(err);
//       dispatch({
//         type: SET_ERROR,
//         payLoad: err.response?.data?.error?.msg,
//       });
//     }
//     return false;
//   };
// };

// export const increaseUserCartItemQty = (id) => {
//   return async (dispatch) => {
//     dispatch({ type: SET_LOADER });
//     try {
//       const response = await backendValidUser.get(
//         `/increase-user-cart-item-qty/${id}`
//       );
//       dispatch({ type: CLOSE_LOADER });

//       dispatch(getUserCartItem());

//       return true;
//     } catch (err) {
//       dispatch({ type: CLOSE_LOADER });
//       console.log(err);
//       dispatch({
//         type: SET_ERROR,
//         payLoad: err.response?.data?.error?.msg,
//       });
//     }
//     return false;
//   };
// };

// export const decreaseUserCartItemQty = (id) => {
//   return async (dispatch) => {
//     dispatch({ type: SET_LOADER });
//     try {
//       const response = await backendValidUser.get(
//         `/decrease-user-cart-item-qty/${id}`
//       );
//       dispatch({ type: CLOSE_LOADER });

//       dispatch(getUserCartItem());

//       return true;
//     } catch (err) {
//       dispatch({ type: CLOSE_LOADER });
//       console.log(err);
//       dispatch({
//         type: SET_ERROR,
//         payLoad: err.response?.data?.error?.msg,
//       });
//     }
//     return false;
//   };
// };

const CART_STORAGE_KEY = "cartItems";

// Helper function to get cart items from localStorage
const getCartFromStorage = () => {
  return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
};

// Helper function to save cart items to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  getCartFromStorage();
};

// Add item to cart
export const addItemToCart = (deal) => {
  
  return (dispatch) => {
    let cart = getCartFromStorage();
    const existingItemIndex = cart.findIndex((item) => item.dealId === deal.dealId);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].numberOfPerson += 1; // Increment quantity if exists
      getCartFromStorage();
    } else {
      cart.push({ ...deal, numberOfPerson: 1 }); // Add new item
    }

    saveCartToStorage(cart);
    dispatch({ type: 'UPDATE_CART', payload: cart });
  };
};



// Increase item quantity
// export const increaseUserCartItemQty = (dealId) => {
//   debugger
//   return (dispatch) => {
//     // let cart = getCartFromStorage();
//     let cart = getState().cartItems || [];
//     // const item = cart.find((item) => item.dealId === dealId.dealId);
//     const updatedCart = cart.map((item) => {
//       if (item.dealId === dealId.dealId) {
//         return { ...item, numberOfPerson: (item.numberOfPerson || 1) + 1 };
//       }
//       return item;
//     });
//     // if (item) {
//     //   item.numberOfPerson += 1;
//     //   saveCartToStorage(cart);
//     //   dispatch({ type: "UPDATE_CART", payload: cart });
//     // }
//     saveCartToStorage(updatedCart); // Save updated cart to storage
//     dispatch({ type: "UPDATE_CART", payload: updatedCart });
//   };
// };



export const increaseUserCartItemQty = (deal) => {
  return (dispatch) => {
    let cart = getCartFromStorage(); // ✅ Get cart from localStorage
    const item = cart.find((item) => item.dealId === deal.dealId);

    if (item) {
      item.numberOfPerson += 1; // ✅ Increase quantity
    }

    saveCartToStorage(cart); // ✅ Save updated cart to localStorage
    dispatch({ type: "UPDATE_CART", payload: cart }); // ✅ Dispatch to Redux
  };
};



// Decrease item quantity
export const decreaseUserCartItemQty = (dealId) => {
  
  return (dispatch) => {
    let cart = getCartFromStorage();
    const itemIndex = cart.findIndex((item) => item.dealId === dealId);

    if (itemIndex !== -1) {
      if (cart[itemIndex].numberOfPerson > 1) {
        cart[itemIndex].numberOfPerson -= 1;
      } else {
        cart.splice(itemIndex, 1); // Remove item if quantity is 1
      }
      saveCartToStorage(cart);
      dispatch({ type: "UPDATE_CART", payload: cart });
    }
  };
};

// Remove all items from cart
// export const removeUserCartItem = (itemId) => {
//   return (dispatch) => {
//     localStorage.removeItem(CART_STORAGE_KEY);
//     dispatch({ type: "CLEAR_CART" });
//   };
// };

export const removeUserCartItem = (itemId) => {
  
  return (dispatch) => {
    // Step 1: Retrieve cart items from local storage
    const storedItems = localStorage.getItem(CART_STORAGE_KEY);
    const cartItems = storedItems ? JSON.parse(storedItems) : [];

    // Step 2: Filter out the item with the specified dealId
    const updatedCartItems = cartItems.filter(item => item.dealId !== itemId);

    // Step 3: Save the updated array back to local storage
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCartItems));

    // Step 4: Dispatch the action
    dispatch({ type: "UPDATE_CART", payload: updatedCartItems });
  };
};

// Get cart items
export const getUserCartItem = () => {
  return (dispatch) => {
    const cart = getCartFromStorage();
    dispatch({ type: GET_USER_CART_ITEM, payLoad: cart });
  };
};

export const clearCart = () => {
  return (dispatch) => {
    // Clear cart from localStorage
    localStorage.removeItem("cart");

    // Dispatch Redux action to clear cart from state
    dispatch({ type: "CLEAR_CART" });
  };
};
