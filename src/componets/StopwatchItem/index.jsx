import React from "react";
import { removeItem, setPause, setTime } from "../../redux/tracker/slice";
import styles from './stopwatch.module.scss';

const Stopwatch = ({ time, id, running, name, startTime, dispatch }) => {
    const countRef = React.useRef(null)

    React.useEffect(() => {
        if (running) {
            countRef.current = setInterval(() => {
                const now = Date.now()
                const deltaTime = now - startTime
                dispatch(setTime({ id, time: deltaTime }))
            }, 1000)
        } else {
            clearInterval(countRef.current)
        }
        return () => clearInterval(countRef.current)
    }, [running])

    const handlePause = () => {
        clearInterval(countRef.current)
        dispatch(setPause({ id, running: !running }))
    }

    const handleRemove = () => {
        clearInterval(countRef.current)
        dispatch(removeItem(id))
    }

    const formatTime = (time) => {
        const secs = `0${Math.floor(time / 1000) % 60}`.slice(-2)
        const mins = `0${Math.floor(time / 1000 / 60) % 60}`.slice(-2)
        const hrs = `0${Math.floor(time / 3600000) % 100}`.slice(-2)
        return `${hrs}:${mins}:${secs}`
    }

    return (
        <div className={running ? `${styles.stopwatch} ${styles.active}` : styles.stopwatch}>
            <div>
                <h2 title={name}>{name}</h2>
            </div>
            <div>
                <p>{formatTime(time)}</p>
                <button onClick={handlePause}>{running
                    ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" ><path d="M0 0h24v24H0z" fill="none" /><path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z" /></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" ><path d="M0 0h24v24H0z" fill="none" /><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>}
                </button>
                <button onClick={handleRemove}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" ><path d="M0 0h24v24H0z" fill="none" /><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                </button>
            </div>
        </div>
    );
}

export default Stopwatch



