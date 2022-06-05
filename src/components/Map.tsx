import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import LocationPin from "./Location";


const containerStyle = {
    width: '50%',
    height: '50%'
};

const center = {
    lat: 52.407690,
    lng: -4.058900
};

const getUserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            console.log(userLocation); // ADDED
        });
    } else {
        // code for legacy browsers
    }
};

function MyComponent() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDKMu8IDKw9l9aTgCVIKVagqwTg46GLpc0"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                {/* Child components, such as markers, info windows, etc. */ }
                <></>
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(MyComponent)