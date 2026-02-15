import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

interface Village {
  name: string;
  risk: string;
  cases: number;
  lat: number;
  lng: number;
}

interface VillageMapProps {
  villages: Village[];
}

const containerStyle = { width: "100%", height: "400px", borderRadius: "0.75rem" };
const center = { lat: 25.5, lng: 92.0 };

const riskColors: Record<string, string> = {
  high: "#ef4444",
  medium: "#eab308",
  low: "#22c55e",
};

const VillageMap = ({ villages }: VillageMapProps) => {
  const [selected, setSelected] = useState<Village | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="w-full h-[400px] rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
        Google Maps API key not configured
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
        {villages.map((v, i) => (
          <Marker
            key={i}
            position={{ lat: v.lat, lng: v.lng }}
            onClick={() => setSelected(v)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: riskColors[v.risk] || "#999",
              fillOpacity: 0.9,
              strokeColor: "#fff",
              strokeWeight: 2,
            }}
          />
        ))}
        {selected && (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
            <div className="p-1">
              <h4 className="font-bold text-sm">{selected.name}</h4>
              <p className="text-xs">Risk: <span className="font-semibold" style={{ color: riskColors[selected.risk] }}>{selected.risk.toUpperCase()}</span></p>
              <p className="text-xs">Cases: {selected.cases}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default VillageMap;
