import { alertController, useIonRouter } from "@ionic/vue";
import { defineStore } from "pinia";
import { ref } from "vue";

export type GenerateImageResponse = {
  id: string;
  image: string;
  prompt: string;
  property?: object;
};

interface ImageGenerator {
  generateImage: (prompt: string) => Promise<GenerateImageResponse>;
}

export const useImageGenerator = defineStore(
  "store",
  () => {
    const router = useIonRouter();
    const openAIToken = ref();
    const imgbbToken = ref();
    const generatedImages = ref<GenerateImageResponse[]>([]);

    const generateImage = async (prompt: string) => {
      if (!openAIToken.value) {
        const alert = await alertController.create({
          header: "OpenAI Tokenがセットされていません",
          message: "設定画面からOpenAI Tokenをセットしてください",
          buttons: [
            {
              text: "設定画面へ",
              handler: () => {
                router.push({ name: "settings" });
              },
            },
          ],
        });
        await alert.present();
        return [];
      }
      if (!imgbbToken.value) {
        const alert = await alertController.create({
          header: "imgbb Tokenがセットされていません",
          message: "設定画面からimgbb Tokenをセットしてください",
          buttons: [
            {
              text: "設定画面へ",
              handler: () => {
                router.push({ name: "settings" });
              },
            },
          ],
        });
        await alert.present();
        return [];
      }
      if (!prompt || prompt.length === 0) {
        const alert = await alertController.create({
          header: "Promptが入力されていません",
          message: "Promptを入力してください",
          buttons: ["OK"],
        });
        await alert.present();
        return [];
      }
      const imageGenerators: ImageGenerator[] = [
        Dalle2ImageGenerator.create(openAIToken.value),
        Dalle3ImageGenerator.create(openAIToken.value),
      ];
      const imgs = await Promise.all(
        imageGenerators.map((generator) => generator.generateImage(prompt))
      );
      const result = await Promise.all(
        imgs.map(async (img) => {
          const url = await storeImage(imgbbToken.value, img.image);
          return {
            ...img,
            image: url,
          };
        })
      );
      generatedImages.value = [...result, ...generatedImages.value];
    };

    return {
      openAIToken,
      generateImage,
      generatedImages,
      imgbbToken,
    };
  },
  {
    persist: {
      serializer: {
        serialize: (value) => {
          return JSON.stringify({
            openAIToken: value.openAIToken,
            generatedImages: value.generatedImages,
            imgbbToken: value.imgbbToken,
          });
        },
        deserialize: (value) => {
          return JSON.parse(value) as {
            openAIToken: string;
            generatedImages: GenerateImageResponse[];
            imgbbToken: string;
          };
        },
      },
    },
  }
);

class Dalle2ImageGenerator implements ImageGenerator {
  constructor(readonly token: string) {}
  static create(token: string) {
    return new Dalle2ImageGenerator(token);
  }
  async generateImage(prompt: string): Promise<GenerateImageResponse> {
    const result = await fetch("https://api.openai.com/v1/images/generations", {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        prompt,
        model: "dall-e-2",
        n: 1,
        quality: "standard",
        response_format: "url",
        size: "512x512",
      }),
    });
    const fetchedImage = await result.json();
    return {
      id: "DALL-E-2",
      prompt,
      image: fetchedImage.data[0].url as string,
    };
  }
}

class Dalle3ImageGenerator implements ImageGenerator {
  constructor(readonly token: string) {}
  static create(token: string) {
    return new Dalle3ImageGenerator(token);
  }
  async generateImage(prompt: string): Promise<GenerateImageResponse> {
    const result = await fetch("https://api.openai.com/v1/images/generations", {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
        model: "dall-e-3",
        n: 1,
        quality: "standard",
        response_format: "url",
        size: "1024x1024",
      }),
    });
    const fetchedImage = await result.json();
    return {
      id: "DALL-E-3",
      prompt,
      image: fetchedImage.data[0].url as string,
    };
  }
}

const storeImage = async (token: string, image: string) => {
  const url = new URL("https://api.imgbb.com/1/upload");
  const form = new FormData();
  form.append("image", image);
  url.searchParams.append("key", token);
  const result = await fetch(url, {
    method: "POST",
    body: form,
  });
  const uploadedImage = await result.json();
  console.log(uploadedImage);
  return uploadedImage.data.url;
};
