import React, {useEffect, useRef, useState} from 'react';
import '../App.css'
import montero from '../assets/audio/montero.mp3'
import minimumVolume from '../assets/svg/minimumVolume.svg'
import mediumVolume from '../assets/svg/mediumVolume.svg'
import maximumVolume from '../assets/svg/maximumVolume.svg'
import zeroVolume from '../assets/svg/zeroVolume.svg'
import play from '../assets/svg/play.svg'
import stop from '../assets/svg/stop.svg'
import replay from '../assets/svg/replay.svg'

export const Player = () => {
    const song = {
        artist: 'Lil Nas X',
        artistLink: 'lilnasx',
        name: "MONTERO (Call Me By Your Name)",
        cover: "https://cdns-images.dzcdn.net/images/cover/fc939e4030254f80bd90b616f2a1d0a6/500x500.jpg",
        audio: montero
    }

    const [isPlaying, setAudioState] = useState(false)
    const [isReplayable, setIsReplayable] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    // ANY SHOULD BE REPLACED
    const audio:any = useRef() // ref to the audio element
    const volumeController:any = useRef() // ref to the volume controller
    const timeController:any = useRef() // ref to the time controller

    // Setting up music track duration after metadata loaded
    const onLoadedMetaData = () => {
        setDuration(Math.floor(audio.current.duration))
    }
    // End

    useEffect(() => {
        audio.current.volume = volume
        timeController.current.max = duration
        setCurrentTime(audio.current.currentTime)
        onLoadedMetaData()
    }, [volume, duration])

    // Transformation from seconds format to minutes format
    const calculateTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.round((time / 60 - Math.floor(minutes)) * 60)
        if (seconds < 10) {
            return `${minutes}:0${seconds}`
        } else {
            return `${minutes}:${seconds}`
        }
    }
    // End

    const animationRef = useRef(0)

    // Current time updaiting
    const playing = () => {
        // Local constant for currentTime
        const currentTime = audio.current.currentTime
        // requestAnimationFrame() used here to make updaiting loop (updates data 60 times per second)
        animationRef.current = requestAnimationFrame(playing)
        // setting up current time for current time updaiting
        setCurrentTime(currentTime)
        // setting up property to update progress bar
        timeController.current.style.setProperty('--seek-before-width', `${audio.current.currentTime / duration * 100}%`)
        // Checking if song ended and stopping playing
        const isEnded = Math.floor(currentTime) === duration
        if(isEnded) {
            setAudioState(false)
            audio.current.pause()
        }
    }
    // End

    // Play/stop, playing state controller
    const audioController = () => {
        if (!isPlaying) {
            // Setting isPlaying statement
            setAudioState(true)
            // Play music
            audio.current.play()
            // requestAnimationFrame() starts updating process for current time and progress bar
            animationRef.current = requestAnimationFrame(playing)
        } else {
            // Setting isPlaying statement
            setAudioState(false)
            // Pause music
            audio.current.pause()
            // cancelAnimationFrame() cancel updating process for current time and progress bar
            cancelAnimationFrame(animationRef.current)
        }
    }
    // End

    // Volume controller
    const changeVolume = () => {
        // Setting volume for audio
        setVolume(Number(volumeController.current.value) / 100)
    }
    // End

    // Time conroller
    const changeTime = () => {
        const currentTime = timeController.current.value
        // Updaiting current time statement
        setCurrentTime(currentTime)
        // Updaiting progress bar
        timeController.current.style.setProperty('--seek-before-width', `${audio.current.currentTime / duration * 100}%`)
        // Updaiting current time in audio
        audio.current.currentTime = currentTime
    }
    // End

    const looped:any = useRef()
    // Replay controller
    const replayController = () => {
        if(!isReplayable) {
            setIsReplayable(true)
            looped.current.style.setProperty('display', 'flex')
        } else {
            setIsReplayable(false)
            looped.current.style.setProperty('display', 'none')
        }
    }
    // End

    return (
        <div>
            <audio ref={audio} src={song.audio} preload="metadata" onLoadedMetadata={onLoadedMetaData}/>
            <div className={'song'}>
                <div className={'song-data'}>
                    <img className={"song-cover"} alt='' src={song.cover}/>
                    <p className={'song-name'}><a href={song.artistLink}>{song.artist}</a> - {song.name}</p>
                </div>
                <div className={'song-control'}>
                    {isPlaying ? <button className={'song-controller'} onClick={audioController}>
                            <img alt='stop' src={stop}/>
                        </button>
                        : <button className={'song-controller play-controller'} onClick={audioController}>
                            <img alt='play' src={play}/>
                        </button>}
                    <div className={'time-controller'}>
                        <span>{calculateTime(currentTime)}</span>
                        <input className={'time-slider'}
                               defaultValue={0}
                               onChange={changeTime}
                               ref={timeController}
                               type={'range'}
                               min={0}/>
                        <span>{((duration && !isNaN(duration)) && calculateTime(duration)).toString()}</span>
                    </div>
                </div>
                <div className={'volume-controller'}>
                    <div className={'replay-controller'}>
                        <button className={'replay'} onClick={replayController}>
                            <img alt='' src={replay}/>
                            <span ref={looped}>1</span>
                        </button>
                    </div>
                    {volume === 0 && <img className='volume-icon' src={zeroVolume} alt={''}/>}
                    {volume > 0 && volume <= 0.4 && <img className='volume-icon' src={minimumVolume} alt={''}/>}
                    {volume > 0.4 && volume <= 0.8 && <img className='volume-icon' src={mediumVolume} alt={''}/>}
                    {volume > 0.8 && <img className='volume-icon' src={maximumVolume} alt={''}/>}
                    <input className={'volume-slider'} onChange={changeVolume} ref={volumeController} type={'range'}
                           min={0}
                           max={100}/>
                </div>
            </div>
        </div>
    )
}