import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,

        })
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline) //colors added to console by npm i colors & importing colors in bd.js
    } catch (error) {
        console.error(`Error: ${error.message}`.red.bold)
        process.exit(1)
    }
}

export default connectDB