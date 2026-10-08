"use client";

import { useSession } from "@/lib/auth-client";
import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { Edit } from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <Container className="py-12 flex justify-center">
        <div className="w-full max-w-2xl bg-base-100 border border-base-300 rounded-[24px] p-8 shadow-sm flex flex-col items-center gap-6 animate-pulse">
          <div className="w-24 h-24 rounded-full bg-base-200"></div>
          <div className="w-48 h-6 bg-base-200 rounded"></div>
          <div className="w-64 h-4 bg-base-200 rounded"></div>
        </div>
      </Container>
    );
  }

  if (!session) {
    return null; // Handled by middleware
  }

  const { user } = session;

  return (
    <Container className="py-12 flex justify-center">
      <div className="w-full max-w-2xl bg-base-100 border border-base-300 rounded-[24px] p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold text-base-content mb-8">আমার প্রোফাইল</h1>
        
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-24 h-24 rounded-full bg-primary text-primary-content flex items-center justify-center text-4xl overflow-hidden shadow-sm">
            {user.image ? (
              <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="font-medium">{user.name.charAt(0)}</span>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-base-content">{user.name}</h2>
            <p className="text-sm text-base-content/70 mt-1">{user.email}</p>
          </div>
        </div>

        <Link
          href="/profile/update"
          className="inline-flex items-center gap-2 h-10 px-5 rounded-[8px] bg-primary text-primary-content hover:bg-primary/90 font-medium transition-colors"
        >
          <Edit size={16} />
          তথ্য আপডেট করুন
        </Link>
      </div>
    </Container>
  );
}
