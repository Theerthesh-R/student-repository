"use client"
import InputField from "@/app/component/InputField";
import { supabase } from "@/app/lib/supabase";

//wimport { PersonStandingIcon } from "lucide-react";
import react from "react";
import { useState } from "react";
export default function CreateStudent(){
    const[name,setName]=useState("");
    const[age,setAge]=useState(0);
    const[email,setEmail]=useState("");
    const[phone,setPhone]=useState(0);
    const[address,setAddress]=useState("");
    const[gender,setGender]=useState("");
    const[usn,setUSN]=useState("");
    return(
        <div className="min-h-screen flex flex justify-center items-center">
            <div className="text-3xl font-bold">
                <InputField 
                type="text"
                value={name} 
                placeholder={"Student Name"}
                onChange={(e)=>{
                    setName(e.target.value)
                }}/>
                <InputField 
                type="text"
                value={usn} 
                placeholder={"Student USN"}
                onChange={(e)=>{
                    setUSN(e.target.value)
                }}/>
                <InputField 
                type="text"
                value={address} 
                placeholder={"Student Address"}
                onChange={(e)=>{
                    setAddress(e.target.value)
                }}/>
                <InputField 
                type="number"
                value={phone} 
                placeholder={"Phone Number"}
                onChange={(e)=>{
                    setPhone(e.target.value)
                }}/>
                <InputField 
                type="text"
                value={gender} 
                placeholder={"Student Gender"}
                onChange={(e)=>{
                    setGender(e.target.value)
                }}/>
                <InputField 
                type="email"
                value={email} 
                placeholder={"Student email"}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
      <div className="flex flex-row bg-green-500 text-white">
  <button 
    onClick={async (event) => {
      if (usn === "" || name === "" || phone === "" ||email===""|| address === "" || gender === "") {
        alert("All fields are mandatory");
        return;
      }

      try {
        const { data, error } = await supabase.from('Student').insert([
          {
            name: name,
            usn: usn,
            phone: phone,
            address: address,
            email: email,
            gender: gender,
          }
        ]).select();

        if (error) {
          throw error;
        } else {
          alert(JSON.stringify(data, null, 2)); 
        }
      } catch (e) {
        console.error("Unexpected error:", e);
        alert(`Error: ${e.message}`); 
      }
    }}
  >
    Click Me
  </button>
</div>
</div>
</div>
);
}