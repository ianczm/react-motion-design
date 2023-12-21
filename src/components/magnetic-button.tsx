import React from "react";

export default function MagneticButton({ children }: Readonly<{ children: React.ReactNode }>) {
  return <button>{children}</button>;
}
