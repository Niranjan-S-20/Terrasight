import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useRef } from "react";

export default function MapComponent({ setAOI }) {

  const featureGroupRef = useRef();

  const onCreated = (e) => {
    const layer = e.layer;
    const geo = layer.toGeoJSON();
    const coords = geo.geometry.coordinates;
    setAOI(coords);
  };

  return (
    <MapContainer center={[20, 78]} zoom={5} style={{ height: "500px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={onCreated}
          draw={{
            rectangle: false,
            circle: false,
            marker: false,
            polyline: false
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
}
