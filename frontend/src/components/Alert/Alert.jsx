/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./Alert.css";

export default function Alert(props) {
    const [alertComponent, setAlertComponent] = props.AlertUseState;

    useEffect(() => {
        if (alertComponent === null) {
            setTimeout(() => {
                setAlertComponent(null);
            }, 3000);
        }
    }, [alertComponent]);
    return <span className="alert">{props.text}</span>;
}
