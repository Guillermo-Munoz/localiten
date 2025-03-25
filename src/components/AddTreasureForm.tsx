import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: "/icon.svg", // Path to your custom icon
  iconSize: [40, 40],    // Adjust this size based on your icon's dimensions
  iconAnchor: [20, 40],  // Adjust anchor point based on icon size
  popupAnchor: [0, -32], // Adjust position of the popup
});

interface Treasure {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
}

export default function Map() {
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [newTreasure, setNewTreasure] = useState<Partial<Treasure>>({});
  const [showForm, setShowForm] = useState(false);

  // Manejador de clicks en el mapa
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        if (showForm) {
          setNewTreasure({
            ...newTreasure,
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
          });
        }
      },
    });
    return null;
  };

  // Guardar nuevo tesoro
  const handleSaveTreasure = async () => {
    try {
      const response = await fetch("/api/treasures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTreasure),
      });
      const savedTreasure = await response.json();
      setTreasures([...treasures, savedTreasure]);
      setShowForm(false);
      setNewTreasure({});
    } catch (error) {
      console.error("Error saving treasure:", error);
    }
  };

  return (
    <div className="relative h-screen">
      <MapContainer
        center={[40.4168, -3.7038]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />

        {/* Mostrar todos los tesoros */}
        {treasures.map((treasure) => (
          <Marker
            key={treasure.id}
            position={[treasure.latitude, treasure.longitude]}
            icon={customIcon} // Asigna el ícono personalizado
          >
            <Popup>
              <strong>{treasure.name}</strong>
              <p>{treasure.description || 'Sin descripción'}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Botón y formulario flotante */}
      <div className="absolute top-5 right-5 z-[1000] bg-white p-4 rounded-lg shadow-md">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Añadir Tesoro
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nombre del tesoro"
              value={newTreasure.name || ""}
              onChange={(e) => setNewTreasure({ ...newTreasure, name: e.target.value })}
              className="p-2 border border-gray-300 rounded-md w-52"
            />
            <textarea
              placeholder="Descripción"
              value={newTreasure.description || ""}
              onChange={(e) => setNewTreasure({ ...newTreasure, description: e.target.value })}
              className="p-2 border border-gray-300 rounded-md h-20"
            />
            <div className="text-sm text-gray-500">
              {newTreasure.latitude
                ? `Posición: ${newTreasure.latitude?.toFixed(4)}, ${newTreasure.longitude?.toFixed(4)}`
                : "Haz clic en el mapa para seleccionar posición"}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSaveTreasure}
                disabled={!newTreasure.name || !newTreasure.latitude}
                className={`px-3 py-2 rounded-md text-white ${
                  !newTreasure.name || !newTreasure.latitude
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setNewTreasure({});
                }}
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancelar
              </button>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
