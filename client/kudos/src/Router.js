import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { menuItems } from './config';
import ErrorPage from './components/error/Error';

const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {menuItems.map(item => (
        <Route key={item.key} path={`${item.path}/*`} element={item.element} />
      ))}
        <Route
            path="*"
            element={ <ErrorPage />}
        />
    </Routes>

  </Suspense>
);

export default AppRoutes;