import { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  Building2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
} from "lucide-react";
import { host } from "../../utils/api";

export default function CollegeServicesDashboard() {
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      // Replace with your actual API endpoint
      const response = await axios.get(`${host}/college-service`);

      if (response.data.success) {
        setServices(response.data.data);
      } else {
        setError("Failed to fetch services");
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      setError(err.response?.data?.message || "Error connecting to server");

      // Mock data for demo purposes
      setServices([
        {
          _id: "1",
          serviceName: "Career Counseling Workshop",
          college_serviceId: 1,
          userCount: 5,
          latestSubmission: new Date(),
          users: [
            {
              _id: "u1",
              collegeName: "Delhi University",
              city: "Delhi",
              email: "admin@du.ac.in",
              phoneNumber: "+91-9876543210",
              numberOfStudents: 150,
              collegeType: "government",
              sessionFormat: "offline",
              collegeGraduation: "UG",
              quotedFigure: 15000,
              priceRange: { min: 12500, max: 17500, quoted: 15000 },
              contacted_by_charchit: false,
              submittedAt: new Date(),
            },
          ],
        },
        {
          _id: "2",
          serviceName: "Interview Preparation Program",
          college_serviceId: 2,
          userCount: 3,
          latestSubmission: new Date(Date.now() - 86400000),
          users: [],
        },
        {
          _id: "3",
          serviceName: "Resume Building Session",
          college_serviceId: 3,
          userCount: 2,
          latestSubmission: new Date(Date.now() - 172800000),
          users: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  const currentService = services[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            College Services Dashboard
          </h1>
          {error && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                ⚠️ {error} (Showing demo data)
              </p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
          {services.map((service, index) => (
            <button
              key={service._id}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                activeTab === index
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-white-600 hover:text-white-900"
              }`}
            >
              {service.serviceName}
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-600 rounded-full">
                {service.userCount}
              </span>
            </button>
          ))}
        </div>

        {/* Service Content */}
        {currentService && (
          <div className="space-y-6">
            {/* Service Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {currentService.serviceName}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Service ID: {currentService.college_serviceId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Submissions</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {currentService.userCount}
                  </p>
                </div>
              </div>
            </div>

            {/* User Submissions */}
            <div className="space-y-4">
              {currentService.users && currentService.users.length > 0 ? (
                currentService.users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-blue-600" />
                          {user.collegeName}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {user.city}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.collegeType === "government"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {user.collegeType.toUpperCase()}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.sessionFormat === "online"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {user.sessionFormat.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{user.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          {user.numberOfStudents} Students
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          {formatDate(user.submittedAt)}
                        </span>
                      </div>
                      <div className="text-gray-700">
                        <span className="text-sm">
                          Level: <strong>{user.collegeGraduation}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            user.contacted_by_charchit
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></span>
                        <span className="text-sm text-gray-700">
                          {user.contacted_by_charchit
                            ? "Contacted"
                            : "Not Contacted"}
                        </span>
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-gray-900">
                            Price Range
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {formatCurrency(user.priceRange.min)} -{" "}
                            {formatCurrency(user.priceRange.max)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Quoted:{" "}
                            <strong>
                              {formatCurrency(user.priceRange.quoted)}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">
                    No submissions yet for this service
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
