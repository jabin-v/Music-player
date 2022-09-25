import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

//at_20BH8K8xbOnEzcKeFmMMUl2wmijR2
const CountryTracks = () => {
    const [country,setCountry]=useState("IN");
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    
   

    useEffect(() => {
        axios
          .get(`https://geo.ipify.org/api/v2/country?apiKey=at_20BH8K8xbOnEzcKeFmMMUl2wmijR2`)
          .then((res) => setCountry(res?.data?.location.country))
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      }, [country]);

      

      const { data, isFetching, error } = useGetSongsByCountryQuery(country);
      if (isFetching && loading ) return <Loader title="Loading Songs around you..." />;

      if (error && country !== '') return <Error />;

      console.log(data)

    return (
        <div className="flex flex-col">
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around you </h2>
  
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data?.map((song, i) =>{ 

           if(song?.hub?.actions) return <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={i}
            />
          })}
        </div>
      </div>)
}

export default CountryTracks;
