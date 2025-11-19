/* eslint-disable header/header */
import React from 'react';
import useScrollSync from './../hooks/useScrollSync'; // Adjust path if necessary

export default function Root({ children }) {
  // Call the global hook here. It runs once when the app loads and persists.
  useScrollSync();

  // The Root component must return its children unchanged to wrap the entire site.
  return <>{children}</>;
}
