const Sequelize = require('sequelize')
const connection = new Sequelize(process.env.DATABASE_URL, {
    logging: false
})

const Product = connection.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    imgUrl: {
        type: Sequelize.TEXT
    }
});

const Order = connection.define('order', {
    id: {
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    status: {
        type: Sequelize.ENUM('CART', 'ORDER'),
        allowNull: false,
        defaultValue: 'CART'
    }
})

const LineItem = connection.define('lineItem', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
})

Order.hasMany(LineItem)
LineItem.belongsTo(Order)

Product.hasMany(LineItem)
LineItem.belongsTo(Product)

const syncAndSeed = () => {
    return connection.sync({force: true})
    .then(() => {
        return Promise.all([
            Product.create({
                name: 'Iphone Xs',
                imgUrl: 'https://www.shop.bt.com/images/product/uni2/DigitalContent/ds/DSKF_29061ACC-3F77-4FBF-8423-AFB6E06432A1_large.jpg'
            }),
            Product.create({
                name: 'Google Pixel 3',
                imgUrl: 'https://tech.froodl.com/wp-content/uploads/2018/08/57550/google-investigating-claims-of-pixel-2-xl-sluggish-performance.jpg'
            }),
            Product.create({
                name: 'Samsung Note 9',
                imgUrl: 'data:image/jpeg;base64,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'
            }),
            Product.create({
                name: 'Huawei P20 Pro',
                 imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGHAztkkoXC93LMNU9syd_cmUSkS3bpN213nks-nlu1cDIivs-'
            })
        ])
        .then(([iPhone, Pixel, Samsung, P20]) => {
            return Order.create({status: 'CART'})
            .then( order => {
                return Promise.all([
                    LineItem.create({ productId: iPhone.id, orderId: order.id}),
                    LineItem.create({ productId: Pixel.id, orderId: order.id})
                ])
            })
        })
    })

}

module.exports = {
    syncAndSeed,
    models: {
        Product,
        Order,
        LineItem
    }
}