import jwt from 'jsonwebtoken';


export const checkUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Authorization header is missing' });

  const decode = jwt.decode(token, 'secret');
  if (!decode) return res.status(401).json({ message: 'Invalid or expired token' });


  req.userId = decode.id;
  req.isAdmin = decode.isAdmin;
  next();
}


export const adminCheck = (req, res, next) => {

  if (!req.isAdmin) return res.status(401).json({ message: 'Access denied. Admins only.' });
  next();
}