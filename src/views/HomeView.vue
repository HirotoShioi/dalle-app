<template>
  <IonPage id="main-content">
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>AIで画像生成</IonTitle>
        <IonProgressBar
          v-if="isSubmitting"
          type="indeterminate"
          color="primary"
        />
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding" fullscreen>
      <div class="media-container">
        <form @submit.prevent="store.generateImage(prompt)">
          <div class="form-group">
            <IonInput
              fill="outline"
              mode="md"
              placeholder="画像の説明を入力してください"
              v-model="prompt"
            />
          </div>
          <IonButton
            type="submit"
            expand="block"
            color="primary"
            :disabled="isSubmitting"
            >送信</IonButton
          >
        </form>
        <div class="generated-images">
          <IonGrid>
            <IonRow>
              <IonCol size="12" v-for="(image, i) in images" :key="image.url">
                <IonCard>
                  <div class="image-container">
                    <img :src="image.url" />
                  </div>
                  <IonCardContent> #{{ i + 1 }} </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonMenuButton,
  IonButtons,
  IonPage,
  IonProgressBar,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { ref } from "vue";
import OpenAI from "openai";
import { useStore } from "@/composables/store";

const prompt = ref("");
const isSubmitting = ref(false);
const images = ref<OpenAI.Image[]>([]);
const store = useStore();
</script>

<style scoped lang="scss">
.generated-images {
  ion-grid {
    padding-inline-start: 0;
    padding-inline-end: 0;
  }
  ion-card {
    margin-bottom: 10px;
    margin-inline: 0;
    img {
      width: 100%;
    }
  }
}
</style>
