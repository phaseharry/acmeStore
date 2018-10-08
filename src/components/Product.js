import React from 'react'
import { connect } from 'react-redux'

class Product extends React.Component{

    render(){
        const { product, orderId, lineItems, createLineItem, deleteLineItem} = this.props
        const lastItem = lineItems[lineItems.length - 1] || {}
        return (
                <div>
                    <span>{product.name}</span>
                    <p>{`${lineItems.length} ordered`}</p>
                    {/* <img src={product.imgUrl}></img> */}
                    
                    <button onClick={() => createLineItem(product.id, orderId)}>Add</button>
                    <button type='button' disabled={lineItems.length > 0? false : true} onClick={() => deleteLineItem(orderId, lastItem.id)}>Remove</button>
                </div>
            )
        }
}




export default Product