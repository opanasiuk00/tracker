import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTracker } from './redux/tracker/slice';
import styles from './scss/app.module.scss';
import MyStopwatch from './Stopwatch';
import { nanoid } from 'nanoid'

const App = () => {
  const { tracker } = useSelector(state => state.tracker)
  const [nameTracker, setNameTracker] = React.useState('');
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(tracker);
      localStorage.setItem('tracker', json);
    }
    isMounted.current = true;
  }, [tracker]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClickButton()
    }
  }

  const handleClickButton = () => {
    const lastUpdateTime = Date.now()
    dispatch(addTracker({ id: nanoid(10), name: nameTracker ? nameTracker : `No name tracker #${tracker.length}`, time: 0, running: true, startTime: lastUpdateTime }));
    setNameTracker('')
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
          <button className={styles.tracker_form_button} onClick={() => handleClickButton()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px" height="40px">
              <path fill="rgb(63, 175, 108)"
                d="M20.000,-0.000 C31.046,-0.000 40.000,8.954 40.000,20.000 C40.000,31.046 31.046,40.000 20.000,40.000 C8.954,40.000 -0.000,31.046 -0.000,20.000 C-0.000,8.954 8.954,-0.000 20.000,-0.000 Z" />
              <path fill="rgb(255, 255, 255)"
                d="M15.700,12.150 L28.300,19.150 L28.300,19.150 L15.700,26.850 L15.700,12.150 Z" />
            </svg>
          </button>
        </label>
        <div className={styles.tracker_stopwatch}>
          {tracker.map((obj) =>
            <MyStopwatch key={obj.id} name={obj.name} time={obj.time} running={obj.running} id={obj.id} startTime={obj.startTime} dispatch={dispatch} />
          )}
        </div>
      </div>
    </div >
  )
}

export default App