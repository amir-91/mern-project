import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return  jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:"30d" //token will be expired in 30days
    })
}

export default generateToken