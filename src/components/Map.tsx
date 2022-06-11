import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';



const containerStyle = {
    width: '100%',
    height: '60%'
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

function MyMap() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDKMu8IDKw9l9aTgCVIKVagqwTg46GLpc0"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={18}
            >
                {/* Child components, such as markers, info windows, etc. */ }
                <></>
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(MyMap)