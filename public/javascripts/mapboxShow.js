mapboxgl.accessToken = mapboxToken;
const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: campground.geometry.coordinates,
        zoom: 4
    });
new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<b>${campground.title}</b> <br> ${campground.location}`
        )
    )
    .addTo(map);

    map.addControl(new mapboxgl.NavigationControl());