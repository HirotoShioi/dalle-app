import { alertController } from "@ionic/vue";
import { defineStore } from "pinia";
import { ref } from "vue";

interface ImageGenerator {
  generateImage: (prompt: string) => Promise<{
    id: string;
    image: string;
    property?: object;
  }>;
}

export const useStore = defineStore(
  "store",
  () => {
    const openAIToken = ref();

    const generateImage = async (prompt: string) => {
      if (!openAIToken.value) {
        const alert = await alertController.create({
          header: "OpenAI Tokenがセットされていません",
          message: "設定画面からOpenAI Tokenをセットしてください",
          buttons: ["OK"],
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
      const result = await Promise.all(
        imageGenerators.map((generator) => generator.generateImage(prompt))
      );
      return [...result];
    };

    return {
      openAIToken,
      generateImage,
    };
  },
  {
    persist: {
      serializer: {
        serialize: (value) => {
          return JSON.stringify(value.openAIToken);
        },
        deserialize: (value) => {
          return { openAIToken: JSON.parse(value) };
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
  async generateImage(
    prompt: string
  ): Promise<{ id: string; image: string; property?: object | undefined }> {
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
      image: fetchedImage.data[0],
    };
  }
}

class Dalle3ImageGenerator implements ImageGenerator {
  constructor(readonly token: string) {}
  static create(token: string) {
    return new Dalle3ImageGenerator(token);
  }
  async generateImage(
    prompt: string
  ): Promise<{ id: string; image: string; property?: object | undefined }> {
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
      image: fetchedImage.data[0],
    };
  }
}
