import React, { useContext, useState, useEffect } from 'react';
import { DirectionsRenderer, GoogleMap, Marker, OverlayView } from '@react-google-maps/api';
import { DestinationContext } from '@/context/DestinationContext';
import { SourceContext } from '@/context/SourceContext';

const GoogleMapSection = () => {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.4,
  };

  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const [center, setCenter] = useState({
    lat: 28.59,
    lng: 78.96,
  });
  const [zoom, setZoom] = useState(5); // Set a lower zoom level for a zoomed-out view
  const [map, setMap] = useState(null);
  const[directionRoutePoints , setDirectionRoutePoints]= useState([]);

  useEffect(() => {
    if (source && source.lat && source.lng && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
      setZoom(15); // Optionally zoom in when source is set
    }
    if(source.length!=[] && destination.length!=[])
      {
        directionRoute()
      }
  }, [source, map]);

  useEffect(() => {
    if (destination && destination.lat && destination.lng && map) {
      map.panTo({
        lat: destination.lat,
        lng: destination.lng,
      });
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
      setZoom(15); // Optionally zoom in when destination is set
    }
    if(source.length!=[] && destination.length!=[])
    {
      directionRoute()
    }
  }, [destination, map]);

  const directionRoute=()=>{
    const DirectionsService = new google.maps.DirectionsService()

    DirectionsService.route({
      origin:{lat:source.lat , lng:source.lng},
      destination: {lat: destination.lat , lng:destination.lng},
      travelMode:google.maps.TravelMode.DRIVING
    },(result,status)=>{
      if(status==google.maps.DirectionsStatus.OK)
      {
        setDirectionRoutePoints(result)
      }
      else{
        console.error('Error')
      }
    }
    )
  }

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: '8284d3ef899c7f80' }}
    >
      {/* Source Marker and Overlay */}
      {source && source.lat && source.lng && (
        <Marker position={{ lat: source.lat, lng: source.lng }}>
          <OverlayView
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              className="p-2 bg-white font-bold inline-block rounded-md whitespace-nowrap"
              style={{ maxWidth: 'none' }}
            >
              <p className="text-black text-[16px]">{source.label}</p>
            </div>
          </OverlayView>
        </Marker>
      )}

      {/* Destination Marker and Overlay */}
      {destination && destination.lat && destination.lng && (
        <Marker position={{ lat: destination.lat, lng: destination.lng }}>
          <OverlayView
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              className="p-2 bg-white font-bold inline-block rounded-md whitespace-nowrap"
              style={{ maxWidth: 'none' }}
            >
              <p className="text-black text-[16px]">{destination.label}</p>
            </div>
          </OverlayView>
        </Marker>
      )}

      <DirectionsRenderer
      directions={directionRoutePoints}
      options={{
        polylineOptions:{
          strokeColor:'#000',
          strokeWeight:5
        },
        suppressMarkers : true
      }}
      />
    </GoogleMap>
  );
};

export default GoogleMapSection;
