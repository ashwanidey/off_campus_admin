import { Webinar } from "../models/Webinar.js";
import { User } from "../models/User.js";
import { Cohort } from "../models/Cohort.js";
import { Service } from "../models/Service.js";
import { Transaction } from "../models/Transaction.js";

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
                  cond: { $eq: ["$$session.status", "success"] }
                }
              }
            }
          },
          totalProductsPurchased: { $sum: { $size: "$product_purchased" } },
        }
      }
    ]);

    const webinarStats = await User.aggregate([
      {
        $match: {
          webinar_purchased: { $exists: true, $type: "array" }
        }
      },
      {
        $group: {
          _id: null,
          totalWebinarsPurchased: { $sum: { $size: "$webinar_purchased" } },
        }
      }
    ]);

    const serviceStats = await User.aggregate([
      {
        $match: {
          service_purchased: { $exists: true, $type: "array" }
        }
      },
      {
        $group: {
          _id: null,
          totalWebinarsPurchased:  {
            $sum: {
              $size: {
                $filter: {
                  input: "$service_purchased",
                  as: "service",
                  cond: { $eq: ["$$service.status", "success"] }
                }
              }
            }
          },
        }
      }
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

export const getWebinarStats = async (req,res) => {
  try {
    const webinarCount = await Webinar.aggregate([
      {
        $unwind: "$participants"
      },
      {
        $group: {
          _id: "$id",
          title: { $first: "$title" },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(webinarCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getCohortStats = async (req,res) => {
  try {
    const cohortCount = await Cohort.aggregate([
      {
        $unwind: "$participants"
      },
      {
        $group: {
          _id: "$id",
          title: { $first: "$title" },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(cohortCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getServiceStats = async (req,res) => {
  try {
    const serviceCount = await Service.aggregate([
      {
        $unwind: "$booked_services"
      },
      {
        $group: {
          _id: "$serviceid",
          title: { $first: "$title" },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(serviceCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getTotalSale = async (req,res) => {
  try {
    const totalSale = await Transaction.aggregate([
      {
        $match: {
          status: "SUCCESS"
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ])

    const subItemsSale = await Transaction.aggregate([
       {
        $match: {
          status: "SUCCESS"
        }
      },
      {
        $group: {
          _id:"$type",
          totalSale: { $sum: "$amount" } // Sum the 'amount' field
        }
      }
    ]);
    console.log(totalSale);


    const data = {
      totalSale: totalSale[0]?.totalAmount || 0,
      subItems : subItemsSale
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
