// import * as turf from "@turf/turf";
import { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function RedAlert(props) {
    const featureCollections = props.featureCollections.map((loc) => {
        loc.location.features = loc.location.features.map((feature) => {
            // const latlng = turf.centroid(feature.geometry).geometry.coordinates;
            feature.properties = {
                name: loc.name,
                // longitude: latlng[0],
                // latitude: latlng[1],
            };
            return feature;
        });
        return loc;
    });
    // console.log("featureCollections", featureCollections);
    return (
        <>
            {featureCollections.map((loc, index) => {
                // console.log("loc.location : ", loc.location);
                return (
                    <Source
                        key={loc._id}
                        id={`feature-collection-${index}`}
                        type="geojson"
                        data={loc.location}
                    >
                        <Layer
                            id={`feature-layer-${index}`}
                            type="symbol" // Use 'symbol' for labels
                            layout={{
                                "text-field": ["get", "name"], // Specify the property from which to get the label text
                                "text-font": [
                                    "Open Sans Bold",
                                    "Arial Unicode MS Bold",
                                ], // Specify the font stack for the label text
                                "text-size": 12, // Specify the font size
                                "text-anchor": "top", // Specify the anchor point of the text
                            }}
                            paint={{
                                "text-color": "black", // Specify the text color
                            }}
                        />
                        {/* <Layer
                            id="point"
                            type="circle"
                            paint={{
                                "circle-radius": 0,
                                "circle-color": "#ed5338",
                            }}
                        /> */}
                        <Layer
                            id={`line-${index}`}
                            type="line"
                            paint={{
                                "line-width": 2,
                                "line-color": "#ed5338",
                            }}
                        />
                        <Layer
                            id={`polygon-${index}`}
                            type="fill"
                            paint={{
                                "fill-color": "#ed5338",
                                "fill-opacity": 0.4,
                            }}
                        />
                    </Source>
                );
            })}
        </>
    );
}
