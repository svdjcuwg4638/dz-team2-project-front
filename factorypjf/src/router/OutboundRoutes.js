import React from "react";
import { Outlet, Route, Routes, Redirect } from "react-router-dom";
import OutboundStart from "component/outbound/start/OutboundStart";
import OutboundEnd from "component/outbound/end/OutboundEnd";

function OutboundRoutes() {
  return (
    <Routes>
      <Route path="start" index element={<OutboundStart />} />
      <Route path="end" element={<OutboundEnd />} />
    </Routes>
  );
}

export default OutboundRoutes;
