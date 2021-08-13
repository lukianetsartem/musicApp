import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import montero from './assets/audio/montero.mp3'
import minimumVolume from './assets/svg/minimumVolume.svg'
import mediumVolume from './assets/svg/mediumVolume.svg'
import maximumVolume from './assets/svg/maximumVolume.svg'
import zeroVolume from './assets/svg/zeroVolume.svg'
import play from './assets/svg/play.svg'
import stop from './assets/svg/stop.svg'

export const App = function () {
    const song = {
        artist: 'Lil Nas X',
        artistLink: 'lilnasx',
        name: "MONTERO (Call Me By Your Name)",
        audio: montero
    }

    const [isPlaying, setAudioState] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    // ANY TYPE SHOUD BE REMOVED
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
        setCurrentTime(audio.current.currentTime)
        onLoadedMetaData()
    }, [volume])

    // Transformation from seconds format to minutes format
    const calculateTime = (time:number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.round((time / 60 - Math.floor(minutes)) * 60)
        if(seconds < 10) {
            return `${minutes}:0${seconds}`
        } else {
            return `${minutes}:${seconds}`
        }
    }
    // End

    // Current time updaiting
    const playing = () => {
        requestAnimationFrame(playing)
        setCurrentTime(audio.current.currentTime)
        console.log('updaiting')
    }
    // End

    // Play/stop, playing state controller
    const audioController = () => {
        if (!isPlaying) {
            setAudioState(true)
            audio.current.play()
            requestAnimationFrame(playing)
        } else {
            setAudioState(false)
            audio.current.pause()
            // BUG HERE!!! NEEDED TO PROVIDE cancelAnimationFrame()
        }
    }
    // End

    // Volume controller
    const changeVolume = () => {
        setVolume(Number(volumeController.current.value) / 100)
    }
    // End

    // Time conroller
    const changeTime = () => {
        const currentTime = timeController.current.value
        setCurrentTime(currentTime)
        audio.current.currentTime = currentTime
    }
    // End

    return (
        <div>
            <div className={'song'}>
                {isPlaying ? <button className={'song-controller'} onClick={audioController}>
                        <img alt='stop' src={stop}/>
                    </button>
                    : <button className={'song-controller play-controller'} onClick={audioController}>
                        <img alt='play' src={play}/>
                    </button>}
                <p className={'song-name'}><a href={song.artistLink}>{song.artist}</a> - {song.name}</p>
                <audio ref={audio} src={song.audio} preload="metadata" onLoadedMetadata={onLoadedMetaData}/>
            </div>
            <div className={'volume-controller'}>
                {volume === 0 && <img className='volume-icon' src={zeroVolume} alt={''}/>}
                {volume > 0 && volume <= 0.4 && <img className='volume-icon' src={minimumVolume} alt={''}/>}
                {volume > 0.4 && volume <= 0.8 && <img className='volume-icon' src={mediumVolume} alt={''}/>}
                {volume > 0.8 && <img className='volume-icon' src={maximumVolume} alt={''}/>}
                <input className={'volume-slider'} onChange={changeVolume} ref={volumeController} type={'range'} min={0}
                       max={100}/>
            </div>
            <div className={'time-controller'}>
                <span>{calculateTime(currentTime)}</span>
                <input className={'time-slider'}
                       defaultValue={0}
                       onChange={changeTime}
                       ref={timeController}
                       type={'range'}
                       min={0}
                       max={duration}/>
                <span>{(duration && !isNaN(duration)) && calculateTime(duration)}</span>
            </div>
        </div>
    )
}