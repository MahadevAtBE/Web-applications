"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router=useRouter()
  const [user, setuser] = useState([])
  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    let r = await fetch('http://localhost:5001/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    setuser (await r.json())
    console.log("user:",user)
    if (r.status==201) {
      router.push("/login")
      reset();
    }
  }

  return (

    <div className="min-h-[77vh] flex flex-col bg-background text-foreground">
    <div className="font-bold text-4xl mx-60 mt-10">Create a new account.</div>
  <div className="container w-72 m-auto border-2 rounded-lg border-[#ffb703]">
    <form
      className="flex flex-col items-center justify-center gap-4 bg-[#219ebc] p-4 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Name Input */}
      <input
        className="rounded-full w-[90%] py-2 px-4 bg-[#8ecae6] text-[#023047] placeholder-[#023047] outline-none focus:ring-2 focus:ring-[#ffb703]"
        type="text"
        placeholder={
          errors.name ? errors.name.message : "Name"
        }
        {...register("name", {
          required: { value: true, message: "Name Required!" },
        })}
      />
      {errors.name && (
        <span className="text-[#fb8500] text-sm">
          {errors.name.message}
        </span>
      )}

      {/* Email Input */}
      <input
        className="rounded-full w-[90%] py-2 px-4 bg-[#8ecae6] text-[#023047] placeholder-[#023047] outline-none focus:ring-2 focus:ring-[#ffb703]"
        type="email"
        placeholder={
          errors.email ? errors.email.message : "Email"
        }
        {...register("email", {
          required: { value: true, message: "Email Required!" },
        })}
      />
      {errors.email && (
        <span className="text-[#fb8500] text-sm">
          {errors.email.message}
        </span>
      )}

      {/* Password Input */}
      <input
        className="password rounded-full w-[90%] py-2 px-4 bg-[#8ecae6] text-[#023047] placeholder-[#023047] outline-none focus:ring-2 focus:ring-[#ffb703]"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: { value: true, message: "Password Required!" },
          minLength: { value: 4, message: "Minimum 4 characters" },
          maxLength: { value: 8, message: "Maximum 8 characters" },
        })}
      />
      {errors.password && (
        <span className="text-[#fb8500] text-sm">
          {errors.password.message}
        </span>
      )}

      {/* Submit Button */}
      <input
        type="submit"
        className="cursor-pointer border-2 px-4 py-2 rounded-full text-white bg-[#143a4d] hover:bg-[#ffb703] hover:text-[#023047] transition-all"
      />

      {/* Error Message */}
      {user.Massege && (
        <p className="text-[#fb8500] text-sm">
          {user.Massege}
        </p>
      )}
    </form>
  </div>
</div>

  );
}
