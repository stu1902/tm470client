import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 52.407690,
    lng: -4.058900
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
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(MyComponent)