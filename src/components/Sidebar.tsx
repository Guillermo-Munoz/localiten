 "use client";
import { useState } from "react";

/**
 * Interfaz para representar un tesoro básico
 * @interface Treasure
 * @property {string | number} id - Identificador único del tesoro
 * @property {string} name - Nombre descriptivo del tesoro
 */
interface Treasure {
  id: string | number;
  name: string;
}

/**
 * Propiedades del componente Sidebar
 * @interface SidebarProps
 * @property {Treasure[]} [treasures] - Lista de tesoros encontrados por otros usuarios
 * @property {Treasure[]} [myTreasures] - Lista de tesoros creados por el usuario actual
 * @property {boolean} isOpen - Estado de visibilidad del sidebar
 * @property {() => void} onClose - Función para cerrar el sidebar
 */
interface SidebarProps {
  treasures?: Treasure[];
  myTreasures?: Treasure[];
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Componente Sidebar para mostrar listas de tesoros
 * - Muestra dos secciones colapsables: Tesoros Escondidos y Tesoros Encontrados
 * - Permite alternar la visibilidad de cada sección
 * - Incluye animación de despliegue/cierre
 */
export default function Sidebar({
  treasures = [],
  myTreasures = [],
  isOpen,
  onClose
}: SidebarProps) {
  // Estado para controlar la visibilidad de cada sección
  const [showMyTreasures, setShowMyTreasures] = useState(true);
  const [showFoundTreasures, setShowFoundTreasures] = useState(true);

  return (
    <div 
      className={`
        fixed top-18 right-0 bg-amber-50 h-full w-60 shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      {/* Encabezado del Sidebar con botón de cierre */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Tesoros</h2>
        <button 
          className="text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          ×
        </button>
      </div>
      
      {/* Contenido principal del Sidebar */}
      <div className="p-4">
        {/* Sección de Tesoros Escondidos (creados por otros usuarios) */}
        <div className="mb-2 flex justify-between items-center cursor-pointer" 
          onClick={() => setShowFoundTreasures(!showFoundTreasures)}
          role="button"
          aria-expanded={showFoundTreasures}
        >
          <h3 className="text-lg font-semibold text-gray-700">
            Escondidos ({treasures.length})
          </h3>
          <span className="text-xl">{showFoundTreasures ? "▼" : "▶"}</span>
        </div>

        {/* Lista de Tesoros Escondidos (renderizado condicional) */}
        {showFoundTreasures && (
          <ul className="space-y-2 mb-6" role="list">
            {treasures.length > 0 ? (
              treasures.map((t) => (
                <li 
                  key={t.id} 
                  className="p-2 bg-gray-50 rounded-md text-gray-800"
                  role="listitem"
                >
                  {t.name}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500 italic">No se encontraron tesoros</li>
            )}
          </ul>
        )}

        {/* Sección de Tesoros Encontrados (creados por el usuario) */}
        <div className="mb-2 flex justify-between items-center cursor-pointer" 
          onClick={() => setShowMyTreasures(!showMyTreasures)}
          role="button"
          aria-expanded={showMyTreasures}
        >
          <h3 className="text-lg font-semibold text-gray-700">
            Encontrados ({myTreasures.length})
          </h3>
          <span className="text-xl">{showMyTreasures ? "▼" : "▶"}</span>
        </div>

        {/* Lista de Mis Tesoros (renderizado condicional) */}
        {showMyTreasures && (
          <ul className="space-y-2" role="list">
            {myTreasures.length > 0 ? (
              myTreasures.map((t) => (
                <li 
                  key={t.id} 
                  className="p-2 bg-gray-50 rounded-md text-gray-800"
                  role="listitem"
                >
                  {t.name}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500 italic">Aún no has creado tesoros</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}