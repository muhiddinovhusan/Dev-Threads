"use client"

import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import toast from "react-hot-toast"

const SignInForm = () => { 
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

const handleSubmit = async(e: React.FormEvent) => {
e.preventDefault();
const formData = new FormData(formRef.current!)
const email = formData.get('email') as string
const password = formData.get('password') as string

try {
  const result = await signIn("credentials", {
  redirect:false,
  email,
  password
  })
  if (result?.error) {
  throw new Error(result.error)
  }
 
  toast.success("Succesfully signed in")
  router.push("/")
  
}catch (error:any) {
  toast.error(error.message)
}
}
  return (
<div className="mt-8 sm:max-w-2xl md:outline outline-1 outline-gray-200">
  <div className="px-4 py-8 sm:rounded-lg sm:px-10">
    <h1 className="text-2xl mb-5">Sign In</h1>
    <form 
    ref={formRef}
    onSubmit={handleSubmit}
    className="space-y-6 mb-5"
    >
<Input
type="email"
id="email"
label="email"
/>
<Input
type="password"
id="password"
label="Password"
/>
<Button type="submit">Log In</Button>
    </form>
    <Link href={"/sign-up"}>
      <span className="mt-3 hover:underline "></span>
  Dont have an account? Create one &#8594;
    </Link>
  </div>
</div>
  )
}

export default SignInForm