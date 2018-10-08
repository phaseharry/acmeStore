import React from 'react'
import { connect } from 'react-redux'
import Product from './Product'
import { createLineItem, deleteLineItem } from '../store'

class Order extends React.Component{
    constructor(){
        super()
        this.findCart = this.findCart.bind(this)
    }
    findCart(){
        return this.props.orders.find(order => order.status === 'CART')
    }

    render(){
        const {products, createLineItem, deleteLineItem } = this.props
        const cart = this.findCart() || {}
        const lineItems = cart.lineItems? cart.lineItems : []
        
        return (
            <div>
                {products.map(product => {
                    const currentProductCount = lineItems.filter(lineItem => lineItem.productId === product.id)
                    return <Product key={product.id} product={product} createLineItem={createLineItem} deleteLineItem={deleteLineItem} orderId={cart.id} lineItems={currentProductCount}/>
                })}
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
        deleteLineItem : (orderId, id) => dispatch(deleteLineItem(orderId, id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)