import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {loadData} from '../store'
import NavBar from './NavBar'
import Order from './Order'

class Main extends React.Component{
    componentDidMount(){
        const {loadData} = this.props
        return loadData()
    }
    
    render(){
       return (
       <div>
            <h4>Acme Store</h4>
            <Router>
                <div>
                    <NavBar />
                    <Route exact path='/cart' render={(props) => <Order {...props}/>}/>
                </div>
            </Router>
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
        loadData: () => dispatch(loadData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)