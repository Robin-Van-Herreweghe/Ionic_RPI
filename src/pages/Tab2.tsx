import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonLabel, IonItem, IonToolbar, IonButton, IonToggle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { connect as mqttConnect } from "mqtt"
import { colorPalette, logoAlipay } from 'ionicons/icons';

const Tab2: React.FC = () => {

  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  let mqttClient = mqttConnect("wss://mqtt.wdaan.tools")
  
  mqttClient.on("connect", function () {
    
    mqttClient.subscribe("PiRobin")
    
   
  })
  mqttClient.on("message", function (topic, message) {
    
    console.log(topic, message.toString())
    if(message.toString() == "pin 33 is laag"){
      
      setChecked(false)
      console.log("checked low");
    }
    else if(message.toString() == "Pin 33 is hoog"){
      
      setChecked(true)
      console.log("checked high");
    }


    if(message.toString() == "pin 31 is laag"){
      
      setChecked2(false)
      console.log("checked P2 low");
    }
    else if(message.toString() == "Pin 31 is hoog"){
      
      setChecked2(true)
      console.log("checked P2 high");
    }
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pinnen inlezen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonItem>
        <div>
          <IonLabel>Status Pin 33:</IonLabel>
          <IonToggle checked={checked} disabled={true} onIonChange={e => setChecked(e.detail.checked)} /> 
        </div>
      </IonItem>
      <IonItem>
        <div>
          <IonLabel>Status Pin 31:</IonLabel>
          <IonToggle checked={checked2} disabled={true} onIonChange={e => setChecked2(e.detail.checked)} />
        </div>
      </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
 