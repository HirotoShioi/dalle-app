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
        <form @submit.prevent="submit">
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
            >{{ submiText }}</IonButton
          >
        </form>
      </div>
      <div class="generated-images">
        <IonGrid>
          <IonRow>
            <IonCol
              size="12"
              size-sm="12"
              size-md="6"
              size-lg="6"
              size-xl="6"
              v-for="(image, i) in images"
              :key="image.image"
            >
              <IonCard button>
                <div class="image-container">
                  <img :src="image.image" />
                </div>
                <!-- <IonCardHeader>
                  <IonCardTitle>{{ image.id }}</IonCardTitle>
                  <IonCardSubtitle>#{{ i + 1 }}</IonCardSubtitle>
                </IonCardHeader> -->
                <IonCardContent>
                  <h2>#{{ i + 1 }}</h2>
                  <p>{{ image.id }}</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCard,
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
  IonCardContent,
} from "@ionic/vue";
import { computed, ref } from "vue";
import { GenerateImageResponse, useStore } from "@/composables/store";

const prompt = ref("");
const isSubmitting = ref(false);
const store = useStore();

const submiText = computed(() => {
  return isSubmitting.value ? "生成中..." : "開始";
});
const images = ref<GenerateImageResponse[]>([]);
const submit = async () => {
  isSubmitting.value = true;
  const result = await store.generateImage(prompt.value).finally(() => {
    isSubmitting.value = false;
  });
  images.value = [...result, ...images.value];
};
</script>

<style scoped lang="scss">
.generated-images {
  max-width: 900px;
  margin: 0 auto;
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
    ion-card-content {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
}
</style>
