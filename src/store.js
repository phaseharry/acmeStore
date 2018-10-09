import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

//action types
const LOAD_DATA= "LOAD_DATA"
const CREATE_LINEITEM = 'CREATE_LINEITEM'
const DELETE_LINEITEM = 'DELETE_LINEITEM'
const INCREMENT_LINEITEM = 'INCREMENT_LINEITEM'
const DECREMENT_LINEITEM = 'DECREMENT_LINEITEM'

//action creators
const _loadData= (products, orders) => ({type: LOAD_DATA, products, orders})
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
        case LOAD_DATA: 
            return {...state, products: action.products, orders: action.orders}
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store