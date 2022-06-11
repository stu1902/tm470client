import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import van from '../images/van.png';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';
import axios from "axios";

const Login: React.FC = () => {
    const history = useHistory();
    const [login, setLogin] = useState<string>("12345678");
    const [password, setPassword] = useState<string>("5060");
    const [isError, setIsError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const handleLogin = () => {
        if (!login) {
            setMessage("Please enter a valid personnel number");
            setIsError(true);
            return;
        }

        if (login.length !== 8) {
            setMessage("Please enter your 8 digit personnel number");
            setIsError(true);
            return;
        }

        if (!password || password.length !== 4) {
            setMessage("Please enter your 4 digit PIN Number");
            setIsError(true);
            return;
        }


        const loginData = {
            login: login,
            password: password
        }

        //alert(loginData.login + " " + loginData.password);

        const api = axios.create({
            baseURL: `https://reqres.in/api`
        })
        api.post("/login", loginData)
            .then(res => {
                history.push("/dashboard/" + loginData);
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
                    <IonTitle>TM470 Login</IonTitle>
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
                                style={{ fontSize: "70px", color: "#eb445a" }}
                                icon={personCircle}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"> Personnel Number </IonLabel>
                                <IonInput
                                    type="text"
                                    value={login}
                                    minlength={8}
                                    maxlength={8}
                                    onIonChange={(e) => setLogin(e.detail.value!)}
                                >
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"> PIN Number</IonLabel>
                                <IonInput
                                    type="password"
                                    value={password}
                                    minlength={4}
                                    maxlength={4}
                                    onIonChange={(e) => setPassword(e.detail.value!)}
                                >
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <p style={{ fontSize: "small" }}>
                                By clicking LOGIN you agree to our acceptable use Policy
                            </p>
                            <IonButton color="danger" onClick={handleLogin}>Login</IonButton>

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

export default Login;