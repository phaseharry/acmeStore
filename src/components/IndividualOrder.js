import React from 'react'

const IndividualOrder = props => {
    const { order, products } = props
    console.log(order)
    return (
        <div>
            <p>{order.id}</p>
            <ul>       
                {   
                    products.map(product => {
                        const totalCount = order.lineItems.reduce((total, item) => {
                            if(item.productId === product.id){
                                return total + item.quantity
                            }
                            return total
                        }, 0)

                        return (
                            <li key={product.id}>{product.name} <span>{totalCount}</span></li>
                        )
                    })
                }         
            </ul>
       </div>
    )
}

export default IndividualOrder