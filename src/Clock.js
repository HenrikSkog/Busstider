import React, { useEffect, useState } from 'react';

export default function Clock() {
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const updateClock = setInterval(() => {
      setClock(new Date());
    }, 1000);
    return () => clearInterval(updateClock);
  }, [clock]);

  return <div>{clock.toTimeString().slice(0, 8)}</div>;
}
