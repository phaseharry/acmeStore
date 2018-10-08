import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

//action types
const LOAD_DATA= "LOAD_DATA"
const CREATE_LINEITEM = 'CREATE_LINEITEM'
const DELETE_LINEITEM = 'DELETE_LINEITEM'

//action creators
const _loadData= (products, orders) => ({type: LOAD_DATA, products, orders})
const _createLineItem = lineItem => ({type: CREATE_LINEITEM, lineItem})
const _deleteLineItem = (orderId,id) => ({type:DELETE_LINEITEM, id, orderId})

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

const reducer = (state = {products: [], orders: []}, action) => {
    switch(action.type){
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