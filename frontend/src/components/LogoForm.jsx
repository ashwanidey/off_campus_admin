import { useState } from "react";
import axios from "axios";
import { host } from "../utils/api"; // Adjust the import path as necessary

const CompanyImageUploadForm = () => {
  const [formData, setFormData] = useState({
    company: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      file: file,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    // Validate form
    if (!formData.company.trim()) {
      setMessage("Company name is required");
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (!formData.file) {
      setMessage("Please select a file to upload");
      setMessageType("error");
      setLoading(false);
      return;
    }

    console.log("Form data before upload:", formData);

    // Create FormData object
    const uploadData = new FormData();
    uploadData.append("company", formData.company);
    uploadData.append("file", formData.file);

    // console.log("up:", uploadData);

    // for (let [key, value] of uploadData.entries()) {
    //   console.log(key, value);
    // }

    try {
      const response = await axios.post(
        `${host}/job/upload-company-image`,
        uploadData
      );

      console.log("Response from upload:", response);
      console.log("Response data:", response.data);

      // With axios, the JSON data is already parsed and available in response.data
      const result = response.data;

      console.log("Upload response:", result);

      // With axios, check response.status instead of response.ok
      if (response.status === 200) {
        setMessage("File uploaded successfully!");
        setMessageType("success");
        // Reset form
        setFormData({ company: "", file: null });
        // Reset file input
        document.getElementById("fileInput").value = "";
      } else {
        setMessage(result.message || "Upload failed");
        setMessageType("error");
      }
    } catch (error) {
      console.log("Error occurred:", error);

      // Check if it's an axios error with response
      if (error.response) {
        console.log("Error response:", error.response.data);
        setMessage(error.response.data.message || "Upload failed");
      } else {
        setMessage("Network error. Please try again.");
      }
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload Company Image
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company Name *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter company name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="fileInput"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company Image *
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

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Uploading...
            </div>
          ) : (
            "Upload Image"
          )}
        </button>
      </div>

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

export default CompanyImageUploadForm;
