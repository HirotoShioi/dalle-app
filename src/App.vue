<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>DALL-E 3</IonTitle>
      </IonToolbar>
      <IonProgressBar
        v-if="isSubmitting"
        type="indeterminate"
        color="primary"
      />
    </IonHeader>
    <IonContent class="ion-padding" fullscreen>
      <div class="media-container">
        <form @submit.prevent="submit">
          <div class="form-group">
            <IonInput
              fill="outline"
              mode="md"
              placeholder="Tokenを入力してください"
              v-model="token"
            />
          </div>
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
  IonPage,
  IonProgressBar,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { ref } from "vue";
import OpenAI from "openai";

const token = ref("");
const prompt = ref("");
const isSubmitting = ref(false);
const images = ref<OpenAI.Image[]>([]);
const submit = async () => {
  if (!token.value) {
    alert("Tokenを入力してください");
    return;
  }
  if (!prompt.value) {
    alert("画像の説明を入力してください");
    return;
  }
  isSubmitting.value = true;
  // 現在のレートリミットを調べる
  const result = await fetch("https://api.openai.com/v1/images/generations", {
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      prompt: prompt.value,
      model: "dall-e-3",
      n: 1,
      quality: "standard",
      response_format: "url",
      size: "1024x1024",
    }),
  }).finally(() => {
    isSubmitting.value = false;
  });
  console.log(result);
  result.headers.forEach((value, key) => {
    console.log({
      key,
      value,
    });
  });
  const fetchedImage = await result.json();
  console.log(fetchedImage);
  images.value = [...images.value, ...(fetchedImage.data as OpenAI.Image[])];
};
</script>

<style scoped lang="scss">
.form-group {
  margin-bottom: 10px;
}
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
