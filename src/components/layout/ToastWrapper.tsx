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
      toastClassName="font-sans text-[14px] rounded-xl shadow-lg border border-[#E4E7EB]"
    />
  );
}
