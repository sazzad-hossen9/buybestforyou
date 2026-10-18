'use client';

import { ToastContainer } from 'react-toastify';

export function ToastWrapper() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      toastClassName="font-sans text-[length:var(--fs-caption)] leading-[var(--lh-caption)] rounded-[var(--r-card)] shadow-lg border border-border"
    />
  );
}
