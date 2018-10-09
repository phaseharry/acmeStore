import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

//action types
const LOAD_DATA= "LOAD_DATA"
// const LOAD_PRODUCTS = "LOAD_PRODUCTS"
const LOAD_ORDERS = 'LOAD_ORDERS'
const CREATE_LINEITEM = 'CREATE_LINEITEM'
const DELETE_LINEITEM = 'DELETE_LINEITEM'
const INCREMENT_LINEITEM = 'INCREMENT_LINEITEM'
const DECREMENT_LINEITEM = 'DECREMENT_LINEITEM'
const SUBMIT_ORDER = 'SUBMIT_ORDER'

//action creators
const _loadData= (products, orders) => ({type: LOAD_DATA, products, orders})
//const _loadProducts = products => ({type: LOAD_PRODUCTS, products})
const _submitOrder = orders => ({type: SUBMIT_ORDER, orders})
const _createLineItem = lineItem => ({type: CREATE_LINEITEM, lineItem})
const _deleteLineItem = (orderId,id) => ({type:DELETE_LINEITEM, id, orderId})
const _incrementLineItem = lineItem => ({type: INCREMENT_LINEITEM, lineItem})
const _decrementLineItem = lineItem => ({type: DECREMENT_LINEITEM, lineItem})

//thunks
export const loadData = () => {
    return async dispatch => {
        const products = await axios.get('/api/products')
        const orders = await axios.get('/api/orders')
        dispatch(_loadData(products.data, orders.data))
    }
} 
/*
export const loadProducts = () => {
    return async dispatch => {
        const products = await axios.get('/api/products')
        dispatch(_loadProducts(products.data))
    }
}
*/

// export const loadOrders = () => {
//     return async dispatch => {
//         const orders = await axios.get('/api/orders')
//         dispatch(_loadOrders(orders.data))
//     }
// }

export const createLineItem = (productId, orderId) => {
    // console.log(productId, orderId)
    return async dispatch => {
        const lineItem = await axios.post(`/api/orders/${orderId}/lineItems`,{productId})
        //console.log(lineItem.data)
        dispatch(_createLineItem(lineItem.data))
    }
}

export const deleteLineItem = (orderId, id) => {
    // console.log(orderId, id)
    return async dispatch => {
        await axios.delete(`/api/orders/${orderId}/lineItems/${id}`)
        dispatch(_deleteLineItem(orderId, id))
    }   
}

export const incrementLineItem = lineItem => {
    return async dispatch => {
      lineItem.quantity += 1;
      const updatedItem = await axios.put(`/api/orders/${lineItem.orderId}/lineItems/${lineItem.id}`, { quantity : lineItem.quantity})
      dispatch(_incrementLineItem(updatedItem.data))
    }
}

export const decrementLineItem = lineItem => {
    return async dispatch => {
        lineItem.quantity -= 1;
        const updatedItem = await axios.put(`/api/orders/${lineItem.orderId}/lineItems/${lineItem.id}`, {quantity : lineItem.quantity})
        dispatch(_decrementLineItem(updatedItem.data))
    }
}

export const submitOrder = (order, history) => {
    //console.log(order)
    return async dispatch => {
        order.status = 'ORDER'
        const submitted = await axios.put(`/api/orders/${order.id}`, order);
        const orders = await axios.get('/api/orders')
        dispatch(_submitOrder(orders.data))
        history.push('/orders')
    }
}

const reducer = (state = {products: [], orders: []}, action) => {
    switch(action.type){
        case DECREMENT_LINEITEM: 
            return {...state, orders: state.orders.map(order => {
                if(order.id === action.lineItem.orderId){
                    order.lineItems.map(item => {
                        if(item.id === action.lineItem.id){
                            return action.lineItem
                        }
                        return item
                    })
                }
                return order
            })}
        case INCREMENT_LINEITEM:
            return {...state, orders: state.orders.map(order => {
                if(order.id === action.lineItem.orderId){
                    order.lineItems.map(item => {
                        if(item.id === action.lineItem.id){
                            return action.lineItem
                        }
                        return item
                    })
                }
                return order
            })}
        case DELETE_LINEITEM: 
            return {...state, orders: state.orders.map(order => {
                if(order.id === action.orderId){
                    const lineItems = order.lineItems.filter(lineItem => lineItem.id !== action.id)
                    order.lineItems = lineItems
                }
                return order
            })}
        case CREATE_LINEITEM: 
            return {...state, orders: state.orders.map(order => {
                if(order.id === action.lineItem.orderId){
                    order.lineItems.push(action.lineItem)
                }
                return order
            })}
        case SUBMIT_ORDER: 
            return {...state, orders: action.orders}
        // case LOAD_PRODUCTS: 
        //     return {...state, products: action.products}
        case LOAD_DATA: 
            return {...state, products: action.products, orders: action.orders}
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store