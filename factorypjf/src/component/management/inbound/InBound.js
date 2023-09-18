import React, { useEffect, useState } from "react";
import MasterTable from "./MasterTable";
import SubTable from "./SubTable";
import api from "redux/api";
import SubRow from "./SubRow";

const InBound = () => {
  const [masterLength, setMasterLength] = useState(1);
  const [boundId, setBoundId] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [masterFocus, setMaseterFocus] = useState(boundId);


  useEffect(() => {
    const fetchBoundId = async () => {
      try {
        const response = await api.get("/inbound/getBoundId");
        setBoundId(response.data.data);
      } catch (error) {
        console.error("Error fetching boundId:", error);
      }
    };

    fetchBoundId();
  }, []);

  useEffect(() => {
    setMaseterFocus(boundId)
  }, [boundId]);

  return (
    <div>
      <MasterTable
        masterLength={masterLength}
        boundId={boundId}
        setMasterLength={setMasterLength}
        setMaseterFocus={setMaseterFocus}
      />
      <SubTable
        masterLength={masterLength}
        boundId={boundId}
        masterFocus={masterFocus}
      />
      <button onClick={() => setSubmit(true)}>저장</button>
    </div>
  );
};

export default InBound;
