import { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function ReadAlert(props) {
    return (
        <>
            {props.featureCollections.map((loc) => {
                // console.log("loc.location : ", loc.location);
                return (
                    <Source
                        key={loc._id}
                        id="alert-area"
                        type="geojson"
                        data={loc.location}
                    >
                        <Layer
                            id="point"
                            type="circle"
                            paint={{
                                "circle-radius": 0,
                                "circle-color": "#ed5338",
                            }}
                        />
                        <Layer
                            id="line"
                            type="line"
                            paint={{
                                "line-width": 2,
                                "line-color": "#ed5338",
                            }}
                        />
                        <Layer
                            id="polygon"
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
