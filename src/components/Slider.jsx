import { useEffect, useState } from "react";
import { collection, doc, getDocs,limit, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation, Pagination, } from "swiper/modules";
import "swiper/css/bundle"
import { useNavigate } from "react-router-dom";


export default function Slider() {

  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {

    async function fetchListings() {
      const getListings = collection(db, "listings")
      const q = query(getListings, orderBy( "timestamp", "desc"), limit(5))
      const listingsSnap = await getDocs(q)
      let listings = []
      listingsSnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListings(listings)
      setLoading(false)
      console.log(listings)
    }

    fetchListings()
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (listings.length === 0) {
    return <> </>
  }

  return (
    listings && (
      <> 
        <Swiper
          modules={[ Autoplay, Navigation, Pagination, EffectFade]}
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"    
          autoplay={{ delay: 3000 }}
        > 
        {listings.map(({data, id}) => (
          <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
            
            <div style={{
              background: `url(${data.imgUrls[0]}) center, no-repeat`, backgroundSize: "cover"
            }}
              className="relative w-full h-[450px] overflow-hidden"
            ></div>
            <p className="text-white absolute left-1 top-3 text-lg max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-4 rounded-lg"> {data.name} </p>
            <p className="text-white absolute left-1 bottom-3 text-lg max-w-[90%] bg-red-500 shadow-lg opacity-90 p-4 rounded-lg"> 
             $ {data.type === "rent" ? (`${data.regularPrice} / month`) : (`${data.    discountedPrice} Discount`)}
            </p>

          </SwiperSlide>          
        ))}  
        </Swiper>
      </>
    )
  )
}


