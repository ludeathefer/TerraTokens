import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Marker } from "react-leaflet";

// Sample GeoJSON data for Kathmandu (replace with actual data)
const kathmanduGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [85.32377094230736, 27.747459595040763],
            [85.31898716720703, 27.747251525026776],
            [85.31424951683663, 27.746629321184404],
            [85.30960366962555, 27.745598982700084],
            [85.30509441578104, 27.74417044370096],
            [85.30076522407957, 27.742357477144175],
            [85.29665782161426, 27.74017756158434],
            [85.29281179060905, 27.737651712125047],
            [85.28926418623307, 27.734804277210472],
            [85.28604917913411, 27.731662703245654],
            [85.28319772615687, 27.728257269346727],
            [85.28073727242463, 27.724620794811457],
            [85.27869148764454, 27.720788322162708],
            [85.27708003915252, 27.71679677885177],
            [85.27591840384416, 27.71268462091076],
            [85.27521772075121, 27.708491462013566],
            [85.27498468562065, 27.704257691540015],
            [85.27522148843961, 27.700024085338086],
            [85.27592579443096, 27.695831412942923],
            [85.27709076862199, 27.691720045038373],
            [85.27870514366961, 27.68772956493772],
            [85.28075333021242, 27.683898387814565],
            [85.28321556861604, 27.680263391333927],
            [85.28606812058932, 27.67685956121792],
            [85.28928349877498, 27.673719655131848],
            [85.29283073206751, 27.670873888096228],
            [85.29667566407946, 27.668349642420427],
            [85.30078128187523, 27.66617120491609],
            [85.30510807181466, 27.664359533885918],
            [85.30961439910287, 27.662932058098093],
            [85.31425690742947, 27.661902509651096],
            [85.31899093489868, 27.66128079231133],
            [85.32377094230736, 27.66107288656918],
            [85.32855094971606, 27.66128079231133],
            [85.33328497718526, 27.661902509651096],
            [85.33792748551186, 27.662932058098093],
            [85.34243381280008, 27.664359533885918],
            [85.34676060273951, 27.66617120491609],
            [85.3508662205353, 27.668349642420427],
            [85.35471115254722, 27.670873888096228],
            [85.35825838583975, 27.673719655131848],
            [85.36147376402543, 27.67685956121792],
            [85.36432631599868, 27.680263391333927],
            [85.3667885544023, 27.683898387814565],
            [85.36883674094511, 27.68772956493772],
            [85.37045111599275, 27.691720045038373],
            [85.37161609018378, 27.695831412942923],
            [85.37232039617514, 27.700024085338086],
            [85.37255719899409, 27.704257691540015],
            [85.37232416386352, 27.708491462013566],
            [85.37162348077058, 27.71268462091076],
            [85.37046184546222, 27.71679677885177],
            [85.36885039697022, 27.720788322162708],
            [85.36680461219012, 27.724620794811457],
            [85.36434415845787, 27.728257269346727],
            [85.36149270548063, 27.731662703245654],
            [85.35827769838166, 27.734804277210472],
            [85.35473009400567, 27.737651712125047],
            [85.35088406300049, 27.74017756158434],
            [85.34677666053518, 27.742357477144175],
            [85.34244746883368, 27.74417044370096],
            [85.33793821498921, 27.745598982700084],
            [85.3332923677781, 27.746629321184404],
            [85.32855471740773, 27.747251525026776],
            [85.32377094230736, 27.747459595040763],
          ],
        ],
      },
    },
  ],
};

const MapComponent = ({ city, latLang, height }) => {
  // Default center and zoom level
  // const center: [number, number] = latLang; // Coordinates for Kathmandu
  const zoom: number = 12;

  return (
    <div>
      <MapContainer
        center={latLang}
        zoom={zoom}
        scrollWheelZoom={true}
        className={`h-[${height}px] w-full`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={latLang} />
        {/* {city === "kathmandu" && (
          <GeoJSON
            data={kathmanduGeoJSON}
            style={() => ({
              color: "#3388ff",
              weight: 2,
              fillOpacity: 0.2,
            })}
          />
        )} */}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
