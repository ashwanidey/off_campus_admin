import { Webinar } from "../models/Webinar.js";
import { User } from "../models/User.js";
import { Cohort } from "../models/Cohort.js";
import { Service } from "../models/Service.js";
import { Transaction } from "../models/Transaction.js";
import { Product } from "../models/Products.js";
import { Course } from "../models/Courses.js";

export const getBasicReports = async (req, res) => {
  try {
    const [stats] = await User.aggregate([
      {
        $group: {
          _id: null,
          totalCoursesPurchased: { $sum: { $size: "$course_purchased" } },
          totalSessionPurchased: {
            $sum: {
              $size: {
                $filter: {
                  input: "$session_purchased",
                  as: "session",
                  cond: { $eq: ["$$session.status", "success"] },
                },
              },
            },
          },
          totalProductsPurchased: { $sum: { $size: "$product_purchased" } },
        },
      },
    ]);

    const webinarStats = await User.aggregate([
      {
        $match: {
          webinar_purchased: { $exists: true, $type: "array" },
        },
      },
      {
        $group: {
          _id: null,
          totalWebinarsPurchased: { $sum: { $size: "$webinar_purchased" } },
        },
      },
    ]);

    const serviceStats = await User.aggregate([
      {
        $match: {
          service_purchased: { $exists: true, $type: "array" },
        },
      },
      {
        $group: {
          _id: null,
          totalWebinarsPurchased: {
            $sum: {
              $size: {
                $filter: {
                  input: "$service_purchased",
                  as: "service",
                  cond: { $eq: ["$$service.status", "success"] },
                },
              },
            },
          },
        },
      },
    ]);

    const userCount = await User.estimatedDocumentCount();

    const data = {
      totalUsers: userCount,
      coursesPurchased: stats?.totalCoursesPurchased || 0,
      sessionsPurchased: stats?.totalSessionPurchased || 0,
      webinarPurchased: webinarStats[0].totalWebinarsPurchased || 0,
      productsPurchased: stats?.totalProductsPurchased || 0,
      servicesPurchased: serviceStats[0].totalWebinarsPurchased || 0,
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWebinarStats = async (req, res) => {
  try {
    const webinarCount = await Webinar.aggregate([
      {
        $unwind: "$participants",
      },
      {
        $group: {
          _id: "$id",
          title: { $first: "$title" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(webinarCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCohortStats = async (req, res) => {
  try {
    const cohortCount = await Cohort.aggregate([
      {
        $unwind: "$participants",
      },
      {
        $group: {
          _id: "$id",
          title: { $first: "$title" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(cohortCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceStats = async (req, res) => {
  try {
    const serviceCount = await Service.aggregate([
      {
        $unwind: "$booked_services",
      },
      {
        $group: {
          _id: "$serviceid",
          title: { $first: "$title" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(serviceCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTotalSale = async (req, res) => {
  try {
    const totalSale = await Transaction.aggregate([
      {
        $match: {
          status: "SUCCESS",
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const subItemsSale = await Transaction.aggregate([
      {
        $match: {
          status: "SUCCESS",
        },
      },
      {
        $group: {
          _id: "$type",
          totalSale: { $sum: "$amount" }, // Sum the 'amount' field
        },
      },
    ]);
    console.log(totalSale);

    const data = {
      totalSale: totalSale[0]?.totalAmount || 0,
      subItems: subItemsSale,
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    const product = await Product.find({}, { productid: 1, title: 1, _id: 0 });
    const productMap = product.reduce((map, product) => {
      map[product.productid] = product.title;
      return map;
    }, {});

    const cohort = await Cohort.find({}, { id: 1, title: 1, _id: 0 });
    const cohortMap = cohort.reduce((map, cohort) => {
      map[cohort.id] = cohort.title;
      return map;
    }, {});

    const course = await Course.find({}, { courseid: 1, title: 1, _id: 0 });
    const courseMap = course.reduce((map, course) => {
      map[course.courseid] = course.title;
      return map;
    }, {});

    const service = await Service.find({}, { serviceid: 1, title: 1, _id: 0 });
    const serviceMap = service.reduce((map, service) => {
      map[service.serviceid] = service.title;
      return map;
    }, {});

    const webinar = await Webinar.find({}, { id: 1, title: 1, _id: 0 });
    const webinarMap = webinar.reduce((map, webinar) => {
      map[webinar.id] = webinar.title;
      return map;
    }, {});

    console.log("Product Map:", productMap);

    const filteredUsers = users.map((user) => {
      return {
        user_id: user.user_id,
        phone_number: user.phone_number,
        name: user.name,
        email: user.email,
        phone: user.phone,
        // course_purchased: user.course_purchased.length,
        course_purchased: {
          count: user.course_purchased.length,
          items: user.course_purchased.map((course) => ({
            id: course.course_id,
            name: courseMap[course.course_id] || "Unknown Course",
            purchased_date: new Date(course.purchased_date).toLocaleString(
              "en-IN",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
            order_id: course.order_id,
          })),
        },
        session_purchased: user.session_purchased
          .filter((session) => session.status === "success")
          .map((session) => ({
            // id: session.session_id,
            // name: session.session_name || "Unknown Session",
            purchased_date: new Date(session.purchased_date).toLocaleString(
              "en-IN",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
            booked_date: new Date(session.booked_date).toLocaleString("en-IN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }),
            order_id: session.order_id,
          })),
        // product_purchased: user.product_purchased.length,
        product_purchased: {
          count: user.product_purchased.length,
          items: user.product_purchased.map((product) => ({
            id: product.product_id,
            name: productMap[product.product_id] || "Unknown Product",
            purchased_date: new Date(product.purchased_date).toLocaleString(
              "en-IN",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
            order_id: product.order_id,
          })),
        },

        service_purchased: user.service_purchased
          .filter((session) => session.status === "success")
          .map((service) => ({
            id: service.service_id,
            name: serviceMap[service.item_id] || "Unknown Service",
            purchased_date: new Date(service.purchased_date).toLocaleString(
              "en-IN",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
            order_id: service.order_id,
          })),
        // webinar_purchased: user.webinar_purchased.length,

        webinar_purchased: {
          count: user.webinar_purchased.length,
          items: user.webinar_purchased.map((webinar) => ({
            id: webinar.webinar_id,
            name: webinarMap[webinar.webinar_id] || "Unknown Webinar",
            purchased_date: new Date(webinar.purchased_date).toLocaleString(
              "en-IN",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
            order_id: webinar.order_id,
          })),
        },
        // cohort_purchased: user.cohort_purchased.length,
        cohort_purchased: {
          count: user.cohort_purchased.length,
          items: user.cohort_purchased.map((cohort) => ({
            id: cohort.webinar_id,
            name: cohortMap[cohort.webinar_id] || "Unknown Cohort",
            purchased_date: new Date(cohort.purchased_date).toLocaleString(
              "en-IN",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
            order_id: cohort.order_id,
          })),
        },
      };
    });
    filteredUsers.reverse();

    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
