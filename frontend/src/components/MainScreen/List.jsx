import { React } from "react";
import * as turf from "@turf/turf";

import Location from "./../../assets/icons/location-dot.svg";

function List(props) {
    const filteredData = props.location?.filter((el) => {
        return props.input === ""
            ? false
            : el.slug.toLowerCase().includes(props.input) ||
                  el.address.toLowerCase().includes(props.input);
    });

    const filteredSortedData =
        filteredData && filteredData.length > 0
            ? filteredData
                  .map((data) => {
                      const startPoint = turf.point([
                          props.latlng.longitude,
                          props.latlng.latitude,
                      ]);
                      const endPoint = data.location;
                      const options = { units: "kilometers" };
                      const distance = turf
                          .distance(startPoint, endPoint, options)
                          .toFixed(2);
                      data.distance = distance;
                      return data;
                  })
                  .sort(function (a, b) {
                      return a.distance - b.distance;
                  })
            : [];
    return (
        <div>
            {filteredSortedData.length ? (
                <div className="search-area">
                    {filteredSortedData.map((item) => {
                        return (
                            <div className="search-fields">
                                <img src={Location} alt="" />
                                <span className="search-name">
                                    {`${item.name} (${item.distance} KM)`}
                                </span>
                                <span className="search-address">
                                    {item.address}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}

export default List;
