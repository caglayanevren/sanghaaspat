import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function GoogleMaps({ apikey, ...props }) {
    const googlemap = useRef(null);

    useEffect(() => {
        const loader = new Loader({
            apiKey: apikey,
            version: 'weekly',
        });
        let map;
        loader.load().then(() => {
            const google = window.google;
            const myLatLng = { lat: 36.9888899646976, lng: 27.31811194687439 };
            map = new google.maps.Map(googlemap.current, {
                center: myLatLng,
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.HYBRID,
                fullscreenControl: false, // remove the top-right button
                mapTypeControl: true, // remove the top-left buttons
                streetViewControl: true, // remove the pegman
                zoomControl: true, // remove the bottom-right buttons
            });
            const image = '/sangha-aspat-logo.png';
            new google.maps.Marker({
                position: myLatLng,
                map,
                icon: image,
                title: process.env.siteTitle,
            });
        });
    });

    return <div className={props.className} id="map" ref={googlemap} />;
}
