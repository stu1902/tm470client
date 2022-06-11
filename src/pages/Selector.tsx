import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import van from '../images/van.png';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { navigateCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';
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
            baseURL: `https://reqres.in/api`
        })
        api.post("/login", selectData)
            .then(res => {
                history.push("/dashboard/" + selectData);
            })
            .catch(error=>{
                setMessage("Auth failure! Please create an account");
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
                                style={{ fontSize: "70px", color: "#7a0101" }}
                                icon={navigateCircle}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"> Delivery Location </IonLabel>
                                <IonInput
                                    type="text"
                                    value={location}
                                    onIonChange={(e) => setLocation(e.detail.value!)}
                                >
                                </IonInput>
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
                            <p style={{ fontSize: "medium" }}>
                                Please click SUBMIT to confirm your options.
                            </p>
                            <IonButton expand="block" onClick={handleSelect}>Submit</IonButton>
                            <p style={{ fontSize: "medium" }}>
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