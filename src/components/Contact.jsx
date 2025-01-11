import { doc, getDoc } from "@firebase/firestore"
import React, { useEffect, useState } from "react"
import { db } from "../firebase"
import { toast } from "react-toastify";

export default function Contact({ userRef, listing }) {
    
    const [landLord, setLandLord] = useState(null)
    const [message, setMessage] = useState("")

    useEffect(() => {
        async function getLandLord() {
            const docRef = doc(db, "users", userRef)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setLandLord(docSnap.data())
            } else {
                toast.error("Could not get landlord data")
            }
        }
        getLandLord()
    }, [userRef])

    function onChange(e) {
        setMessage(e.target.value)
    }


    return <> {landLord !== null && (
        <div className="mt-10 flex flex-col w-full">
            <p className="font-semibold"> 
                Contact {landLord.name} for the {listing.name.toLowerCase()}
            </p>
            <div> 
                <textarea name="message" id="message" rows="2" value={message} onChange={onChange} className="mt-3 mb-2 w-full h-[150px] px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 easy-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 " placeholder="Message"></textarea>
            </div>
            <a href={`mailto:${landLord.email}?subject=${listing.name}&${message}`}>
                <button className="mt-2 px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:shadow-lg active:bg-blue-800 w-full text-center" type="button"> Send </button>
            </a>
        </div>                            
    )} </ >   
}

