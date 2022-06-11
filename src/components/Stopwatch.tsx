import React, { useState, useEffect } from "react";
import { IonButton, IonContent } from '@ionic/react';
import "../pages/Home.css"

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    useEffect(() => {
        let interval: any;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);
    return (
        <IonContent>
        <div className="stopwatch">
            <div className="numbers">
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
            <div className="buttons">
                <IonButton color="success" onClick={() => setRunning(true)}>Start</IonButton>
                <IonButton color="danger" onClick={() => setRunning(false)}>Stop</IonButton>
                <IonButton onClick={() => setTime(0)}>Reset</IonButton>
            </div>
        </div>
        </IonContent>
    );
};

export default Stopwatch;