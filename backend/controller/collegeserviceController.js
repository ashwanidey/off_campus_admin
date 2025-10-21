import { CollegeService } from "../models/CollegeService.js";

/**
 * Get all college services with user details
 * Filters to show only first 3 services
 * Adds price range based on quotedFigure ± 2500
 */
export const getAllCollegeServices = async (req, res) => {
  try {
    const excludeEmails = [
      "ashishran0111111@gmail.com",
      "ashish.ranjan.22cse@bmu.edu.in",
      "admin-logistics@vitacoco.com",
    ];
    // Fetch first 3 services, sorted by most recent user submission
    const services = await CollegeService.find({
      college_serviceId: { $in: [1, 2, 3] },
    })
      .sort({ updatedAt: -1 })
      .lean();

    if (!services || services.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No college services found",
      });
    }

    // Process each service to add price ranges and format data
    const processedServices = services.map((service) => {
      const filteredUsers = service.users.filter(
        (user) => !excludeEmails.includes(user.email)
      );
      // Process users array to add price range
      const processedUsers = filteredUsers.map((user) => ({
        ...user,
        priceRange: {
          min: user.quotedFigure - 2500,
          max: user.quotedFigure + 2500,
          quoted: user.quotedFigure,
        },
      }));

      // Sort users by submission date (most recent first)
      processedUsers.sort(
        (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
      );

      return {
        ...service,
        users: processedUsers,
        userCount: processedUsers.length,
        latestSubmission:
          processedUsers.length > 0 ? processedUsers[0].submittedAt : null,
      };
    });

    // Sort services by latest submission date
    processedServices.sort((a, b) => {
      if (!a.latestSubmission) return 1;
      if (!b.latestSubmission) return -1;
      return new Date(b.latestSubmission) - new Date(a.latestSubmission);
    });

    return res.status(200).json({
      success: true,
      count: processedServices.length,
      data: processedServices,
    });
  } catch (error) {
    console.error("Error fetching college services:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching college services",
      error: error.message,
    });
  }
};

/**
 * Get single service by ID with user details
 */
export const getCollegeServiceById = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await CollegeService.findOne({
      college_serviceId: parseInt(serviceId),
    }).lean();

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Add price range to each user
    const processedUsers = service.users.map((user) => ({
      ...user,
      priceRange: {
        min: user.quotedFigure - 2500,
        max: user.quotedFigure + 2500,
        quoted: user.quotedFigure,
      },
    }));

    // Sort by most recent
    processedUsers.sort(
      (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
    );

    return res.status(200).json({
      success: true,
      data: {
        ...service,
        users: processedUsers,
      },
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching service",
      error: error.message,
    });
  }
};
