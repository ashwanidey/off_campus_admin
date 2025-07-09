import axios from "axios";
import { host } from "../../utils/api";
import { useEffect, useState } from "react";
import {
  Search,
  User,
  Calendar,
  DollarSign,
  Book,
  Mail,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Clock,
  RefreshCw,
} from "lucide-react";

const AddUserIntoCourse = () => {
  const [email, setEmail] = useState("");
  const [courseDropdown, setCourseDropdown] = useState("");
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [aboutUser, setAboutUser] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [extendDuration, setExtendDuration] = useState("1"); // Default 30 days

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/users/get-courses`);
        setData(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchData();
  }, []);

  // Clear form data when inputs change
  useEffect(() => {
    setAboutUser({});
    setFormSubmitted(false);
    setErrors({});
  }, [email, courseDropdown]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Course validation
    if (!courseDropdown) {
      newErrors.course = "Please select a course";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Date formatting function
  const formatDate = (date) => {
    const validDate = new Date(date.trim());
    return isNaN(validDate.getTime())
      ? "Invalid date"
      : validDate.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const courseToBeSent = data.find(
      (course) => course.title === courseDropdown
    );

    try {
      const response = await axios.post(`${host}/add/get-user`, {
        email: email,
        courseid: courseToBeSent.courseid,
      });
      setAboutUser(response.data);
      setFormSubmitted(true);
    } catch (error) {
      console.error("An error occurred: ", error);
      setErrors({ submit: "Failed to fetch user data. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    setCourseDropdown(value);

    // Clear course error when user selects a course
    if (value && errors.course) {
      setErrors((prev) => ({ ...prev, course: "" }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    // Clear email error when user types
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const submitButton = async () => {
    setSubmitLoading(true);
    try {
      const courseToBeSent = data.find(
        (course) => course.title === courseDropdown
      );

      const userStatus = getUserStatusMessage();
      let response;

      if (userStatus === "purchased") {
        // Extend course endpoint
        response = await axios.post(`${host}/add/extend-course`, {
          email: email,
          coursetitle: courseToBeSent.title,
          courseid: courseToBeSent.courseid,
          extendDays: parseInt(extendDuration),
        });
      } else {
        // Give access endpoint (existing)
        const orderId =
          Math.floor(Math.random() * 9000000000000) + 1000000000000;
        response = await axios.post(`${host}/add/add-into-course`, {
          email: email,
          courseid: courseToBeSent.courseid,
          orderId: orderId,
        });
      }

      alert(response.data.message);
      setShowConfirmModal(false);

      // Refresh user data after successful submission
      const userResponse = await axios.post(`${host}/add/get-user`, {
        email: email,
        courseid: courseToBeSent.courseid,
      });
      setAboutUser(userResponse.data);
    } catch (error) {
      console.error("There has been an error: ", error);
      const errorMessage =
        getUserStatusMessage() === "purchased"
          ? "Failed to extend course. Please try again."
          : "Failed to provide access. Please try again.";
      alert(errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };

  const getUserStatusMessage = () => {
    if (aboutUser?.message?.toLowerCase().includes("not exist")) {
      return "user-not-found";
    } else if (
      aboutUser?.message?.toLowerCase().includes("yes") ||
      aboutUser?.message?.toLowerCase().includes("bought")
    ) {
      return "purchased";
    } else {
      return "not-purchased";
    }
  };

  const getButtonText = () => {
    const status = getUserStatusMessage();
    if (status === "purchased") {
      return "Extend Course";
    }
    return "Give Access";
  };

  const renderUserNotFound = () => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        User Not Found
      </h3>
      <p className="text-red-600">
        The user does not exist in the database. Please ask the user to login
        first.
      </p>
    </div>
  );

  const renderExtendOptions = () => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <label className="block text-sm font-medium text-blue-900 mb-2">
        Extension Duration
      </label>
      <input
        value={extendDuration}
        onChange={(e) => setExtendDuration(e.target.value)}
        className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <p className="text-sm text-blue-600 mt-2">
        The course will be extended by {extendDuration} days from the current
        expiration date.
      </p>
    </div>
  );

  const renderUserInfo = () => {
    const status = getUserStatusMessage();

    if (status === "user-not-found") {
      return renderUserNotFound();
    }

    const isPurchased = status === "purchased";

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <div
            className={`p-2 rounded-full mr-3 ${
              isPurchased ? "bg-green-100" : "bg-blue-100"
            }`}
          >
            {isPurchased ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <User className="h-6 w-6 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              User Details
            </h3>
            <p className="text-sm text-gray-600">{email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Book className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Course Status
              </span>
            </div>
            <p className="text-gray-900">{aboutUser?.message}</p>
          </div>

          {aboutUser?.bought_on && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Purchased On
                </span>
              </div>
              <p className="text-gray-900">{formatDate(aboutUser.bought_on)}</p>
            </div>
          )}

          {(aboutUser?.expired_on || aboutUser?.expires_on) && (
            <div className="bg-gray-50 p-4 rounded-lg">
              {aboutUser?.expired_on ? (
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />

                  <span className="text-sm font-medium text-red-700">
                    Expired On
                  </span>
                </div>
              ) : (
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />

                  <span className="text-sm font-medium text-gray-700">
                    Expires On
                  </span>
                </div>
              )}
              <p className="text-gray-900">
                {aboutUser?.expired_on
                  ? formatDate(aboutUser.expired_on)
                  : aboutUser?.expires_on
                  ? formatDate(aboutUser.expires_on)
                  : "No expiration date"}
              </p>
            </div>
          )}

          {aboutUser?.whatsappStatus && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Mail className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  WhatsApp Status
                </span>
              </div>
              <p className="text-gray-900">{aboutUser.whatsappStatus}</p>
            </div>
          )}
        </div>

        {/* Show extend options only for purchased courses */}
        {isPurchased && renderExtendOptions()}

        {status !== "user-not-found" && (
          <button
            onClick={() => setShowConfirmModal(true)}
            disabled={submitLoading}
            className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isPurchased
                ? "bg-orange-600 hover:bg-orange-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {submitLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                {isPurchased ? (
                  <RefreshCw className="h-4 w-4 mr-2" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                {getButtonText()}
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Course Access Management
        </h1>

        <div onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              User Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="Enter user email address"
                value={email}
                onChange={handleEmailChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.email
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="course"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Course
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Book className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="course"
                value={courseDropdown}
                onChange={handleOnChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors appearance-none  ${
                  errors.course
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="">Select a course</option>
                {data.map((course) => (
                  <option value={course.title} key={course.courseid}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
            {errors.course && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.course}
              </p>
            )}
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.submit}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search User
              </>
            )}
          </button>
        </div>
      </div>

      {formSubmitted && aboutUser && (
        <div className="mb-6">{renderUserInfo()}</div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <AlertCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Confirm{" "}
                {getUserStatusMessage() === "purchased"
                  ? "Extension"
                  : "Access"}
              </h3>
            </div>

            <div className="text-gray-600 mb-6">
              {getUserStatusMessage() === "purchased" ? (
                <>
                  <p>
                    Are you sure you want to extend the course for{" "}
                    <strong>{email}</strong> in{" "}
                    <strong>{courseDropdown}</strong>?
                  </p>
                  <p className="mt-2 text-sm">
                    Extension duration: <strong>{extendDuration} days</strong>
                  </p>
                </>
              ) : (
                <p>
                  Are you sure you want to give access to{" "}
                  <strong>{email}</strong> for <strong>{courseDropdown}</strong>
                  ?
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitButton}
                disabled={submitLoading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitLoading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUserIntoCourse;

// const AddUserIntoCourse = () => {
//   const [email, setEmail] = useState("");
//   const [courseDropdown, setCourseDropdown] = useState("");
//   const [data, setData] = useState([]);
//   const [error, setError] = useState("");
//   const [aboutUser, setaboutUser] = useState({});
//   const [formSubmitted, setformSubmitted] = useState(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${host}/users/get-courses`);
//         setData(response.data);
//       } catch (error) {
//         console.error("An error occurred:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   console.log(data);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const courseToBeSent = data.find(
//       (course) => course.title === courseDropdown
//     );

//     try {
//       const response = await axios.post(`${host}/add/get-user`, {
//         email: email,
//         courseid: courseToBeSent.courseid,
//       });
//       setaboutUser(response.data);
//     } catch (error) {
//       console.error("An erorr occured: ", error);
//     }
//     setformSubmitted(true);
//   };

//   console.log("backend data", aboutUser);
//   console.log("length", aboutUser.length);

//   const handleOnChange = (e) => {
//     const value = e.target.value;
//     setCourseDropdown(value);

//     console.log(value);

//     if (value === "") {
//       setError("Select a course");
//     } else {
//       setError("");
//     }
//   };

//   const submitButton = async () => {
//     // console.log(email);
//     // console.log(courseDropdown);
//     try {
//       const courseToBeSent = data.find(
//         (course) => course.title === courseDropdown
//       );

//       const response = await axios.post(`${host}/add/add-into-course`, {
//         email: email,
//         courseid: courseToBeSent.courseid,
//       });

//       alert(response.data.message);
//     } catch (error) {
//       console.error("There has been a error: ", error);
//     }
//   };

//   return (
//     <div flex-col mx-auto>
//       <div flex sm:flex-col gap-2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <select value={courseDropdown} onChange={handleOnChange}>
//             <option value="">Select Course</option>
//             {data.map((course) => (
//               <option value={course.title} key={course.courseid}>
//                 {course.title}
//               </option>
//             ))}
//           </select>

//           <button type="submit">Submit</button>
//         </form>
//       </div>

//       {formSubmitted && (
//         <>
//           <div flex-col>
//             <h4>Course purchase details: {aboutUser?.message}</h4>
//             <h4>purchased on: {aboutUser?.bought_on}</h4>

//             <h4>expires: {aboutUser?.expired_on || aboutUser?.expires_on}</h4>
//             <h4>Whatsapp: {aboutUser?.whatsappStatus}</h4>
//           </div>

//           <button onClick={submitButton}>Provide Access</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default AddUserIntoCourse;
