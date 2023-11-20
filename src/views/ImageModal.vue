<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle>{{ id }}</IonTitle>
      <IonButtons slot="end">
        <IonButton color="medium" @click="modalController.dismiss()">
          <IonIcon :icon="icons.closeCircle" />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <div class="image-container">
      <img :src="image" alt="" />
    </div>
    <p>{{ prompt }}</p>
  </IonContent>
</template>

<script setup lang="ts">
import { GenerateImageResponse } from "@/composables/imageGenerator";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  modalController,
} from "@ionic/vue";
import * as icons from "ionicons/icons";
defineProps<GenerateImageResponse>();
</script>

<style scoped lang="scss">
.image-container {
  display: flex;
  justify-content: center;
  img {
    height: auto;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
}
</style>
@/composables/imageGenerator
