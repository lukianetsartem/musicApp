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

    const audio: any = useRef()
    const volumeController: any = useRef()
    const timeController: any = useRef()

    useEffect(() => {
        audio.current.volume = volume
    }, [volume])

    const audioController = () => {
        if (isPlaying) {
            setAudioState(false)
            audio.current.pause()
        } else {
            setAudioState(true)
            audio.current.play()
        }
    }

    const changeVolume = () => {
        setVolume(Number(volumeController.current.value) / 100)
    }

    const changeTime = () => {
        console.log('time changed')
    }

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
                <audio ref={audio} src={song.audio}/>
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
                <span>0:00</span>
                <input className={'time-slider'}
                       onChange={changeTime}
                       ref={timeController}
                       type={'range'}
                       min={0}
                       max={100}/>
                <span>5:03</span>
            </div>
        </div>
    )
}
