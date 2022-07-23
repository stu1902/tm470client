import React, {useState} from 'react'
import { GoogleMap, LoadScript, Marker, KmlLayer } from '@react-google-maps/api';
import { Geolocation } from "@capacitor/geolocation";



const containerStyle = {
    width: '100%',
    height: '60%'
};


const getUserLocation = async () => {
        await navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            console.log(userLocation); // ADDED
        });
};

let center = {
    lat: 52.407690,
    lng: -4.058900
};


function MyMap() {

    const [locate, setLocate] = useState({center});

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDKMu8IDKw9l9aTgCVIKVagqwTg46GLpc0"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={18}
            >


                {/* Child components, such as markers, info windows, etc. */}

                <>
                    <Marker position={center}/>
                </>
            </GoogleMap>
        </LoadScript>

    )
}

export default React.memo(MyMap)


