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
  <IonContent>
    <div class="image-container">
      <img :src="image" alt="" />
    </div>
  </IonContent>
</template>

<script setup lang="ts">
import { GenerateImageResponse } from "@/composables/store";
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
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
}
</style>
