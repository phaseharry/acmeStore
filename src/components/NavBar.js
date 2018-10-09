import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom' 

class NavBar extends React.Component{
    constructor(){
        super();
        this.findOrder = this.findOrder.bind(this)
    }
    findOrder(){
        return this.props.orders.find(order => order.status === 'CART') || {}
    }
    render(){
        const { orders } = this.props
        const cart = this.findOrder() || {} 
        const lineItemsInCart = cart.lineItems || []
        return (
            <ul className='nav nav-tabs'>
                <li className='nav-item'>
                    <Link to='/' className='nav-link'>Home</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/cart' className='nav-link'>Cart ({
                        lineItemsInCart.reduce((total, item) => {
                            return total + item.quantity
                        }, 0)
                    })</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/orders' className='nav-link'>Orders ({orders.length - 1})</Link>
                </li>
            </ul>
        )


    }



}

const mapStateToProps = state => {
    return {
        orders: state.orders,
    }
}

export default connect(mapStateToProps, null)(NavBar)