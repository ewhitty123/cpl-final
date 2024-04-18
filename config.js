var config = {
    style: 'mapbox://styles/ewhitmer/cluzvfbvn00z301pkdhnh88ks',
    accessToken: 'pk.eyJ1IjoiZXdoaXRtZXIiLCJhIjoiY2x1dm92NHVjMDY3cDJpcGg5NXhzcTNoZiJ9.pT5W7bp-sWBpPKvmHVEJwQ',
    showMarkers: true,
    markerColor: '#3FB1CE',
    inset: true,
    theme: 'dark',
    use3dTerrain: false,
    auto: false,
    title: 'The Title Text of this Story',
    subtitle: 'A descriptive and interesting subtitle to draw in the reader',
    byline: 'By a Digital Storyteller',
    footer: 'Source: source citations, etc. <br> Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',
    chapters: [
        {
            id: 'slug-style-id',
            alignment: 'left',
            hidden: false,
            title: 'Display Title',
            image: './path/to/image/source.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            location: {
                center: [-83.73898, 42.27858],
                zoom: 12.04,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },

                {
                    id: 'second-identifier',
                    alignment: 'right',
                    hidden: false,
                    title: 'Second Title',
                    image: './path/to/image/source.png',
                    description: 'Copy these sections to add to your story.',
                    location: {
                        center: [-83.73871, 42.27945],
                        zoom: 19.02,
                        pitch: 50.50,
                        bearing: -28.00,

                        // flyTo additional controls-
                        // These options control the flight curve, making it move
                        // slowly and zoom out almost completely before starting
                        // to pan.
                        //speed: 2, // make the flying slow
                        //curve: 1, // change the speed at which it zooms out
                    },
                    mapAnimation: 'flyTo',
                    rotateAnimation: true,
                    callback: '',
                    onChapterEnter: [],
                    onChapterExit: []
                },
                {
                    id: 'third-identifier',
                    alignment: 'left',
                    hidden: false,
                    title: 'Third Title',
                    image: './path/to/image/source.png',
                    description: 'Copy these sections to add to your story.',
                    location: {
                        center: [-83.71624, 42.29199],
                        zoom: 19.16,
                        pitch: 76.00,
                        bearing: -96.80
                    },
                    mapAnimation: 'flyTo',
                    rotateAnimation: true,
                    callback: '',
                    onChapterEnter: [],
                    onChapterExit: []

                },

                {
                    id: 'fourth-chapter',
                    alignment: 'fully',
                    hidden: false,
                    title: 'Third Title',
                    image: './path/to/image/source.png',
                    description: 'Copy these sections to add to your story.',
                    location: {
                        center: [-58.54195, -34.71600],
                        zoom: 4,
                        pitch: 0,
                        bearing: 0
                    },
                    mapAnimation: 'flyTo',
                    rotateAnimation: false,
                    callback: '',
                    onChapterEnter: [],
                    onChapterExit: []
                }
            ]


        // ... additional chapters ...

};

// Set the access token for Mapbox GL JS
mapboxgl.accessToken = config.accessToken;

// Initialization of the map
var map = new mapboxgl.Map({
    container: 'map', // the id of the HTML element
    style: config.style,
    center: [-83.73878, 42.27954], // Longitude, Latitude
    zoom: 10 // Starting zoom level
});

// Operational code, including the creation of GeoJSON circle and addition to the map
map.on('load', function () {
    // Function to create a GeoJSON circle
    var createGeoJSONCircle = function (center, radiusInKm, points) {
        if (!points) points = 64;

        var coords = {
            latitude: center[1],
            longitude: center[0]
        };

        var km = radiusInKm;

        var ret = [];
        var distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
        var distanceY = km / 110.574;

        var theta, x, y;
        for (var i = 0; i < points; i++) {
            theta = (i / points) * (2 * Math.PI);
            x = distanceX * Math.cos(theta);
            y = distanceY * Math.sin(theta);
            ret.push([coords.longitude + x, coords.latitude + y]);
        }
        ret.push(ret[0]); // Close the polygon by adding the first point at the end

        return {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [ret]
                }
            }]
        };
    };

    // First circle
    var geoJSONCircleFirst = createGeoJSONCircle([-83.73871, 42.27945], .05);
    map.addSource("circle-first", {
        type: 'geojson',
        data: geoJSONCircleFirst
    });

    map.addLayer({
        "id": "circle-first-layer",
        "type": "fill",
        "source": "circle-first",
        "layout": {},
        "paint": {
            "fill-color": "red",
            "fill-opacity": 0.2
        }
    });

    // Second circle
    var geoJSONCircleSecond = createGeoJSONCircle([-83.73871, 42.27945], 1);
    map.addSource("circle-second", {
        type: 'geojson',
        data: geoJSONCircleSecond
    });

    map.addLayer({
        "id": "circle-second-layer",
        "type": "fill",
        "source": "circle-second",
        "layout": {},
        "paint": {
            "fill-color": "blue",
            "fill-opacity": 0.2
        }
    });
    var geoJSONCircleThird = createGeoJSONCircle([-83.73871, 42.27945], 1.5);
    map.addSource("circle-third", {
        type: 'geojson',
        data: geoJSONCircleThird
    });

    map.addLayer({
        "id": "circle-third-layer",
        "type": "fill",
        "source": "circle-third",
        "layout": {},
        "paint": {
            "fill-color": "pink",
            "fill-opacity": 0.2
        }
    });
    var geoJSONCircleFourth = createGeoJSONCircle([-83.73871, 42.27945], 3.5);
    map.addSource("circle-fourth", {
        type: 'geojson',
        data: geoJSONCircleFourth
    });

    map.addLayer({
        "id": "circle-fourth-layer",
        "type": "fill",
        "source": "circle-fourth",
        "layout": {},
        "paint": {
            "fill-color": "orange",
            "fill-opacity": 0.2
        }
    });
    var geoJSONCircleFifth = createGeoJSONCircle([-83.73871, 42.27945], 4.5);
    map.addSource("circle-fifth", {
        type: 'geojson',
        data: geoJSONCircleFifth
    });

    map.addLayer({
        "id": "circle-fifth-layer",
        "type": "fill",
        "source": "circle-fifth",
        "layout": {},
        "paint": {
            "fill-color": "yellow",
            "fill-opacity": 0.2
        }
    });
    var geoJSONCircleSixth = createGeoJSONCircle([-83.73871, 42.27945], 5.5);
    map.addSource("circle-sixth", {
        type: 'geojson',
        data: geoJSONCircleSixth
    });

    map.addLayer({
        "id": "circle-sixth-layer",
        "type": "fill",
        "source": "circle-sixth",
        "layout": {},
        "paint": {
            "fill-color": "green",
            "fill-opacity": 0.2
        }
    });
    var geoJSONCircleSeventh = createGeoJSONCircle([-83.73871, 42.27945], 7.5);
    map.addSource("circle-seventh", {
        type: 'geojson',
        data: geoJSONCircleSeventh
    });

    map.addLayer({
        "id": "circle-seventh-layer",
        "type": "fill",
        "source": "circle-seventh",
        "layout": {},
        "paint": {
            "fill-color": "grey",
            "fill-opacity": 0.2
        }
    });
    var geoJSONCircleEighth = createGeoJSONCircle([-83.73871, 42.27945], 10.5);
    map.addSource("circle-eighth", {
        type: 'geojson',
        data: geoJSONCircleEighth
    });

    map.addLayer({
        "id": "circle-eighth-layer",
        "type": "fill",
        "source": "circle-eighth",
        "layout": {},
        "paint": {
            "fill-color": "black",
            "fill-opacity": 0.2
        }
    });
});
