import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {loadData} from '../reducers/Products'
import NavBar from './NavBar'
import Order from './Order'
import PastOrders from './PastOrders'

class Main extends React.Component{
    constructor(){
        super()
        this.findTotalSales = this.findTotalSales.bind(this)
    }
    componentDidMount(){
        const {loadData} = this.props
        return loadData()
    }
    findTotalSales(){
        return this.props.orders.filter(order => order.status !== 'CART')
        .reduce((total, order) => {
             const orderTotal = order.lineItems.reduce((total, item) => {
                 return total + item.quantity
             }, 0)      
             return total + orderTotal
        }, 0) 
    }
    
    render(){
       const totalItemsSold = this.findTotalSales()
       return (
       <div className='container'>
            <h4>Acme Store</h4>
            <Router>
                <div>
                    <NavBar />
                    <div className='alert alert-success'>{`${totalItemsSold} items has been sold`}</div>
                    <Route path='/cart' render={(props) => <Order {...props}/>}/>
                    <Route path='/orders' render={(props) => <PastOrders {...props}/>} />
                </div>
            </Router>
        </div>
       )
    }


}

const mapStateToProps = state => {
    const { auth, store } = state
    return {
        products: store.products,
        orders: store.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadData: () => dispatch(loadData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)