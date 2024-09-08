import Image from 'next/image';
import React from 'react';

const CarListItem = ({ car, distance  }) => {
  // Ensure car.amount is a number
  const amount = typeof car.amount === 'number' ? car.amount : 0;

  return (
    <div>
      <div className='flex items-center justify-between mt-5'>
        <div className='flex items-center gap-5'>
          <Image 
            src={car.image} 
            alt={car.name}
            width={80} 
            height={80} 
          />
          <div>
            <h2 className='font-semibold text-[18px]'>
              {car.name}
            </h2>
            <p classname='p-5'>{car.desc}</p>
          </div>
        </div>
        <h2 className='text-[18px] font-semibold'>
          Rs.{(amount * distance).toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default CarListItem;
