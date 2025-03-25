import { useState, useEffect } from "react";

export default function TreasurePopup({ treasureId }: { treasureId: string }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/treasure/${treasureId}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error cargando comentarios:", err));
  }, [treasureId]);

  return (
    <div>
      <h3>Comentarios</h3>
      <ul>
        {comments.map((c: any) => (
          <li key={c.id}>
            <strong>{c.user.name}:</strong> {c.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
