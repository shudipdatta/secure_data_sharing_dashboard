import { useRef } from 'react'

function AddMission() {
    const missionName = useRef(null);
    const missionCap = useRef(null);
    const missionStart = useRef(null);
    const missionEnd = useRef(null);

    const ip = process.env.REACT_APP_IP
    const app = process.env.REACT_APP_API


    const addMission = async (missionName, missionCap, missionStart, missionEnd) => {
        const requestOptions = {
            method: 'post',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: JSON.stringify({"missionName":missionName, "capacity":missionCap, "startTime":missionStart, "endTime":missionEnd})
          };

        await fetch(ip+app+"AddMission", requestOptions)
        .catch(error => window.alert(error.message));
    };

    return (
        <div className="AddMission">
            <label>Add Mission</label><br/>
            <input ref={missionName} type="text" placeholder="Enter mission name" />
            <input ref={missionCap} type="number" placeholder="Enter mission capacity" />
            <input ref={missionStart} type="text" placeholder="Enter mission start time" />
            <input ref={missionEnd} type="text" placeholder="Enter mission end time" /><br/>
            <button onClick={() => addMission(missionName.current.value, missionCap.current.value, missionStart.current.value, missionEnd.current.value)}>Add Mission</button>
        </div>
    );
}

export default AddMission;
