import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
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
    const [data, setData] = React.useState<string>("");
    const [auth, setAuth] = useState<boolean>(false);
    const handleLogin = () => {
        if (!login || login.length !== 8) {
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
            baseURL: `http://localhost:3000`,
        })
        api.get("/user/" + login)
            .then(res => {
                const output = res.data;
                setData(output);
                console.log(output.data[0].pernumber, output.data[0].password);
                alert('Hello, ' + output.data[0].username + '. You have successfully logged in.');
                setAuth(true);
            })
            .catch(error=>{
                setMessage("This personnel number is not recognised. Please try again.");
                setIsError(true)
                setAuth(false)
            })

        if (auth) {
            history.push('/select');
        } else {
            alert("This Personnel number / PIN Number combination is incorrect. Please try again.");
        }


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
                                <IonLabel position="floating">PIN Number</IonLabel>
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
                            <img src={van} alt={"van"} width={"200"} />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;