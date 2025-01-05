"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import logoSignup from "../assets/logo-placeholder-image.png";
import { useMutation } from "@tanstack/react-query";
import { addUserApi } from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "../hooks/use-store";
// const pageHeight = window.innerHeight;
// const pageWidth = window.innerWidth;

const formSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z
    .string()
    .min(10)
    .max(10)
    .regex(/^\d+$/, "Phone number must be digits only"),
});
const Signup = () => {
  useEffect(() => {
    if (useStore.getState().isAuthenticated()) navigate("/dashboard");
  }, []);

  const navigate = useNavigate();
  const addUserMutation = useMutation({
    mutationFn: addUserApi,
    onSuccess: () => navigate("/login"),
    onError: (err) => console.log(err.message),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    addUserMutation.mutate({
      ...values,
      phoneNumber: values.phone,
      userPublicKey: accounts[0],
    });
  }

  return (
    <div className="flex flex-col   justify-center items-center h-screen w-screen ">
      <h1 className="mb-8">Signup</h1>
      <div className=" items-center bg-[black] flex justify-center flex-col  w-1/3  rounded-3xl pt-10 pb-5 ">
        <img src={logoSignup} className=" w-full h-24 object-contain " />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full px-10 py-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@abc.abc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="9800000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-[gray]">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
