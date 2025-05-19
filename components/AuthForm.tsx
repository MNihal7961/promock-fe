"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

const authFormSchema = (type: FormType) => {
  return z.object({
    username:
      type === "sign-up" ? z.string().min(1).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3).max(30),
  });
};

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const isSignIn = type === "sign-in";
  const formSchema = authFormSchema(type);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-in") {
        console.log("Sign in data: ", values);
        toast.success("Sign in successful");
        router.push("/");
      } else {
        console.log("Sign up data: ", values);
        toast.success("Account created successfully");
        router.push("/signin");
      }
    } catch (error) {
      console.log(`Error while ${type} form submission: `, error);
      toast.error(`Error while ${type} form submission: ${error}`);
    }
  };

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src={"/logo.svg"} alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">ProMock</h2>
        </div>
        <h3>Practice job interview with our AI-powered mock interviews</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                label="Name"
                name="username"
                placeholder="Your Name"
                type="text"
              />
            )}
            <FormField
              control={form.control}
              label="Email"
              name="email"
              placeholder="Your Email Address"
              type="email"
            />
            <FormField
              control={form.control}
              label="Password"
              name="password"
              placeholder="Enter Your Password"
              type="password"
            />
            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create An Account"}
            </Button>
          </form>
          <p className="text-center">
            {isSignIn
              ? "Don't have an account yet?"
              : "Have an account already?"}
            <Link
              className="text-user-primary ml-1"
              href={isSignIn ? "/signup" : "/signin"}
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
