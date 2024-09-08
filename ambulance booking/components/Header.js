//import { UserButton } from '@clerk/nextjs';
import React from 'react';

function Header() {
  return (
    <header className="bg-gray-100 border-b-[2px] border-gray-300 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-3xl font-bold">
          MediLab Seva
        </div>
        {/* <div>
          <UserButton />
        </div> */}
      </div>
    </header>
  );
}

export default Header;
