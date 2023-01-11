import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div className="branch-location">{text}</div>;

export function Map() {
    const [coordinets, setCoordinets] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11
    const branchTLV = { lat: 32.090273, lng: 34.769723 }
    const branchASH = { lat: 31.681408, lng: 34.558372 }
    const branchYAVNE = { lat: 31.874258, lng: 34.734435 }

    const handelClick = ({ lat, lng }) => {
        setCoordinets({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <div className="map-wrap" style={{ height: '60vh', width: '60vw', margin: '2rem auto' }}>
            <GoogleMapReact
                onClick={handelClick}
                bootstrapURLKeys={{ key: "AIzaSyBCdVWW9p0o7YZ14rqKrbF8m6JWc_o0VbI" }}
                defaultCenter={coordinets}
                center={coordinets}
                defaultZoom={zoom}
            >

                <AnyReactComponent
                    lat={branchTLV.lat}
                    lng={branchTLV.lng}
                    text="🧸"
                />
                <AnyReactComponent
                    lat={branchASH.lat}
                    lng={branchASH.lng}
                    text="🧸"
                />
                <AnyReactComponent
                    lat={branchYAVNE.lat}
                    lng={branchYAVNE.lng}
                    text="🧸"
                />
            </GoogleMapReact>
            <button onClick={() => handelClick(branchTLV)}>Tel Aviv</button>
            <button onClick={() => handelClick(branchYAVNE)}>Yavne</button>
            <button onClick={() => handelClick(branchASH)}>Ashkelon</button>
        </div>
    );
}