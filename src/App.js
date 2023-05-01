import { useRef, useState } from "react";
import classes from "./App.module.css"
import { ArrowLeftSharp, ArrowRightSharp, PauseCircleFilled, PlayCircleFilled } from "@mui/icons-material";
import { sliderImage } from "./sliderImage";
import { blue } from "@mui/material/colors";

function App() {
  const scrollRef = useRef()
  const timeoutRef = useRef(null) 
  const lengthOfSlider = sliderImage.length;
  const [activeImageNum, setCurrentNum] = useState(0)
  const [buttonplay, setButtonplay] = useState(false)


  // use to select the image in right side
  const nextSlide = () => {
    setCurrentNum((prevSlidevalue) => prevSlidevalue === lengthOfSlider - 1 ? 0 : prevSlidevalue + 1)
    console.log(activeImageNum)
    // use to scroll the image
    scrollRef.current.scrollBy({ left: 110, behavior: "smooth" });
    if(activeImageNum === lengthOfSlider-1){
     scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }


  // use to select the image in left side
const prevSlide = () => {
  setCurrentNum((prevSlidevalue) => prevSlidevalue === 0 ? lengthOfSlider - 1 : prevSlidevalue - 1)
  scrollRef.current.scrollBy({ left: -110, behavior: "smooth" });
  if(activeImageNum === 0){
    scrollRef.current.scrollTo({ left: lengthOfSlider * 110, behavior: "smooth" });
   }
 
}


// autoPlay slider 
const pausePlaySlider = () => {
  if (timeoutRef.current) {
    clearInterval(timeoutRef.current);
    // here we after clearing interval giving null value so it run else 
    timeoutRef.current = null
    setButtonplay(false)
   
  } else {
    setButtonplay(true)
    timeoutRef.current = setInterval(() => {
      nextSlide();
      if(activeImageNum === lengthOfSlider-1){
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
       }
    }, 2000);
    
  }
}


  return (
    <div className={classes.image_gallery}>
      {/* here we show the larger image */}
      <div className={classes.large_img}>
       {sliderImage.map((currentImage, imageindex) => <div key={imageindex} className={activeImageNum === imageindex ?  classes.active_largeimg : classes.inactive_largeimg}><img src={currentImage.url} alt=""  /> <p>{currentImage.text}</p></div>) }
      </div>

      
      {/* here we show the smaller image */}
      <div className={classes.box2}>   
      <ArrowLeftSharp sx={{ fontSize: 54 }} className={classes.arrowLeft} onClick={prevSlide}/>
      <div className={classes.slider} ref={scrollRef}>

    {sliderImage.map((currentImage, imageindex) => 
      <div key={imageindex} className={activeImageNum === imageindex ?  classes.activeimage : classes.simpleimage}   >
        <img src={currentImage.url} alt="randomImage"/>
      </div>
    )}
  
</div>
<ArrowRightSharp sx={{ fontSize: 54 }} className={classes.arrowRight} onClick={nextSlide}/>
<div style={{flexBasis: '30%', textAlign: 'center', paddingTop: '2rem'}}>
{buttonplay === false && <PlayCircleFilled sx={{ color: blue[500], fontSize: 54 }} onClick={pausePlaySlider}/>}
{buttonplay === true &&  <PauseCircleFilled sx={{ color: blue[500], fontSize: 54 }} onClick={pausePlaySlider}/>}
</div>
</div>

    </div>
  );
}

export default App;
