import { useState, useEffect } from "react";
import axios from "axios";
import { host } from "../../utils/api"; // Adjust the import path as necessary

const cohortOptions = [
  { id: 1, name: "Placement Cohort" },
  { id: 2, name: "Internship Cohort" },
];

const SuccessStoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    companyLogo: "",
    file: null,
    cohort: "", // Initialize as empty string for validation
  });
  const [companyOptions, setCompanyOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      file: file,
    }));
  };

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

    // Validate cohort selection
    if (!formData.cohort || formData.cohort === "") {
      setMessage("Cohort selection is required");
      setMessageType("error");
      setLoading(false);
      return;
    }

    // Validate form
    if (!formData.name.trim()) {
      setMessage("Student name is required");
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

    // Validate student photo format
    if (!formData.file) {
      setMessage("Student photo is required");
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (!formData.companyLogo) {
      setMessage("Company logo is required");
      setMessageType("error");
      setLoading(false);
      return;
    }

    console.log("File instanceof File:", formData.file instanceof File);

    const uploadData = new FormData();
    uploadData.append("name", formData.name);
    uploadData.append("company", formData.company);
    uploadData.append("companyLogo", formData.companyLogo);
    uploadData.append("file", formData.file);
    uploadData.append("id", formData.cohort);

    console.log("upload data: ", uploadData);

    try {
      const response = await axios.post(
        `${host}/testimonial/create-testimonial`,
        uploadData
      );

      console.log("Testimonial created:", response.data);

      setMessage("Testimonial created successfully!");
      setMessageType("success");
      // Reset form
      setFormData({
        name: "",
        company: "",
        companyLogo: "",
        file: null,
        cohort: "",
      });
    } catch (error) {
      console.error("Error creating testimonial:", error);

      if (error.response) {
        setMessage(
          error.response.data.message || "Failed to create testimonial"
        );
      } else {
        setMessage("Network error. Please try again.");
      }
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create Testimonial
      </h2>

      <div className="space-y-4">
        {/* Cohort Selection */}
        <div>
          <label
            htmlFor="cohort"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Cohort *
          </label>
          <select
            name="cohort"
            id="cohort"
            value={formData.cohort}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a cohort</option>
            {cohortOptions.map((cohort) => (
              <option key={cohort.id} value={cohort.id}>
                {cohort.name}
              </option>
            ))}
          </select>
        </div>

        {/* Student Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Student Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., John Doe"
            required
          />
        </div>

        {/* Company Input */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company *
          </label>
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

        {/* Company Logo Dropdown */}
        <div>
          <label
            htmlFor="companyLogo"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company Logo *
          </label>
          {loadingCompanies ? (
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
              Loading company logos...
            </div>
          ) : (
            <select
              id="companyLogo"
              name="companyLogo"
              value={formData.companyLogo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              required
            >
              <option value="">Select a company logo</option>
              {[...new Set(companyOptions.map((item) => item.file_name))].map(
                (companyName, index) => (
                  <option key={index} value={companyName}>
                    {companyName}
                  </option>
                )
              )}
            </select>
          )}
        </div>

        {/* Student Photo Input */}
        <div>
          <label
            htmlFor="fileInput"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Student Photo *
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          {formData.file && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {formData.file.name}
            </p>
          )}
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
              Creating Testimonial...
            </div>
          ) : (
            "Create Testimonial"
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

export default SuccessStoryForm;
