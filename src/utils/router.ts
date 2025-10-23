import React from 'react';
import type { RouteObject } from 'react-router-dom';

const pageModules = import.meta.glob('../pages/**/*.tsx', { eager: true });
const routes: RouteObject[] = Object.keys(pageModules).map((path) => {
  const module = pageModules[path] as { default: React.ComponentType };
  const routePath = path
    .replace('../pages/', '')
    .replace(/\.tsx$/, '')
    .replace(/index$/, '');
  return {
    path: routePath || '/',
    element: React.createElement(module.default),
  };
});

export default routes;
