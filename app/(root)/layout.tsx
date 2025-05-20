import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="root-layout">
      <nav>
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/logo.svg"} alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">ProMock</h2>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
