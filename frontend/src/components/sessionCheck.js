import React, { useEffect, useState } from "react";

export default function SessionCheck() {
  const [sessionValues, setSessionValues] = useState("no data right now");

  useEffect(() => {
    const fetchSessionValues = async () => {
      await fetch("http://localhost:8000/session", { credentials: "include" })
        .then(() =>
          fetch("http://localhost:8000/session/sessionValues", {
            credentials: "include",
          })
        )
        .then(async (response) => {
          const data = await response.text();
          setSessionValues(data);
        })
        .catch((error) => console.error("Error:", error));
    };

    fetchSessionValues();
  }, []);

  return <div>{sessionValues}</div>;
}
