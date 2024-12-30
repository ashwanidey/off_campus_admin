import { Session } from "../models/Session.js";
import { User } from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOne({user_id:id});
    user.session_purchased = user.session_purchased.filter(session => session.date >= new Date() && session.status === 'success');
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


export const getSession = async (req, res) => {
 
  try {
    const session = await Session.findOne({sessionid:101});
    res.status(200).json(session.booked_dates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}