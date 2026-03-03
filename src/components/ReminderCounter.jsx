import {useState, useEffect} from "react";

function ReminderCounter(){

    // useState
    const [reached, setReached] = useState(false);
    const [started, setStarted] = useState(false);
    let [second, setSecond] = useState(0);
    const [handle, setHandle] = useState(null);
    const [limit, setLimit] = useState(0);
    // -------------------------------------------------------


    useEffect(function(){
        return function(){ // Cleanup function
            if (reached)
                alert("Countup reached the limit");
            clearInterval(handle);
            setHandle(null);
            setReached(false);
            setSecond(0);
            setStarted(false);
        };
    },
    [reached]);

    // -------------------------------------------------------

    // second hand is derived from useState

    const minute = Math.floor(second / 60) % 60; // minute hand
    const hour = Math.floor(minute / 60) % 24; // hour hand

    function increment(){ // Function to implement increment logic
        setSecond(++second);
        if (second >= limit)
            setReached(true);
    }

    function start(){ // function to star/stop on button click
        if (!started)
            setHandle(setInterval(increment, 1000));
        else
            clearInterval(handle);
    setStarted(!started);
    }

    // -------------------------------------------------------

    return ( // returns this component
        <div>
            <div style={{"padding": "50px", "fontSize": "30px"}}>{hour.toString().padStart(2, "0")} : {minute.toString().padStart(2, "0")} : {(second % 60).toString().padStart(2, "0")}</div>
            <br />
            <CounterForm onSecondChange={(s)=>setLimit(s)}/>
            <br />
            <button type="button" onClick={start}>{started? "Stop": "Start"} Counter</button>
        </div>
    )
}

// Form component (not allowed to create another file)
function CounterForm({value, onSecondChange}){ // another component (C O M P O N E N T)

    // Taking the value from prop
    let sec = Number(value);
    if (Number.isNaN(sec)) sec = 0; // default to zero if no valid number is found.

    // Then finds out minute and hour for input form
    const minute = Math.floor(sec / 60) % 60;
    const hour = Math.floor(minute / 60) % 24;

    // then initializes with padding number for input forms
    const [values, setValues] = useState({"s": sec.toString().padStart(2, "0"), "m": minute.toString().padStart(2, "0"), "h": hour.toString().padStart(2, "0")})

    // --------------------------------------------------------------------------------------------------------------

    function process(){ // This calculates the total in seconds
        const sec = Number(values.s);
        const min = Number(values.m) * 60;
        const hr = Number(values.h) * 60 * 60;
        return sec + min + hr; // and then returns
    };

    useEffect(() => { // This effect is called when any hand (hour, minute, or seconds) changes.
        onSecondChange(process()); // This ultimately gets returned to props event listener (aka, ReminderCounter.jsx)
    }, [values.h, values.m, values.s]);


    // I have used display flex to align the form inputs in rows.
    // Check the first div inside flex container.

    return (<>
    <div style={{"display": "flex", "justifyContent": "center"}}>


        <div> {/* All other divs inside this parent container are all the same (except, one has second and other has minutes */ ""}
            <label htmlFor="hour">Hour</label>
            <br />
            <input type="number" name="hour" id="hour" min="0" onInput={(e) => {
                e.target.value = e.target.value.replace(/[-]/g, "");
                setValues({...values, "h": e.target.value});
            }} value={values.h}/>:
        </div>



        <div> {/* second div */ ""}
            <label htmlFor="minute">Minute</label>
            <br />
            <input type="number" name="minute" id="minute" min="0" onInput={(e) => {
                e.target.value = e.target.value.replace(/[-]/g, "");
                setValues({...values, "m": e.target.value});
            }} value={values.m}/>:
        </div>


        <div> {/* third div */ ""}
            <label htmlFor="sec">Second</label>
            <br />
            <input type="number" name="sec" id="sec" min="0" onInput={(e) => {
                e.target.value = e.target.value.replace(/[-]/g, "");
                setValues({...values, "s": e.target.value});
            }} value={values.s}/>
        </div>
    </div>
    </>);
}

export default ReminderCounter;
