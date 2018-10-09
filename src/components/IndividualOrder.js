import React from 'react'

const IndividualOrder = props => {
    const { order, products } = props
    console.log(order)
    return (
        <div className='card'>
            <p>Order# {order.id}</p>
            <div>
                <ul className='list-group'>       
                    {   
                        products.map(product => {
                            const totalCount = order.lineItems.reduce((total, item) => {
                                if(item.productId === product.id){
                                    return total + item.quantity
                                }
                                return total
                            }, 0)

                            return (
                                <li className='list-group-item' key={product.id}>{product.name} <span className='badge badge-primary productCount'>{totalCount}</span></li>
                            )
                        })
                    }         
                </ul>
            </div>
       </div>
    )
}

export default IndividualOrder