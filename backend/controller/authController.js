import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Expert } from '../models/Experts.js';
dotenv.config();

export const login = async (req, res) => {
    const { password } = req.body;
    const expert = await Expert.findOne({ id: 101 });

    if (expert && expert.password === password) {
        const data = {
            email: expert.email,
            isAdmin: true
        };

        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });

       

        return res.json({ message: 'Login successful' ,token: token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
};



export const verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ message: "Token is valid", user: decoded });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
