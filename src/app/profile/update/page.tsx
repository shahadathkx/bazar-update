"use client";

import { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { Container } from "@/components/layout/Container";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const updateSchema = z.object({
  name: z.string().min(1, "নাম আবশ্যক"),
});

type UpdateValues = z.infer<typeof updateSchema>;

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();
  const [isPending, setIsPending] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateValues>({
    resolver: zodResolver(updateSchema),
  });

  useEffect(() => {
    if (session?.user?.name) {
      setValue("name", session.user.name);
    }
  }, [session, setValue]);

  const onSubmit = async (values: UpdateValues) => {
    setIsPending(true);
    
    // BetterAuth update user API
    const { data, error } = await authClient.updateUser({
      name: values.name,
    });
    
    if (error) {
      toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
      setIsPending(false);
    } else {
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    }
  };

  if (sessionPending) {
    return (
      <Container className="py-12 flex justify-center">
        <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-[24px] p-8 shadow-sm flex flex-col gap-6 animate-pulse">
          <div className="w-32 h-8 bg-base-200 rounded mb-4"></div>
          <div className="w-full h-10 bg-base-200 rounded"></div>
          <div className="w-full h-10 bg-base-200 rounded mt-4"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 flex justify-center">
      <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-[24px] p-8 shadow-sm relative">
        <Link 
          href="/profile" 
          className="absolute left-6 top-8 text-base-content/50 hover:text-base-content transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-base-content mb-2">তথ্য আপডেট করুন</h1>
          <p className="text-sm text-base-content/70">আপনার প্রোফাইলের নাম পরিবর্তন করুন</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">নতুন নাম</label>
            <input
              {...register("name")}
              type="text"
              disabled={isPending}
              className="w-full h-10 px-3 rounded-[8px] border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="আপনার নতুন নাম"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-error">{errors.name.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-10 mt-6 rounded-[8px] bg-primary text-primary-content font-semibold hover:bg-primary-strong disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isPending && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            আপডেট করুন
          </button>
        </form>
      </div>
    </Container>
  );
}
