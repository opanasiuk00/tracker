import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTracker } from '../../redux/tracker/slice';
import styles from './app.module.scss';
import Stopwatch from '../StopwatchItem'
import { nanoid } from 'nanoid'

const App = () => {
    const { tracker } = useSelector(state => state.tracker);
    const dispatch = useDispatch();

    const [nameTracker, setNameTracker] = React.useState('');

    const isMounted = React.useRef(false);
    React.useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(tracker);
            localStorage.setItem('tracker', json);
        }
        isMounted.current = true;
    }, [tracker]);

    const handleClickButton = () => {
        const lastUpdateTime = Date.now()
        dispatch(addTracker({ id: nanoid(10), name: nameTracker ? nameTracker : `No name tracker #${tracker.length}`, time: 0, running: true, startTime: lastUpdateTime }));
        setNameTracker('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClickButton()
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.tracker}>
                <h1 className={styles.tracker_logo}>tracker</h1>
                <label className={styles.tracker_form}>
                    <input
                        className={styles.tracker_form_input}
                        onKeyDown={handleKeyDown}
                        value={nameTracker}
                        onChange={(e) => setNameTracker(e.target.value)}
                        type='text'
                        placeholder="Enter tracker name"
                    />
                    <button className={styles.tracker_form_button} onClick={handleClickButton}>

                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="40px" viewBox="0 0 24 24" width="40px">
                            <g>
                                <rect fill="none" height="40" width="40" />
                            </g>
                            <g>
                                <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M9.5,16.5v-9l7,4.5L9.5,16.5z" />
                            </g>
                        </svg>
                    </button>
                </label>
                <div className={styles.tracker_stopwatches}>
                    {tracker.map((obj) =>
                        <Stopwatch key={obj.id} name={obj.name} time={obj.time} running={obj.running} id={obj.id} startTime={obj.startTime} dispatch={dispatch} />
                    )}
                </div>
            </div>
        </div >
    )
}

export default App