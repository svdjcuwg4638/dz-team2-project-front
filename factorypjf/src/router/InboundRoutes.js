import React from "react";
import { Outlet, Route, Routes, Redirect } from "react-router-dom";

import InboundAdd from "component/inbound/Add";
import InboundStart from "component/inbound/start/InboundStart";
import InboundOngoing from "component/inbound/ongoing/InboundOngoing";
import InboundEnd from "component/inbound/end/InboundEnd";

export default function InboundRoutes() {
  return (
    <Routes>
      <Route path="start" index element={<InboundStart />} />
      <Route path="ongoing" element={<InboundOngoing />} />
      <Route path="end" element={<InboundEnd />} />
    </Routes>
  );
}
