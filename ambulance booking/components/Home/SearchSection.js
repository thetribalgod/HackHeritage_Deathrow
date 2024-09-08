import React, { useContext, useState } from 'react';
import InputItem from './InputItem';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';
import CarListOptions from './CarListOptions';

const SearchSection = () => {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [distance, setDistance] = useState(null);

  const calculateDistance = () => {
    if (source && destination) {
      const dist = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(source.lat, source.lng),
        new google.maps.LatLng(destination.lat, destination.lng)
      );
      setDistance(dist / 1000); // Convert to kilometers
    }
  };

  return (
    <div>
      <div className='p-2 md:p-6 border-[2px] rounded-xl'>
        <p className='text-[20px] font-bold'>Book your Ambulance</p>
        <InputItem type='source' />
        <InputItem type='destination' />
        <button
          className='p-3 bg-black w-full mt-5 text-white rounded-lg'
          onClick={calculateDistance}
        >
          Search
        </button>
      </div>
      {distance !== null && <CarListOptions distance={distance} />}
    </div>
  );
};

export default SearchSection;
