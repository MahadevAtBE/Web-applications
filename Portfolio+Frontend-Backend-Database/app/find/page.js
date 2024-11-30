"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Find = () => {
    let [verify, setverify] = useState([])
    const {
        register,
        handleSubmit,
        setError,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        let r = await fetch('http://localhost:5001/find', {  // sendind email and getting matched data from backend
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        setverify(await r.json())  // parsing data to json
        console.log("verify=", verify)
        // console.log(typeof(verify))
        // console.log("x=",x)
        reset();
    }
    return (
        <div className='min-h-[77vh] flex flex-col  bg-background text-foreground'>

            <div className="font-bold text-4xl mx-60 mt-10">Find your account</div>
            <div className="font-bold text-4xl mx-60 mt-10">By email.</div>
            
            <div className='container w-72 m-auto border-2 rounded-lg border-white'>
                <form className=' flex flex-col items-center justify-center gap-4 bg-[#219ebc] p-2' onSubmit={handleSubmit(onSubmit)}>
                    {/* <input className='rounded-full w-[90%] py-1 px-3' type="text" placeholder={errors.name ? errors.name.message : "Name"} {...register("name", { required: { value: true, message: "Name Requird!" } })} />
                {errors.name && <span className='errormsg'>{errors.name.message}</span>} */}
                    <input className='rounded-full w-[90%] py-1 px-3 text-black placeholder:text-center' type="email" placeholder={errors.email ? errors.email.message : "email"} {...register("email", { required: { value: true, message: "Email Requird!" } })} />
                    {errors.email && <span className='errormsg'>{errors.email.message}</span>}
                    {/* <input className='password rounded-full w-[90%] py-1 px-3' type="password" placeholder={"Password"} {...register("password", { required: { value: true, message: "Password Requird!" }, minLength: { value: 4, message: "Minimum 4 charecter" }, maxLength: { value: 8, message: "Maximum 8 charecter" } })} />
                {errors.password && <span className='errormsg'>{errors.password.message}</span>} */}
                    <input type="submit" className='cursor-pointer border-2 px-3 rounded-full text-white bg-[#143a4d]' />
                </form>
                <div className="data">
                    {/* {JSON.stringify(verify)}  */}

                    {verify.error ? <p>{verify.error}</p> : null}   {/* if verify.error found */}
                    {verify.Name ?
                        <div>
                            <li>Name: {verify.Name}</li>
                            <li>Email: {verify.Email}</li>
                            <li>Password: {verify.Password}</li>
                            <li>id: {verify._id}</li>
                        </div> : null}   {/* if verify.Name found */}


                    {/* <p>v: {verify._v}</p> */}


                </div>
            </div>
            <style jsx>{`
            input::placeholder {
                color: #e9c46a; /* Default placeholder color */
                  }
              .errormsg{
                color:red
                }
          `}</style>
        </div>
    );
}


export default Find
