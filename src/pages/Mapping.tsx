import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MyMap from "../components/Map";
import './Home.css';

const Mapping: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>TM470 Map Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">TM470 Map Page</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <MyMap />
            </IonContent>
        </IonPage>
    );
};

export default Mapping;