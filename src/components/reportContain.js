import React, { useState, useEffect } from "react";
import Report1 from "./report1"; 
import Report2 from "./report2";
import Report3 from "./report3";

function ReportsContainer() {
  const [report1Data, setReport1Data] = useState([]);

  
  useEffect(() => {
    async function fetchReport1Data() {
      try {
        const res = await fetch("http://localhost:5000/report1");
        const data = await res.json();
        setReport1Data(data);
      } catch (error) {
        console.error("Error fetching report1 data:", error);
      }
    }

    fetchReport1Data();
  }, []);

  return (
    <>
      <Report1 data={report1Data} />
      {/* Render other tab components with their respective data */}
    </>
  );
}

export default ReportsContainer;
