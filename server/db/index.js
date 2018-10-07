const Sequelize = require('sequelize')
const connection = new Sequelize(process.env.DATABASE_URL)

const Product = connection.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
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

const LineItem = connection.define('lineitem', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
})

Order.hasMany(LineItem)
LineItem.belongsTo(Order)

const syncAndSeed = () => {
    return connection.sync({force: true})
    .then(() => {
        return Promise.all([
            Product.create({
                name: 'Iphone Xs'
            }),
            Product.create({
                name: 'Google Pixel 3'
            }),
            Product.create({
                name: 'Samsung Note 9'
            }),
            Product.create({
                name: 'Huawei P20 Pro'
            })
        ])
       
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