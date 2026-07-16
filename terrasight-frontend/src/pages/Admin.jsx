import { useEffect, useState } from "react";
import API from "../services/api";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function Admin() {

  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/admin").then(res => setData(res.data));
  }, []);

  const summary = [
    { name: "High", value: data.filter(d => d.changes?.some(c => c.level==="High")).length },
    { name: "Moderate", value: data.filter(d => d.changes?.some(c => c.level==="Moderate")).length },
    { name: "Low", value: data.filter(d => d.changes?.some(c => c.level==="Low")).length }
  ];

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <PieChart width={400} height={400}>
        <Pie data={summary} dataKey="value" outerRadius={150}>
          <Cell fill="#ff4d4d"/>
          <Cell fill="#ffaa00"/>
          <Cell fill="#33cc33"/>
        </Pie>
        <Tooltip />
      </PieChart>

    </div>
  );
}
