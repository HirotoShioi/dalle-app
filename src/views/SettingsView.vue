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
      <div class="media-container">
        <div class="form-group">
          <IonLabel>OpenAIのToken</IonLabel>
          <IonInput
            fill="outline"
            mode="md"
            placeholder="OpenAIのTokenを入力してください"
            v-model="store.openAIToken"
          />
        </div>
        <div class="form-group">
          <IonLabel>ClipDropのトークン</IonLabel>
          <IonInput
            fill="outline"
            mode="md"
            placeholder="ClipDropのTokenを入力してください"
            v-model="store.clipdropToken"
          />
        </div>
        <div class="form-group">
          <IonLabel>Imgbbのトークン</IonLabel>
          <IonInput
            fill="outline"
            mode="md"
            placeholder="imgbbのTokenを入力してください"
            v-model="store.imgbbToken"
          />
        </div>
      </div>
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
  IonInput,
  IonLabel,
} from "@ionic/vue";
import { useImageGenerator } from "@/composables/imageGenerator";
const store = useImageGenerator();
</script>

<style scoped lang="scss"></style>
