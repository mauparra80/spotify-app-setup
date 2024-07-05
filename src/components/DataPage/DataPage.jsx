import React, {useContext, useEffect, useState} from "react"
import { AppContext } from "../../components/AppProvider";
import { useNavigate } from "react-router";
import { getWordCloudArtists } from "../WordCloudManager/getWordCloudArtists";
import WordCloudComponent from "../WordCloudManager/WordCloudComponent";
import ArtistTracksBox from "../ArtistTracks-Box/ArtistTracksBox";
import './dataPage.css'
import LoadingVisual from "../../pages/LoadingSongs/LoadingVisual";


export default function DataPage() {
  const [artistWordCountList, setArtistWordCountList] = useState(null);
  const {festivalData, matchedTracks} = useContext(AppContext);
  const navigate = useNavigate()

  //create wordcloud
  useEffect(() => {
    if (!festivalData) {
      //return to search if ther is no festivalData
      console.log('this is festivalData from datapage inside !festivalData',festivalData);
      navigate('/festival-search');
      return;
    }

    console.log('this is festivalData from datapage',festivalData);
    setArtistWordCountList(getWordCloudArtists(festivalData, navigate));
  },[])

  if (!festivalData) {
    return null; // Render nothing while redirecting
  }

  return (

      <div className="page-container data-page">

        <div className="festival-poster-container">
            <img src={festivalData.image} alt="Festival poster" />
          <div className="festival-poster-info">
            <h1 className="font-poetsen">{festivalData.name}</h1>
            <h3 className="no-wrap">{festivalData.startDate}  ---  {festivalData.endDate}</h3>
            <h3>{festivalData.location.name}</h3>
          </div>
        </div>

        <h1 className="font-poetsen mb-10 mt-48 text-center">What artists will be there?</h1>
        {artistWordCountList && <WordCloudComponent words={artistWordCountList} />}
        
        <h1 className="font-poetsen mt-52 text-center">What artists will you recognize?</h1>
        <div className="artists-tracks-container">
        {matchedTracks && <ArtistTracksBox tracks={matchedTracks} festivalData={festivalData}/>}
      </div>


      </div>


      
  )
}