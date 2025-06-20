import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadExcel,
  clearImportSummary,
} from "../features/customers/customerSlice";
import axios from "../api/axios";

const ExcelUpload = () => {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const { importSummary } = useSelector((state) => state.customers);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) dispatch(uploadExcel(file));
  };

  const handleDownloadTemplate = async () => {
    const res = await axios.get("/api/customers/template", {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "customer_upload_template.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="my-4">
      <button
        onClick={handleDownloadTemplate}
        className="bg-green-600 text-white px-4 py-2 rounded mr-4"
      >
        Download Template
      </button>
      <input
        type="file"
        accept=".xlsx"
        ref={fileRef}
        onChange={handleUpload}
        className="inline-block"
      />
      {importSummary && (
        <div className="mt-2 bg-gray-100 p-2 rounded">
          <div>
            Added: {importSummary.added}, Failed: {importSummary.failed}
          </div>
          {importSummary.errors && importSummary.errors.length > 0 && (
            <ul className="text-red-600 text-xs mt-1">
              {importSummary.errors.map((err, i) => (
                <li key={i}>{err.reason}</li>
              ))}
            </ul>
          )}
          <button
            onClick={() => dispatch(clearImportSummary())}
            className="text-blue-600 text-xs mt-1"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default ExcelUpload;
