import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './Modals/userModal.js'
import Product from './Modals/productModal.js'
import Order from './Modals/orderModal.js'
import connectDB from './config/db.js'
import colors from 'colors'



dotenv.config ()
connectDB ()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return {...product, user:adminUser}
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {  //process.argv[2] ----> this mean second argument written in terminal ex: npm run data:destroy -d ---> -d is argv[2]
    destroyData()
} else {
    importData()
}
