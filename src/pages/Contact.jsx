import React, { useState } from "react";

const Contact = () => {
  const [whatsAppNumber] = useState("+201234567890");

  return (
    <div className="flex justify-center items-center h-screen">
      <a
        href={`https://wa.me/${whatsAppNumber.replace(/\+/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white px-6 py-4 rounded-full text-xl hover:bg-green-600 transition flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M20.52 3.48a11.79 11.79 0 00-16.67 16.67l-1.96 5.56 5.71-1.5a11.79 11.79 0 0013.92-20.73zm-1.14 18.33a9.57 9.57 0 01-13.59-13.59 9.57 9.57 0 0113.59 13.59z" />
          <path d="M17.5 14.5c-.29-.15-1.72-.85-1.98-.95-.26-.1-.45-.15-.64.15s-.73.95-.9 1.15c-.16.21-.33.24-.61.08-.29-.15-1.23-.45-2.35-1.44-.87-.77-1.45-1.71-1.62-2 .16-.29.01-.44-.11-.59-.11-.15-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49-.16-.01-.35-.01-.54-.01s-.54.08-.82.39c-.29.31-1.1 1.08-1.1 2.64 0 1.55 1.13 3.05 1.29 3.26.16.21 2.23 3.5 5.41 4.91.76.33 1.35.53 1.81.68.76.23 1.45.2 1.99.12.61-.09 1.72-.7 1.96-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.54-.34z" />
        </svg>
        تواصل معنا عبر واتس اب
      </a>
    </div>
  );
};

export default Contact;
