import { collection, getDocs, limit, orderBy, query, startAfter, where } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

export default function Offers() {

  const [fetchOffers, setFetchOffers] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  
  

  useEffect(() => {
    async function fetchOffers() {
      
      try {
        const getOffers = collection(db, "listings")
        const q = query(getOffers, where("offer", "==", true), orderBy("timestamp", "desc"), limit(8))
        const offerSnap = await getDocs(q)
        const fetchLastItem = offerSnap.docs[offerSnap.docs.length - 1]
        setLastFetchedListing(fetchLastItem)
        const listings = []
        offerSnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setFetchOffers(listings)
        
        setLoading(false)
        console.log(listings)

      } catch (error) {
        console.log(error)
      }
    }
      fetchOffers()
  }, [])

  async function onFetchMoreListings() {
    
    try {
      const fetchOfferListing = collection(db, "listings")
      const q = query(fetchOfferListing, where("offer", "==", true), orderBy("timestamp", "desc"), startAfter(lastFetchedListing), limit(4))
      const offerSnap = await getDocs(q)
      const fetchLastItem = offerSnap.docs[offerSnap.docs.length -1]
      setLastFetchedListing(fetchLastItem)      
      const listings = []
      offerSnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
          
        })
          setFetchOffers((prevState) => [...prevState, ...listings])
          setLoading(false)  
          
    } catch (error) {
        console.log(error)
      }      

    }


  return (
    <div className="max-w-6xl mx-auto px-3"> 
      <h1 className="text-3xl text-center mt-6 mb-6 font-bold  "> Offers </h1>
      {loading ? (
        <Spinner />
      ) : fetchOffers && fetchOffers.length > 0 ?
          <>
            <main> 
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> 
              {fetchOffers.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              )            
              )}
            </ul>
            </main>
            {lastFetchedListing && (
              <div className="flex justify-center items-center"> 
                <button className="border bg-white px-3 py-1.5 mt-7 mb-6 rounded-md hover:border-slate-600 transition duration-150 ease-in-out"
                onClick={onFetchMoreListings}
                > Load more </button>
              </div>
            )}
          
          </> :
          <p> There is no more offers </p>      
    }  
    </div>
  )
}


