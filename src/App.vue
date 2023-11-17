<template>
  <IonApp>
    <IonMenu content-id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>メニュー</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle :auto-hide="false">
            <IonItem
              @click="$router.replace({ name: 'home' })"
              lines="full"
              button
            >
              <IonLabel>ホーム</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle :auto-hide="false">
            <IonItem
              @click="$router.replace({ name: 'settings' })"
              lines="full"
              button
            >
              <IonLabel>設定</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
    <IonRouterOutlet :animated="false" />
  </IonApp>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonItem,
  IonLabel,
  IonList,
  IonMenuToggle,
  IonToolbar,
  IonRouterOutlet,
  IonApp,
} from "@ionic/vue";
</script>
