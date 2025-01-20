import { collection, getDoc, getDocs, limit, orderBy, query, startAfter, where } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import ListingItem from "../components/ListingItem"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"



export default function Category() {

  const [fetchedListings, setFetchedListings] = useState(null)
  const [lastFetchedListings, setLastFetchedListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()

  useEffect(() => {
    async function fetchListings() {
      
      try {
        const fetchListings = collection(db, "listings")
        const q = query(fetchListings, where("type", "==", params.categoryName), orderBy("timestamp", "desc"), limit(4))
        const fetchedSnap = await getDocs(q)
        const fetchedLastItem = fetchedSnap.docs[fetchedSnap.docs.length - 1]
        setLastFetchedListings(fetchedLastItem)
        const listings = []
        fetchedSnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setFetchedListings(listings)
        setLoading(false)
        console.log(listings)
      
      } catch (error) {
        toast.error("could not fetch listings")
      }
    }

    fetchListings()
  }, [params.categoryName])

  async function onFetchLastListings() {
    try {
      const fetchLastListing = collection(db, "listings")
      const q = query(fetchLastListing, where("type", "==", params.categoryName), orderBy("timestamp", "desc"), startAfter(lastFetchedListings), limit(4))
    
      const listingSnap = await getDoc(q)
      const getLastListings = listingSnap.docs[listingSnap.docs.length - 1]
      setLastFetchedListings(getLastListings)
      const listings = []
      listingSnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })  
      } catch (error) {
      console.log(error)
      }       
    }


  return (
    <div className="max-w-6xl px-10 mx-auto">
      <h1 className="text-3xl text-center mt-6 mb-6 font-bold">
        {params.categoryName === "rent" ? "Places for rent" : "Places for sale"}         
        </h1>
      {loading ? 
        <Spinner /> :
        fetchedListings && fetchedListings.length > 0 ? 
          <main> 
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {fetchedListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>

        </main>  
          :
        <p> There is no listings </p>  
      
      }
    </div>
  );
}
