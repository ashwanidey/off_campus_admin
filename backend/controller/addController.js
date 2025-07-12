import { Course } from "../models/Courses.js";
import { User } from "../models/User.js";

//THE ONLY FAULT THAT I BELIEVE IS THAT IF USER HAS MULTIPLE COURSES BOUGHT, THE LATEST COURSE WILL BE SHOWN TO THE ADMIN AND THE ADMIN CAN
//PERFORM ACTIONS ON THAT only.

export const getUser = async (req, res) => {
  try {
    console.log(req.body);
    const emailid = req.body.email;
    const courseid = parseInt(req.body.courseid);
    console.log(emailid);
    console.log(courseid);
    const findUser = await User.findOne({ email: emailid });
    const course = await Course.findOne({ courseid: courseid });
    console.log("user", findUser);
    console.log("course", course);
    if (!findUser) {
      return res
        .status(200)
        .json({ message: "User Does Not Exist in the Database" });
    }
    console.log("length: ", findUser.course_purchased.length);
    if (findUser.course_purchased.length > 0) {
      console.log("yes i am here", courseid);
      const coursePurchased = findUser.course_purchased
        .filter((course) => course.course_id === courseid)
        .pop(); // Gets the last element (most recently added)
      if (coursePurchased === null || coursePurchased === undefined) {
        return res.status(200).json({
          message: `NO the user has not purchased ${course.title}`,
          userEmail: emailid,
        });
      }
      // (course) => course.course_id === courseid();

      console.log("coursepurchased", coursePurchased);

      console.log("whatsapp", coursePurchased.is_whatsapp);

      return res.status(200).json({
        message: `YES the user has purchased ${course.title}`,
        userEmail: emailid,
        courseTitle: coursePurchased.course_title,
        whatsappStatus: coursePurchased.is_whatsapp ? "Yes" : "No",
        bought_on: coursePurchased.purchased_date,
        ...(coursePurchased.expiry_date > Date.now()
          ? { expires_on: coursePurchased.expiry_date }
          : { expired_on: coursePurchased.expiry_date }),
      });
    } else {
      return res.status(200).json({
        message: `NO the user has not purchased any course any time`,
        userEmail: emailid,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const insertCourseIntoUser = async (req, res) => {
  try {
    const email = req.body.email;
    const courseid = req.body.courseid;
    const orderId = req.body.orderId;
    const user = await User.findOne({ email: email });
    const course = await Course.findOne({ courseid: courseid });
    const course_purchased = {
      course_id: course.courseid,
      expiry_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      course_title: course.title,
      order_id: orderId,
    };
    user.course_purchased.push(course_purchased);
    await user.save();
    return res
      .status(200)
      .json({ message: `Course Added into ${email} successfully` });
  } catch (err) {
    console.error("Error inserting course into user:", err);
  }
};

export const extendCourse = async (req, res) => {
  try {
    const emailid = req.body.email;
    const courseTitle = req.body.coursetitle;
    const extendDays = req.body.extendDays;
    const courseid = req.body.courseid;
    console.log(typeof extendDays);
    console.log("extenddays: ", extendDays);
    const userFound = await User.findOne({ email: emailid });

    const correctCourse = userFound.course_purchased
      .filter((course) => course.course_id === courseid)
      .pop();

    const correctIndex = userFound.course_purchased.findIndex(
      (course) => course === correctCourse
    );

    const currentExpiry = userFound.course_purchased[correctIndex].expiry_date;
    console.log("currentexpiry", currentExpiry);

    const newExpiry = new Date(
      Date.now() + extendDays * 24 * 60 * 60 * 1000
    );
    console.log("newexpiry", newExpiry);
    userFound.course_purchased[correctIndex].expiry_date =
      newExpiry.toISOString();
    await userFound.save();
    // console.log("final", userFound.course_purchased[0].expiry_date);
    return res.status(200).json({
      message: `${extendDays} days have been extended for ${emailid} for the course ${courseTitle}`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to extend days" });
  }
};
