import { Button } from "../components/ui/button";

import { Label } from "../components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../components/ui/input";

const formSchema = z.object({
  metaMaskAccount: z.string(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().regex(new RegExp("^\\d{10}$"), {
    message: "Please enter a valid 10-digit phone number.",
  }),
});

const Signup = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submitted", values);
  }

  return (
    <div className="w-screen h-screen bg-no-repeat bg-white flex flex-col">
      <div className="h-24 w-screen flex flex-row items-center justify-between px-14 sticky z-10">
        <h1 className="text-2xl font-semibold text-black">TerraTokens</h1>
      </div>
      <div className="flex flex-row flex-1 items-center justify-between h-full w-full ">
        <div className="flex flex-col w-1/2 h-full items-start justify-center ml-28 -translate-y-8">
          <h1 className="font-semibold text-2xl text-black gap-8">
            Create Your Account
          </h1>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-full py-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        Metamask Account
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Name</FormLabel>
                      <FormControl>
                        <Input className="w-80" placeholder="Name" {...field} />
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
                      <FormLabel className="text-black">Email</FormLabel>
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
                      <FormLabel className="text-black">Phone Number</FormLabel>
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

        <div className="flex flex-col w-1/2 h-full bg-no-repeat items-center p-10 gap-4">
          <div className="absolute bottom-0 ">
            <img
              src="/src/assets/signup-bg.png"
              className="object-contain h-[34rem]"
            />
          </div>
          <h1 className="font-semibold text-black text-3xl text-center">
            Don’t have money saved up?
          </h1>
          <Label className="font-normal text-black text-lg text-center w-[22rem] leading-tight">
            No Worry. With TerraTokens, you can invest in Real Estate with as
            much as Rs 1000
          </Label>
        </div>
      </div>
    </div>
  );
};

export default Signup;
