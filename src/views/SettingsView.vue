<template>
  <IonPage id="main-content">
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>設定</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-content">
      <div class="media-container">設定</div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonMenuButton,
  IonButtons,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
</script>
