import { useState, useEffect } from "react";
import moment from "moment";

function RoomTime() {
    const [hourAndMinute, setHourAndMinute] = useState<any>("");

    useEffect(() => {
        const realTime = setInterval(() => {
            setHourAndMinute(moment(new Date()).format("LTS"));
        }, 1000);
        return () => clearInterval(realTime);
    }, []);

    return (
        <p>{hourAndMinute}</p>
    )
}

export default RoomTime;
