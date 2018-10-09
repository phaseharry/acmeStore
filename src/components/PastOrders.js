import React from 'react'
import { connect } from 'react-redux'
import IndividualOrder from './IndividualOrder'

class PastOrders extends React.Component{
    render(){
        const { orders, products } = this.props
        const pastOrders = orders.filter(order => order.status !== 'CART')
        return (
            <div>
                <h4>Past Orders</h4>
                {pastOrders.map(order => {
                    return <IndividualOrder key={order.id} order={order} products={products} />
                })}
            </div>

        )
    }



}

const mapStateToProps = state => {
    return {
        orders: state.orders,
        products: state.products
    }
}

export default connect(mapStateToProps, null)(PastOrders)