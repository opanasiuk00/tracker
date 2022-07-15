import { createSlice } from '@reduxjs/toolkit';


const getTrackerOF = () => {
    const data = localStorage.getItem('tracker');
    const items = data ? JSON.parse(data) : [];
    return {
        tracker: items,
    }
}

const initialState = getTrackerOF();


const trackerSlice = createSlice({
    name: 'tracker',
    initialState,
    reducers: {
        addTracker(state, action) {
            state.tracker.unshift(action.payload)
        },
        setTime(state, action) {
            const findItem = state.tracker.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.time = action.payload.time
            }
        },
        setPause(state, action) {
            const findItem = state.tracker.find(obj => obj.id === action.payload.id)
            if (findItem) {
                if (action.payload.running === true) {
                    const now = Date.now()
                    findItem.startTime = now - findItem.time
                }
                findItem.running = action.payload.running;
            }
        },
        removeItem(state, action) {
            state.tracker = state.tracker.filter((obj) => obj.id !== action.payload);
        },
    },
});

export const { addTracker, setTime, setPause, removeItem } = trackerSlice.actions;

export default trackerSlice.reducer;
