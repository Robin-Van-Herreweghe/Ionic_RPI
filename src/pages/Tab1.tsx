import React, { useState, Fragment } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { connect as mqttConnect } from "mqtt"

const Tab1: React.FC = () => { 


  
  
  
  let mqttClient = mqttConnect("wss://mqtt.wdaan.tools")
  
  mqttClient.on("connect", function () {
    
    mqttClient.subscribe("PiRobin")
    
    mqttClient.publish("PiRobin", "Connected")
  })
  mqttClient.on("message", function (topic, message) {
    
    console.log(topic, message.toString())
  })

  function Pin_GPIO26() {
    console.log("GPIO26 Hoog");
    mqttClient.publish("PiRobin", JSON.stringify({pin: 37}))
    
    mqttClient.on("message", function (topic, message) {
      console.log(topic, message.toString())
    })
  }

  function Pin_GPIO19() {
    console.log("GPIO19 Hoog");
    mqttClient.publish("PiRobin", JSON.stringify({pin: 35}))
  }

  function Pin_clear(){
    mqttClient.publish("PiRobin", JSON.stringify({pin: 0}))
  }


  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pinnen sturen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton type="button" onClick={() => Pin_GPIO26()} >Zet uitgang hoog pin 37</IonButton>
        <IonButton type="button" onClick={() => Pin_GPIO19()} >Zet uitgang hoog pin 35</IonButton>
        <IonButton type="button" onClick={() => Pin_clear()} >zet bijde op 0</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
