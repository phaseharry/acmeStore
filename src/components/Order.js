import React from 'react'
import { connect } from 'react-redux'
import Product from './Product'
import { createLineItem, deleteLineItem, incrementLineItem, decrementLineItem, submitOrder } from '../store'

class Order extends React.Component{
    constructor(){
        super()
        this.findCart = this.findCart.bind(this)
    }
    findCart(){
        return this.props.orders.find(order => order.status === 'CART')
    }
    render(){
        const {products, createLineItem, deleteLineItem, incrementLineItem, decrementLineItem, submitOrder, history} = this.props
        const cart = this.findCart() || {}
        console.log(cart)
        const lineItems = cart.lineItems? cart.lineItems : []
        // console.log(lineItems)
        return (
            <div>
                <h4>Products</h4>
                <div className='flexing'>
                    {products.map(product => {
                        //console.log(product)
                        const currentLineItem = lineItems.find(lineItem => {
                            //console.log(lineItem)
                            return lineItem.productId === product.id
                        }) || {}
                    // console.log(currentLineItem)
                        return <Product key={product.id} product={product} createLineItem={createLineItem} deleteLineItem={deleteLineItem} increment={incrementLineItem} decrement={decrementLineItem} orderId={cart.id} lineItem={currentLineItem}/>
                    })}
                </div>
                <button className='btn btn-primary' id='submitButton' type='button' onClick={() => submitOrder(cart, history)}>Submit Order</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.products,
        orders: state.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createLineItem : (productId, orderId) => dispatch(createLineItem(productId, orderId)),
        deleteLineItem : (orderId, id) => dispatch(deleteLineItem(orderId, id)),
        incrementLineItem : lineItem => dispatch(incrementLineItem(lineItem)),
        decrementLineItem: lineItem => dispatch(decrementLineItem(lineItem)),
        submitOrder: (order, history) => dispatch(submitOrder(order, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)