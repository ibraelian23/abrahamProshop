import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools,actionCreators} from "redux-devtools-extension"
import {productListReducer,productDetailsReducer,productDeleteReducer,productCreateReducer,productUpdateReducer,
    productReviewCreateReducer,productTopRatedReducer,
    productAscendingReducer,productDescendingReducer,productLowestPriceReducer,productHighestPriceReducer
} from "./reducers/productReducers"
import {cartReducer} from "./reducers/cartRedudcers"
import {userLoginReducer,userRegisterReducer,userDetailsReducer,
    userUpdateProfileReducer,userListReducer,
    userDeleteReducer,userUpdateReducer,resetLink,updatePassword
} from "./reducers/userReducers"
import {orderCreatReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer,orderListReducer,orderDeliverReducer} from "./reducers/orderReducers"


const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productReviewCreate:productReviewCreateReducer,
    productTopRated:productTopRatedReducer,
    productAcending:productAscendingReducer,
    productDecending:productDescendingReducer,
    productLowestPrice:productLowestPriceReducer,
    productHighestPrice:productHighestPriceReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userReset:resetLink,
    passwordUpdate:updatePassword,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    orderCreate:orderCreatReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderDeliver:orderDeliverReducer,
    orderListMy:orderListMyReducer,
    orderList:orderListReducer,

    

})

const composeEnhancers = composeWithDevTools({ actionCreators, trace: true, traceLimit: 25 })

const cartItemsFromStorage=localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

const userInfoFromStorage=localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const shippingAddressFromStorage=localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}

const paymentMethodFromStorage=localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : null

const initialState={
    cart:{cartItems:cartItemsFromStorage,shippingAddress:shippingAddressFromStorage,paymentMethod:paymentMethodFromStorage},
    userLogin:{userInfo:userInfoFromStorage}
}

const middleware=[thunk]

const store=createStore(reducer,initialState,composeEnhancers(applyMiddleware(...middleware)))

export default store