'use client'

import React, {useEffect,useState} from "react";

const options =[
  {
    icon:"light_mode",
    text:"light",
  },
  {
    icon:"nights_stay",
    text:"dark",
  },
  {
    icon:"desktop_windows",
    text:"system",
  },
];

export default function Home() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const element = document.documentElement
  const darkQuery = window.matchMedia("(prefers-color-scheme:dark)")

  function onWindowMatch(){
    if(localStorage.theme === 'dark' || 
    (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }

  };

    useEffect(() => {
      switch (theme) {
        case "dark":
          element.classList.add("dark");
          break;
        case "light":
          element.classList.remove("dark");
          break;  

        default:
          localStorage.removeItem("theme"); 
          onWindowMatch();          
          break;
      }
    }, [theme]);

    darkQuery.addEventListener("change", (e)=>{
      if (!("theme" in localStorage)){
        if (e.matches){
          element.classList.add("dark");
        } else {
          element.classList.remove("dark");
        }
      }
    })

  return (
    <section className=' min-h-screen pt-8 bg-gray-200 dark:text-gray-50 dark:bg-black duration-100 '>
      <div className='flex justify-between mx-auto items-center gap-x-5 w-[200px] duration-100 dark:bg-slate-700 bg-gray-400 rounded'>
        {options?.map((opt)=> (
          <button key={opt.text} onClick={()=> setTheme(opt.text)} className={`w-8 h-8  text-xl rounded-full m-1 ${theme === opt.text && "text-red-700"}`} >
          <span class="material-symbols-outlined">{opt.icon}</span>
          </button>

        ))}
        
      </div>
    </section>
  )
}
