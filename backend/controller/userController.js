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
  const { id } = req.params;
  try {
    const user = await User.findOne({user_id:id});
    user.session_purchased = user.session_purchased.filter(session => session.status === 'success');
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


export const getSession = async (req, res) => {
 
  try {
    const session = await Session.findOne({sessionid:101});
    session.booked_dates.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));
    session.booked_dates = session.booked_dates.filter(date => date.timestamp > new Date() && date.email !== "ashwanidey2904@gmail.com");
    res.status(200).json(session.booked_dates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}