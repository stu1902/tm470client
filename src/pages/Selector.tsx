import {
    IonAlert,
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React, { useState } from 'react';
import van from '../images/van.png';
import { navigateCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Selector: React.FC = () => {
    const history = useHistory();
    const [location, setLocation] = useState<string>("Aberystwyth");
    const [route, setRoute] = useState<string>("Cwmystwyth");
    const [isError, setIsError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const handleSelect = () => {
        if (!location) {
            setMessage("Please enter a valid delivery location");
            setIsError(true);
            return;
        }
        /*
        if (!validateLocation(location)) {
            setMessage("This delivery location is not recognised.");
            setIsError(true);
            return;
        }


         */
        if (!route) {
            setMessage("Please enter your delivery route");
            setIsError(true);
            return;
        }

        const selectData = {
            "location": location,
            "route": route
        }

        const api = axios.create({
            baseURL: `http://localhost:3000`
        })
        api.get("/location/" + location)
            .then(res => {
                console.log(res.data);
                //history.push("/dashboard/" + selectData);
                history.push("/map/");
                alert('You have selected ' + location + ' as your location and ' + route + " as your route.");
            })
            .catch(error => {
                setMessage("This location is not recognised.");
                setIsError(true)
            })

    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>TM470 Route Selector</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonAlert
                                isOpen={isError}
                                onDidDismiss={() => setIsError(false)}
                                cssClass="my-custom-class"
                                header={"Error!"}
                                message={message}
                                buttons={["Dismiss"]}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonIcon
                                style={{fontSize: "70px", color: "#7a0101"}}
                                icon={navigateCircle}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"> Delivery Location </IonLabel>
                                <IonSelect placeholder="Select Delivery Location">
                                    <IonSelectOption value="Aberystwyth">Aberystwyth</IonSelectOption>
                                    <IonSelectOption value="Bala">Bala</IonSelectOption>
                                    <IonSelectOption value="Corwen">Corwen</IonSelectOption>
                                    <IonSelectOption value="Craven Arms">Craven Arms</IonSelectOption>
                                    <IonSelectOption value="Dolgellau">Dolgellau</IonSelectOption>
                                    <IonSelectOption value="Ludlow">Ludlow</IonSelectOption>
                                    <IonSelectOption value="Machynlleth">Machynlleth</IonSelectOption>
                                    <IonSelectOption value="Newtown">Newtown</IonSelectOption>
                                    <IonSelectOption value="Oswestry">Oswestry</IonSelectOption>
                                    <IonSelectOption value="Shrewsbury">Shrewsbury</IonSelectOption>
                                    <IonSelectOption value="Welshpool">Welshpool</IonSelectOption>
                                    <IonSelectOption value="Whitchurch">Whitchurch</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"> Delivery Route </IonLabel>
                                <IonInput
                                    type="text"
                                    value={route}
                                    onIonChange={(e) => setRoute(e.detail.value!)}
                                >
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <p style={{fontSize: "medium"}}>
                                Please click SUBMIT to confirm your options.
                            </p>
                            <IonButton expand="block" onClick={handleSelect}>Submit</IonButton>
                            <p style={{fontSize: "medium"}}>
                                Don't have an account? Please contact your line manager.
                            </p>
                            <img src={van} alt={"van"} width={"200"}/>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Selector;