import React from 'react';

interface CustomComponentProps {
  cursorX: string;
  cursorY: string;
  title: string;
  description: string;
  imageSrc: string;
}

const CustomComponent: React.FC<CustomComponentProps> = ({ cursorX, cursorY, title, description, imageSrc }) => {
  return (
    <div className="relative z-0 group overflow-hidden h-full shadow-md rounded-xl bg-[radial-gradient(500px_circle_at_var(--cursor-x)_var(--cursor-y),#22d3ee_0,transparent,transparent_70%)]">
      <div className="space-y-3 relative z-10 p-5 bg-[linear-gradient(180deg,_rgba(24,_24,_27,_0.60)_0%,_rgba(24,_24,_27,_0.00)_100%)]">
        <div className="text-gray-500 w-9 h-9 rounded-full bg-[linear-gradient(180deg,_rgba(39,_39,_42,_0.68)_0%,_rgba(39,_39,_42,_0.00)_100%)] flex items-center justify-center border border-zinc-700">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33333 9.16667H8.33333C8.55435 9.16667 8.76631 9.07887 8.92259 8.92259C9.07887 8.76631 9.16667 8.55435 9.16667 8.33333V3.33333C9.16667 3.11232 9.07887 2.90036 8.92259 2.74408C8.76631 2.5878 8.55435 2.5 8.33333 2.5H3.33333C3.11232 2.5 2.90036 2.5878 2.74408 2.74408C2.5878 2.90036 2.5 3.11232 2.5 3.33333V8.33333C2.5 8.55435 2.5878 8.76631 2.74408 8.92259C2.90036 9.07887 3.11232 9.16667 3.33333 9.16667ZM4.16667 4.16667H7.5V7.5H4.16667V4.16667ZM16.6667 2.5H11.6667C11.4457 2.5 11.2337 2.5878 11.0774 2.74408C10.9211 2.90036 10.8333 3.11232 10.8333 3.33333V8.33333C10.8333 8.55435 10.9211 8.76631 11.0774 8.92259C11.2337 9.07887 11.4457 9.16667 11.6667 9.16667H16.6667C16.8877 9.16667 17.0996 9.07887 17.2559 8.92259C17.4122 8.76631 17.5 8.55435 17.5 8.33333V3.33333C17.5 3.11232 17.4122 2.90036 17.2559 2.74408C17.0996 2.5878 16.8877 2.5 16.6667 2.5ZM15.8333 7.5H12.5V4.16667H15.8333V7.5ZM8.33333 17.5C8.55435 17.5 8.76631 17.4122 8.92259 17.2559C9.07887 17.0996 9.16667 16.8877 9.16667 16.6667V11.6667C9.16667 11.4457 9.07887 11.2337 8.92259 11.0774C8.76631 10.9211 8.55435 10.8333 8.33333 10.8333H3.33333C3.11232 10.8333 2.90036 10.9211 2.74408 11.0774C2.5878 11.2337 2.5 11.4457 2.5 11.6667V16.6667C2.5 16.8877 2.5878 17.0996 2.74408 17.2559C2.90036 17.4122 3.11232 17.5 3.33333 17.5H8.33333ZM4.16667 12.5H7.5V15.8333H4.16667V12.5ZM15 11.6667H13.3333V13.3333H11.6667V15H13.3333V16.6667H15V15H16.6667V13.3333H15V11.6667Z" fill="url(#paint0_linear_3267_7869)"></path>
            <defs>
              <linearGradient id="paint0_linear_3267_7869" x1="10" y1="2.5" x2="10.1656" y2="25.4561" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F9FAFB"></stop>
                <stop offset="1" stopColor="#F9FAFB" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h3 className="text-zinc-100 font-semibold">{title}</h3>
        <p className="text-zinc-300">{description}</p>
       
      </div>
      <div className="bg-[linear-gradient(180deg,_#1E293B_0%,_rgba(59,_130,_246,_0.00)_137.53%,_rgba(32,_69,_129,_0.00)_195%)] blur-[70px] opacity-0 absolute top-0 left-0 w-4/5 h-4/5 duration-150 group-hover:opacity-90" style={{top: cursorY, left: cursorX, transform: 'translate(-50%, -50%)'}}></div>
      <div className="absolute inset-[1px] -z-10 rounded-xl bg-zinc-950"></div>
    </div>
  );
};

export default CustomComponent;
