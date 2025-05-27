import JobOpeningForm from "../../components/JobOpeningForm.jsx";

const LogoAdder = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Job Openings(add company logo in the logo adder first to show in
        dropdown)
      </h1>
      <JobOpeningForm />
    </div>
  );
};

export default LogoAdder;
