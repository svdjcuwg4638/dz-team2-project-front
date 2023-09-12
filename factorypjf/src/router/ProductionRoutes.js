import { Outlet, Route, Routes,Redirect } from "react-router-dom";
import React, { useEffect } from "react";

import ProductionAdd from 'component/production/Add'
import ProductionLine from 'component/production/Line'
import ProductionList from 'component/production/List'

export default function ProductionRoutes() {
  return (
    <Routes>
      <Route  path="" index element={<ProductionAdd /> } />
      <Route  path="line" element={<ProductionLine />} />
      <Route  path="list" element={<ProductionList />} />
    </Routes>
  );
}
