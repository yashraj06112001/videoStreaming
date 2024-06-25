import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      This is my profile which contains token that was created in jwt and here
      my name is {user.username}
      my email is {user.email} and my id is {user.id}
    </div>
  );
}
