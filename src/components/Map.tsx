 "use client";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";
import Sidebar from "./Sidebar";
import { Treasure } from "./types";


const customIcon = new L.Icon({
  iconUrl: "./icon.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function Map() {
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newTreasure, setNewTreasure] = useState<Partial<Treasure>>({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/api/treasures")
      .then((res) => res.json())
      .then((data) => setTreasures(data))
      .catch(console.error);
  }, []);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        if (showForm) {
          setNewTreasure({
            ...newTreasure,
            latitude: e.latlng.lat,
            longitude: e.latlng.lng
          });
        }
      }
    });
    return null;
  };

  const handleSaveTreasure = async () => {
    try {
      if (!newTreasure.name || !newTreasure.latitude || !newTreasure.longitude) {
        alert('Por favor completa todos los campos obligatorios')
        return
      }
  
      const response = await fetch('/api/treasures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newTreasure.name,
          latitude: newTreasure.latitude,
          longitude: newTreasure.longitude,
          description: newTreasure.description
        })
      })
  
      if (!response.ok) {
        throw new Error(await response.text())
      }
  
      const savedTreasure = await response.json()
      setTreasures([...treasures, savedTreasure])
      setShowForm(false)
      setNewTreasure({})
  
    } catch (error) {
      console.error('Error:', error)
      alert('Error al guardar: ' + (error instanceof Error ? error.message : 'Error desconocido'))
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden ">

      <div className={`h-full transition-all duration-300 ${isSidebarOpen ? 'w-[calc(100%-250px)]' : 'w-full'}`}>
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

          {treasures.map((treasure) => (
            <Marker 
              key={treasure.id} 
              position={[treasure.latitude, treasure.longitude]} 
              icon={customIcon}
            >
              <Popup>
                <strong>{treasure.name}</strong>
                <p>{treasure.description || "Sin descripción"}</p>
              </Popup>
            </Marker>
          ))}

          {newTreasure.latitude !== undefined && newTreasure.longitude !== undefined && (
            <Marker position={[newTreasure.latitude, newTreasure.longitude]}>
              <Popup>
                Nuevo tesoro en progreso...
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <Sidebar 
        treasures={treasures} 
        myTreasures={[]} 
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
          setShowForm(false);
        }}
      />
      
      {/* Contenedor de controles */}
      <div className="absolute top-[90px]  right-[20px] z-[1000] flex flex-col gap-[10px]">
        {/* Botón de menú */}
        {!isSidebarOpen && !showForm && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center justify-center w-20 h-10 px-4 py-2 text-lg text-white bg-[#626262] rounded cursor-pointer"
          >
            ☰
          </button>
        )}

        {/* Botón de añadir o formulario */}
        {!showForm && !isSidebarOpen ? (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center w-20 h-10 px-4 py-2 text-lg text-white bg-green-500 rounded cursor-pointer"
          >
            ＋
          </button>
        ) : showForm ? (
          <div className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow-md w-64">
            <input
              type="text"
              placeholder="Nombre"
              value={newTreasure.name || ''}
              onChange={(e) => setNewTreasure({...newTreasure, name: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Descripción"
              value={newTreasure.description || ''}
              onChange={(e) => setNewTreasure({...newTreasure, description: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded h-[60px]"
            />
            <div className="p-2 text-sm text-gray-600 bg-gray-100 rounded">
              {newTreasure.latitude 
                ? `Posición: ${newTreasure.latitude.toFixed(4)}, ${(newTreasure.longitude ?? 0).toFixed(4)}`
                : 'Haz clic en el mapa para seleccionar posición'}
            </div>
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleSaveTreasure}
                disabled={!newTreasure.name || !newTreasure.latitude}
                className="w-full px-4 py-2 text-white bg-green-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setNewTreasure({});
                }}
                className="w-full px-4 py-2 text-white bg-red-500 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}