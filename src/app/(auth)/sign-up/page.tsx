"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signUpSchema = z.object({
  name: z.string().min(1, "নাম আবশ্যক"),
  email: z.string().email("সঠিক ইমেইল দিন"),
  password: z.string().min(8, "পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে"),
});

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (values: SignUpValues) => {
    setIsPending(true);
    const { data, error } = await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    
    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      setIsPending(false);
    } else {
      toast.success("রেজিস্ট্রেশন সফল হয়েছে! লগইন করুন।");
      router.push("/sign-in");
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    await signIn.social({ provider, callbackURL: "/" });
  };

  return (
    <Container className="py-12 flex justify-center">
      <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-[24px] p-8 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-base-content mb-2">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="text-sm text-base-content/70">নতুন অ্যাকাউন্টের জন্য তথ্য দিন</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">নাম</label>
            <input
              {...register("name")}
              type="text"
              disabled={isPending}
              className="w-full h-10 px-3 rounded-[8px] border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="আপনার নাম"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-error">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-base-content mb-1">ইমেইল</label>
            <input
              {...register("email")}
              type="email"
              disabled={isPending}
              className="w-full h-10 px-3 rounded-[8px] border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-error">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-base-content mb-1">পাসওয়ার্ড</label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                disabled={isPending}
                className="w-full h-10 pl-3 pr-10 rounded-[8px] border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-error">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-10 mt-6 rounded-[8px] bg-primary text-primary-content font-semibold hover:bg-primary-strong disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isPending && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            রেজিস্টার করুন
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-px bg-base-300 flex-1"></div>
          <span className="text-xs text-base-content/50 uppercase">অথবা</span>
          <div className="h-px bg-base-300 flex-1"></div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            className="h-10 flex items-center justify-center gap-2 rounded-[8px] border border-base-300 hover:bg-base-200 transition-colors text-sm font-medium"
          >
            Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            className="h-10 flex items-center justify-center gap-2 rounded-[8px] border border-base-300 hover:bg-base-200 transition-colors text-sm font-medium"
          >
            GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-base-content/70">
          ইতিমধ্যেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/sign-in" className="text-primary hover:underline font-medium">
            লগইন করুন
          </Link>
        </p>
      </div>
    </Container>
  );
}
