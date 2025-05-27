import { useState, useEffect } from "react";
import axios from "axios";
import { host } from "../utils/api"; // Adjust the import path as necessary

const JobOpeningForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    image: "",
    link: "",
  });
  const [companyOptions, setCompanyOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  // Replace with your actual API endpoint and host
  //   const host = "http://localhost:3000"; // Adjust this to your backend URL

  // Fetch company data on component mount
  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      setLoadingCompanies(true);
      const response = await axios.get(`${host}/job/companies-logo-list`);

      setCompanyOptions(response.data);

      console.log("Fetched companies:", companyOptions);
    } catch (error) {
      console.error("Error fetching companies:", error);
      if (error.response) {
        setMessage(
          error.response.data.message || "Failed to load company data"
        );
      } else {
        setMessage("Error loading company data");
      }
      setMessageType("error");
    } finally {
      setLoadingCompanies(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear message when user starts typing
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    // Validate form
    if (!formData.role.trim()) {
      setMessage("Role is required");
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (!formData.company.trim()) {
      setMessage("Company is required");
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (!formData.link.trim()) {
      setMessage("Job link is required");
      setMessageType("error");
      setLoading(false);
      return;
    }

    // Validate URL format
    try {
      new URL(formData.link);
    } catch {
      setMessage("Please enter a valid URL");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${host}/job/create-job-opening`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Job opening created:", response.data);

      setMessage("Job opening created successfully!");
      setMessageType("success");
      // Reset form
      setFormData({
        role: "",
        company: "",
        image: "",
        link: "",
      });
    } catch (error) {
      console.error("Error creating job opening:", error);

      if (error.response) {
        setMessage(
          error.response.data.message || "Failed to create job opening"
        );
      } else {
        setMessage("Network error. Please try again.");
      }
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Get available images for selected company
  //   const getCompanyImages = () => {

  //     if (!formData.company) return [];

  //     const selectedCompany = companyOptions.find(
  //       (company) => company.company_name === formData.company
  //     );

  //     return selectedCompany ? selectedCompany.images || [] : [];
  //   };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create Job Opening
      </h2>

      <div className="space-y-4">
        {/* Role Input */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Job Role *
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Frontend Developer, Product Manager"
            required
          />
        </div>

        {/* Company Dropdown */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company *
          </label>
          {/* {loadingCompanies ? (
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
              Loading companies...
            </div>
          ) : (
            <select
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a company</option>
              {companyOptions.map((company, index) => (
                <option key={index} value={company.company_name}>
                  {company.company_name}
                </option>
              ))}
            </select>
          )} */}
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Google, Microsoft"
            required
          />
        </div>

        {/* Image Dropdown */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company Logo Image*
          </label>
          {loadingCompanies ? (
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
              Loading images...
            </div>
          ) : (
            <select
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              //   disabled={!formData.company}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              required
            >
              <option value="">Select an image</option>
              {[
                ...new Set(companyOptions.map((item) => item.file_name)),
              ].map((companyName, index) => (
                <option key={index} value={companyName}>
                  {companyName}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Job Link Input */}
        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Job Application Link *
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://company.com/careers/job-id"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || loadingCompanies}
          className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-colors ${
            loading || loadingCompanies
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating Job Opening...
            </div>
          ) : (
            "Create Job Opening"
          )}
        </button>
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`mt-4 p-3 rounded-md ${
            messageType === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default JobOpeningForm;
