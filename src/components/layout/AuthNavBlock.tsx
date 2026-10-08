"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { UserMenu } from "./UserMenu";

export function AuthNavBlock() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex gap-2 items-center">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-base-200 animate-pulse"></div>
        <div className="w-20 h-5 bg-base-200 rounded animate-pulse hidden sm:block"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex gap-2">
        <Link
          href="/sign-in"
          className="h-9 px-3 text-sm sm:h-10 sm:px-[17px] rounded-[8px] border border-base-300 text-base-content hover:bg-base-200 flex items-center justify-center font-medium"
        >
          সাইন ইন
        </Link>
        <Link
          href="/sign-up"
          className="h-9 px-3 text-sm sm:h-10 sm:px-[17px] rounded-[8px] bg-primary text-primary-content hover:bg-primary/90 flex items-center justify-center font-medium"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return <UserMenu user={session.user} />;
}
