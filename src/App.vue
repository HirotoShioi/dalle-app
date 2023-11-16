<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>DALL-E 2</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding" fullscreen>
      <div class="media-container">
        <div class="token-input">
          <IonInput
            fill="outline"
            mode="md"
            placeholder="Tokenを入力してください"
            v-model="token"
          />
        </div>
        <div class="prompt-input">
          <IonInput
            fill="outline"
            mode="md"
            placeholder="画像の説明を入力してください"
            v-model="prompt"
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
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { ref } from "vue";

const token = ref("");
const prompt = ref("");
</script>

<style scoped lang="scss">
.token-input {
  margin-bottom: 10px;
}
</style>
