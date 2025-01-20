import { collection, getDocs, limit, orderBy, query, where } from "@firebase/firestore"
import Slider from "../components/Slider"
import { db } from "../firebase"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import ListingItem from "../components/ListingItem"

export default function Home() {
 
  const [offerListings, setOfferListings] = useState(null)
  const [forRent, setForRent] = useState(null)
  const [forSale, setForSale] = useState(null)
  useEffect(() => {
    async function fetchOffers() {
      // offers
      try {
        const getOffers = collection(db, "listings")
        const q = query(getOffers, where("offer", "==", true), orderBy("timestamp", "desc"), limit(3))
        const listingsSnap = await getDocs(q)
        const listings = []
          
        listingsSnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setOfferListings(listings)
        console.log(listings)
      
      } catch (error) {
          console.log(error)
      }       
    }
    
            fetchOffers()
      }, [])

  useEffect(() => {
    async function fetchRent() {
      // rent
      try {
        const getRent = collection(db, "listings")
        const q = query(getRent, where("type", "==", "rent"), orderBy("timestamp", "desc"), limit(4))
        const rentSnap = await getDocs(q)
        const listings = []
        rentSnap.forEach((doc) => {
          return listings.push({
            id: doc.id, 
            data: doc.data(),
          })
        })
        setForRent(listings)
        console.log(listings)
      } catch (error) {
          console.log(error)
      }
    }
      fetchRent()
  }, [])
  
  useEffect(() => {
    async function fetchSale() {
      
      try {
        const getSale = collection(db, "listings")
        const q = query(getSale, where("type", "==", "sell"), orderBy("timestamp", "desc"), limit(4))
        const saleSnap = await getDocs(q)
        const listings = []
        saleSnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setForSale(listings)
        console.log(listings)
      } catch (error) {
        console.log(error)
      }
    }
   
    fetchSale()
  }, []) 

  
  return (
    <div> 
      <Slider />
      <div className="max-w-6xl pt-4 mx-auto space-y-6"> 
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 mb-2 text-3xl font-semibold mt-6"> Recent Offers </h2>
            <Link to="/offers"> 
            <p className="px-3 text-blue-500 text-xl mb-6"> More offers </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> 
              {offerListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}                                  
                />                
              ))}            
            </ul>
          </div>
        )}            
      </div>
      <div className="max-w-6xl mx-auto pt-4">
        {forRent && forRent.length > 0 && (
          <div className="m-2 mb-2"> 
            <h2 className="px-3 text-2xl font-semibold mb-2"> 
              Recent places for Rent
            </h2>
            <Link to="/category/rent"> 
            <p className="text-blue-500 text-xl px-3 mb-6"> More places for Rent </p>
            </Link>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> 
              {forRent.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>    
      <div className="max-w-6xl pt-4 mx-auto "> 
        {forSale && forSale.length > 0 && (
          <div className="m-2 mb-6"> 
            <h2 className="px-3 text-2xl text-semibold mb-2"> Recent places for sale </h2>
            <Link to={"/category/sell"}> 
              <p className="text-blue-500 text-xl px-3 mb-6"> More places for sale </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> 
              {forSale.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />  
              ))}
            </ul>
          </div> 
        )}
      </div>    
    </div>
  )
}
