<script lang="ts" setup>
import {ref, watch, onMounted, onUpdated, onUnmounted} from "vue";
import {useRequestDetailsStore} from "@/stores/backofficeStores/RequestDetailsStore";
import {storeToRefs} from "pinia";

const requestDetailsStore = useRequestDetailsStore();
const {requestId, currentChat, currentChatNewMessage, chatUploadedFiles, fileIds} = storeToRefs(requestDetailsStore);
const {getChatMessages, uploadFile, sendMessage, removeUploadedFile} = requestDetailsStore;

const audioSwitch = ref(false);
const minutes = ref(0);
const seconds = ref(0);
const timer = ref();
const chatFetcher = ref();
const timeValue = ref(0);
const garbageShow = ref(false);
const messagesCount = ref(0);

watch(requestId, (newValue) => {
  if (newValue) {
    getChatMessages(requestId.value);
  }
});

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  chatFetcher.value = setInterval(() => {
    getChatMessages(requestId.value).then(() => {
      messagesCount.value = currentChat.value.messages.length;
    });
  }, 2000);
});

onUpdated(() => {
  const chatWindow = document.querySelector('.chat-container');
  if (chatWindow && currentChat.value.messages.length !== messagesCount.value) {
    chatWindow.scrollTo(0, chatWindow.scrollHeight);
    messagesCount.value = currentChat.value.messages.length;
  }
});

onUnmounted(() => {
  requestId.value = 0;
  clearInterval(chatFetcher.value)
});

const convertFileToBase64 = (file: any, callback: any) => {
  const reader = new FileReader();
  reader.onload = callback;
  reader.readAsDataURL(file);
};

const changeFile = (e:any) => {
  e.stopPropagation();
  e.preventDefault();
  Object.values(e.target.files).forEach((file:any) => {
    convertFileToBase64(file, (resp:any) => {
      const fileToSend = {
        file: resp.currentTarget.result,
        file_name: file.name,
      };
      uploadFile(fileToSend);
    });
  });
};

const clickFile = () => {
  document.getElementById("file-input")?.click();
}

const timerLoaded = () => {
  timer.value = setInterval(() => {
    if (timeValue.value < 100) {
      timeValue.value++
    }
    seconds.value++;
    if (seconds.value === 60) {
      seconds.value = 0;
      minutes.value++;
    }
  }, 1000)
}

const recordFile = ref([]);
const fileToSendLocal = ref();
const audioMic = navigator.mediaDevices.getUserMedia({ audio: true });

const recorder = ref();

const runAudio = async () => {
  recordFile.value = [];
  fileToSendLocal.value = null;

  if (navigator.mediaDevices) {
    audioMic.then((stream) => {
      recorder.value = new MediaRecorder(stream);
      recorder.value.ondataavailable = (e: { data: never }) => {
        recordFile.value.push(e.data);
      }
      recorder.value.start(1);
    });
  }
}

const stopAudio = () => {
  fileToSendLocal.value = new Blob(recordFile.value, { type: 'audio/mp3' });
  recorder.value.stop();
}

const startAudio = () => {
  audioSwitch.value = true;
  timerLoaded();
  runAudio();
}

const removeAudio = () => {
  recordFile.value = [];
  fileToSendLocal.value = '';
  minutes.value = 0;
  seconds.value = 0;
  timeValue.value = 0;
  audioSwitch.value = false;
  garbageShow.value = false;
};


const timerStop = () => {
  clearInterval(timer.value);
  garbageShow.value = true;
  stopAudio();
}

const sendAudio = () => {
  convertFileToBase64(fileToSendLocal.value, (resp:any) => {
    const fileToSend = {
      file: resp.currentTarget.result,
      file_name: `${new Date()}.mp3`,
    }
    uploadFile(fileToSend).then(() => {
      sendMessage({
        chat_id: requestId.value,
        content: currentChatNewMessage.value,
        file_ids: fileIds.value
      });
    }).then(() => {
      fileToSendLocal.value = '';
      audioSwitch.value = false;
      garbageShow.value = false;
    })
  });
}


const send = () => {
  if (currentChatNewMessage.value!.length > 0 || fileIds.value[0] !== 0) {
    sendMessage({
      chat_id: requestId.value,
      content: currentChatNewMessage.value,
      file_ids: fileIds.value
    }).then(() => {
      getChatMessages(requestId.value).then(() => {
        const chatWindow = document.querySelector('.chat-container');
        if (chatWindow) {
          chatWindow.scrollTo(0, chatWindow.scrollHeight);
        }
      })
    })
  }
}

</script>

<template>
  <v-card class="chat-component">
    <v-card-title>Заявка №{{ requestId }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="chat-container">
      <div
          v-for="(message, index) in currentChat.messages"
          :key="index"
          :class="['chat-container__message', message.kind === 'employee' ? 'sent-message' : 'received-message']"
      >
        <div class="chat-container__message__wrapper">
          <div class="chat-container__message__header">
              <span>
                {{ message.author }}
              </span>
              <span class="chat-container__message__time">
                {{ new Date(message.dt_created).toLocaleString('ru') }}
              </span>
          </div>
          <div
              v-if="message.type === 'text'"
              class="chat-container__message__text"
              v-html="message.value"
          />
          <a
              v-if="message.type === 'file' && message.link.indexOf('.mp3') === -1"
              :href="message.link"
              target="_blank"
              class="chat-container__message__text"
              v-html="message.value"
          />
          <audio
              v-if="message.type === 'file' && message.link.indexOf('.mp3') !== -1"
              :src="message.link"
              controls
          ></audio>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="chat-container__text-area">
      <v-btn
          icon
          @click="clickFile"
      >
        <v-icon>mdi-paperclip</v-icon>
        <input
            type="file"
            id="file-input"
            @change="changeFile"
            style="display: none;"
            multiple
        />
      </v-btn>
      <v-text-field
          v-model="currentChatNewMessage"
          label="Введите сообщение"
          append-icon="mdi-send"
          @click:append="send"
          outlined
          dense
      ></v-text-field>
      <v-btn
          v-if="!audioSwitch"
          icon
          @click="startAudio"
      >
        <v-icon>mdi-microphone</v-icon>
      </v-btn>
      <v-btn
          v-else-if="!garbageShow"
          icon
          @click="timerStop"
      >
        <v-icon>mdi-stop</v-icon>
      </v-btn>
      <v-btn
          v-if="garbageShow"
          icon
          @click="removeAudio"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn
          v-if="garbageShow"
          icon
          @click="sendAudio"
      >
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-card-actions>
    <div
        v-if="chatUploadedFiles.length > 0"
        class="included-files"
    >
      <div
          v-for="item in chatUploadedFiles"
          :key="item.id"
          class="included-files__item"
      >
          <span>
            {{ item.name }}
          </span>
        <v-btn
            icon
            width="22"
            height="22"
            @click="removeUploadedFile(item.id)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<style lang="scss">
.chat-component {
  .v-input__details {
    position: absolute !important;
  }
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: auto;

  .v-text-field {
    flex-grow: 1;
    position: relative;


  }


  &__message {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: $white;

    a {
      color: $white;
    }

    audio {
      width: 100%;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }

    &.sent-message {
      justify-content: flex-end;

      .chat-container__message__wrapper {
        background-color: $light-sky-blue;

        &:before {
          content: ' ';
          height: 0;
          position: absolute;
          width: 0;
          border: .6em solid transparent;
          border-left-color: $light-sky-blue;
          bottom: 12px;
          right: -1em;
        }
      }
    }

    &.received-message {
      .chat-container__message__wrapper {
        background-color: $emerald-green;

        &:after {
          content: ' ';
          height: 0;
          position: absolute;
          width: 0;
          border: .6em solid transparent;
          border-left-color: $emerald-green;
          bottom: 12px;
          left: -1em;
          transform: rotateY(180deg);
        }
      }
    }

    &__wrapper {
      position: relative;
      padding: 16px;
      border-radius: 20px;
      max-width: 300px;
      width: 100%;
    }
  }
}

.included-files {
  padding: 8px;

  &__item {
    display: flex;
    gap: 5px;
    align-items: center;
  }
}
</style>