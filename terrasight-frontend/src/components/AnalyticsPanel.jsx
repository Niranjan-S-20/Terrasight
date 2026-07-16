export default function AnalyticsPanel({ result }) {

  if (!result) return null;

  return (
    <div>
      <h3>Yearly NDVI</h3>

      {result.yearly.map((y, index) => (
        <div key={index} className="card">
          Year: {y.year} | NDVI: {y.ndvi}
        </div>
      ))}

      <h3>Change Analysis</h3>

      {result.changes.map((c, index) => (
        <div key={index} className="card">
          {c.from_year} → {c.to_year} :
          {c.change_percent}% ({c.level})
        </div>
      ))}
    </div>
  );
}
