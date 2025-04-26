import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const verifyToken = (token:string) =>{
    return jwt.verify(token, JWT_SECRET);
}

export const signToken = (payload:any) =>{
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}