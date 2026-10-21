import { useEffect, useState } from "react";

function localTime() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" }).toLowerCase();
}

export function StatusBar() {
  const [time, setTime] = useState(localTime);

  useEffect(() => {
    const id = setInterval(() => setTime(localTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="statusbar" aria-hidden="true">
      <span>lexi@unc</span>
      <span className="statusbar-time">{time}</span>
      <span>
        <span className="status-dot" /> status: building
      </span>
    </div>
  );
}
