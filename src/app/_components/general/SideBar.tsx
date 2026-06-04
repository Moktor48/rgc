"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import type { Session } from "../../../../generated/prisma";
import SignButton from "./SignButton";

export default function SideBar({ session }: { session: Session }) {
  //Sidebar set-up
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600 && sidebar) {
        setSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebar]);

  return (
    <div>
      <button
        onClick={() => setSidebar(!sidebar)}
        className="fixed top-0 right-0 z-900 text-[lightgray] hover:cursor-pointer"
      >
        <span className="menu-button material-symbols-outlined">
          {sidebar ? "Close" : "Menu"}
        </span>
      </button>
      <nav
        className={`fixed top-auto z-5 flex h-full w-77.5 flex-col overflow-x-visible bg-[#1f1f1f] pt-15 text-left transition-all duration-500 ${
          sidebar ? "-right-25" : "-right-80"
        }`}
      >
        <ul>
          {/* <li>
            <Link className="links" href="/">
              <span className="material-symbols-outlined">Home</span> Home
            </Link>
          </li> */}

          <li>
            <Link className="links" href={`/dashboard`}>
              <span className="material-symbols-outlined">Home</span> Dashboard
            </Link>
          </li>
          <li>
            <Link className="links" href="/calendar">
              <span className="material-symbols-outlined">calendar_month</span>{" "}
              Calendar
            </Link>
          </li>
          {/* {session?.user.admin && (
            <li>
              <Link className="links" href="/admin">
                <span className="material-symbols-outlined">
                  admin_panel_settings
                </span>{" "}
                Admin
              </Link>
            </li>
          )} */}
          {/* <li>
            <Link className="links" href="/about">
              <span className="material-symbols-outlined">Question_Mark</span>{" "}
              About
            </Link>
          </li>
          <li>
            <Link className="links" href="/contact">
              <span className="material-symbols-outlined">Email</span> Contact
            </Link>
          </li> */}
          <SignButton session={session} />
        </ul>
      </nav>
    </div>
  );
}
