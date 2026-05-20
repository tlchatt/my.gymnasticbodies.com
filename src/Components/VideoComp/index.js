import { useEffect, useRef, useState } from "react";

const VideoComp = (props) => {
    // console.log("props in videocomp",props)
    let multipleMedia = Array.isArray(props.url) ? true : false
    const videoRef = useRef(null);
    let [mediaUrl, setMediaUrl] = useState()
    let [currentMediaIndex, setCurrentMediaIndex] = useState(0)
    let currentIndex
    useEffect(() => {

        if (videoRef.current) {
            // console.log("multipleMedia:",multipleMedia)
            if (multipleMedia) {
                if (props.url.length == 1) {
                    console.log("props.url[currentMediaIndex].url:",props)
                    videoRef.current.src = props?.url[currentMediaIndex]?.url;
                } else {
                    // console.log("currentMediaIndex:",currentMediaIndex)
                    // console.log("props.url[currentMediaIndex].url:",props.url[currentMediaIndex].url)
                    currentIndex = currentMediaIndex;
                    const handleTimeUpdate = () => {
                        const currentTime = videoRef?.current?.currentTime;
                        const duration = videoRef?.current?.duration;
                        if (currentTime >= duration && currentIndex < props.url.length - 1) {
                            currentIndex++;
                            setCurrentMediaIndex(currentIndex);
                            videoRef.current.src = props.url[currentIndex].url;//sets url once video ends
                        }
                    };
                    const handleLoadedMetadata = () => {
                        videoRef.current.play();
                    };
                    videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
                    videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);


                    videoRef.current.src = props.url[currentMediaIndex].url; //sets url


                    return () => {
                        videoRef?.current?.removeEventListener('timeupdate', handleTimeUpdate);
                        videoRef?.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
                    };
                }

            } else {
                videoRef.current.src = props.url;
                videoRef.current.load();
                setMediaUrl(props.url);
            }

        }
    }, [props.url, currentMediaIndex]);
    // console.log("mediaUrl:",mediaUrl)
    return (
        <video autoPlay ref={videoRef} style={{ width: "100%", height: "100%" }} poster="images/my-video-poster.jpg" controls >
            <source src={mediaUrl} type="video/mp4" />
        </video>
    )

}
export default VideoComp