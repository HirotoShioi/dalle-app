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
          <IonInput
            label="OpenAIのToken"
            label-placement="floating"
            fill="outline"
            mode="md"
            placeholder="OpenAIのTokenを入力してください"
            v-model="store.openAIToken"
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
} from "@ionic/vue";
import { useStore } from "@/composables/store";
const store = useStore();
</script>

<style scoped lang="scss"></style>
