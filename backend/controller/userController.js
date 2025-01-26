import { Expert } from "../models/Experts.js";
import { Service } from "../models/Service.js";
import { Session } from "../models/Session.js";
import { User } from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    users.reverse();
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
    const expert = await Expert.findOne({id:101});
    expert.booked_dates.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));
    expert.booked_dates = expert.booked_dates.filter(date => date.timestamp > new Date() && date.email !== "ashwanidey2904@gmail.com");
    const sessions = await Session.find({});

    const data = expert.booked_dates.map(date => {
      return {
        ...date._doc,title: sessions.find(session => session.sessionid === (date.item_id ? date.item_id : 101))._doc.title
      }
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getResumeReview = async (req, res) => {
  try {
    const review = await Service.findOne({serviceid:101});

    res.status(200).json(review.booked_services);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
