import { useState } from "react";
import API from "../services/api";
import MapComponent from "../components/MapComponent";
import AnalyticsPanel from "../components/AnalyticsPanel";

export default function Dashboard() {

  const [aoi, setAOI] = useState(null);
  const [startYear, setStartYear] = useState(2019);
  const [endYear, setEndYear] = useState(2023);
  const [result, setResult] = useState(null);

  const analyze = async () => {

    if (!aoi) {
      alert("Draw region first");
      return;
    }

    const res = await API.post("/analyze", {
      aoi: aoi,
      start_year: startYear,
      end_year: endYear
    });

    setResult(res.data);
  };

  const generateReport = async () => {
    const res = await API.post("/report", result, {
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "terrasight_report.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="container">

      <MapComponent setAOI={setAOI} />

      <div>
        <label>Start Year:</label>
        <input
          type="number"
          value={startYear}
          onChange={e => setStartYear(e.target.value)}
        />

        <label>End Year:</label>
        <input
          type="number"
          value={endYear}
          onChange={e => setEndYear(e.target.value)}
        />

        <button className="button" onClick={analyze}>
          Analyze
        </button>
      </div>

      <AnalyticsPanel result={result} />

      {result && (
        <button className="button" onClick={generateReport}>
          Download Report
        </button>
      )}

    </div>
  );
}
