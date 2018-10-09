import React from 'react'
import { connect } from 'react-redux'

class Product extends React.Component{

    render(){
        const { product, orderId, lineItem, createLineItem, deleteLineItem, increment, decrement} = this.props
        const numberInCart = lineItem.quantity || 0
        // console.log(lineItem)
        return (
                <div>
                    <span>{product.name}</span>
                    <p>{`${numberInCart} ordered`}</p>
                    {/* <img src={product.imgUrl}></img> */}
                    
                    <button onClick={numberInCart < 1 ? () => createLineItem(product.id, orderId) : () => increment(lineItem)}>Add</button>
                    <button type='button' disabled={numberInCart < 1?  true : false} onClick={numberInCart > 1? () => decrement(lineItem) : () => deleteLineItem(orderId, lineItem.id)}>Remove</button>
                </div>
            )
        }
}




export default Product