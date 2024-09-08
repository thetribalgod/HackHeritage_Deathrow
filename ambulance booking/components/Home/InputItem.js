"use client";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import React, { useContext, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const InputItem = ({ type }) => {
  const [value, setValue] = useState(null);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const getLatAndLng = (place, type) => {
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({ placeId }, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && result.geometry && result.geometry.location) {
        const lat = result.geometry.location.lat();
        const lng = result.geometry.location.lng();

        const locationData = {
          lat: lat,
          lng: lng,
          name: result.formatted_address,
          label: result.name
        };

        if (type === 'source') {
          setSource(locationData);
          console.log("Source:", locationData);  // Log source only when it's set
        } else {
          setDestination(locationData);
          console.log("Destination:", locationData);  // Log destination only when it's set
        }
      } else {
        console.error('Failed to get place details');
      }
    });
  };

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3">
      <GooglePlacesAutocomplete
        
        selectProps={{
          value,
          onChange: (place) => {
            getLatAndLng(place, type);
            setValue(place);
          },
          placeholder: type === "source" ? "Pickup Location" : "Drop Location",
          isClearable: true,
          className: "w-full",
          components: {
            DropdownIndicator: () => null, // Hide the dropdown indicator
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none", // Remove the box shadow
            }),
            menu: (provided) => ({
              ...provided,
              zIndex: 9999, // Ensure the dropdown appears above other elements
            }),
          },
        }}
      />
    </div>
  );
};

export default InputItem;