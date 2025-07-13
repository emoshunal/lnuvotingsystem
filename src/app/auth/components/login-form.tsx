

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPin, setShowPin] = useState(false)
  const router = useRouter()
  const formatStudentId = (value: string) => {
    const raw = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

    let formatted = "";
    for (let i = 0; i < raw.length; i++) {
      if (i === 2 || i === 6) {
        formatted += "-";
      }
      formatted += raw[i];
    }

    return formatted;
  };
  const formSchema = z.object({
    userid: z
      .string()
      .min(11, { message: "Student ID must be formatted like 20-8909-99A" })
      .regex(/^[A-Z0-9]{2}-[A-Z0-9]{4}-[A-Z0-9]{3,4}$/, {
        message: "Invalid format. Use: 20-8909-99A",
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userid: "",
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Submitted Student ID:", data.userid);
    setShowPin(true)
    // You can add login logic or redirect here
  };


  const formSchemaPin = z.object({
    pinId: z.string().length(4, { message: "PIN must be 4 digits" })
          
  })

  const formPin = useForm<z.infer<typeof formSchemaPin>>({
    resolver: zodResolver(formSchemaPin),
    defaultValues: {
      pinId: "",
    },
  })

  const pinSubmit = (data: z.infer<typeof formSchemaPin>) => {
    console.log("PIN value:", data.pinId); 
    router.push("/voter")
  }

  return (
    <Form {...form}>
      <form className={cn(`flex flex-col gap-6 ${showPin ? "hidden" : ""}`, className)} {...props}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your student id to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="userid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Student ID</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="20-8909-99A"
                      className="py-6 uppercase tracking-widest text-2xl font-bold"
                      maxLength={12}
                      value={field.value}
                      onChange={(e) => {
                        const formatted = formatStudentId(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full py-6 text-lg">
            Continue
          </Button>
        </div>
      </form>

      {/* PIN */}

      <form
        className={cn(`flex flex-col gap-6 ${showPin ? "" : "hidden"}`, className)}
        {...props}
        onSubmit={formPin.handleSubmit(pinSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Enter your PIN</h1>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={formPin.control}
              name="pinId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={4} {...field}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0} className="py-8 px-2 w-[50px] text-3xl font-bold" />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={1} className="py-8 px-2 w-[50px] text-3xl font-bold" />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={2} className="py-8 px-2 w-[50px] text-3xl font-bold" />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={3} className="py-8 px-2 w-[50px] text-3xl font-bold" />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full py-6 text-lg">
            Continue
          </Button>
        </div>
      </form>

    </Form>
  )
}
