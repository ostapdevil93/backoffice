<script
    setup
    lang="ts"
>
import {defineProps} from 'vue';
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import {useActionModalStore} from "@/stores/backofficeStores/ActionModal";
import {storeToRefs} from "pinia";
import {useErrorStore} from "@/stores/backofficeStores/ErrorStore";

const actionModal = useActionModalStore();
const generalSettings = useGeneralSettings();
const errorStore = useErrorStore();

const {userId, termId} = storeToRefs(actionModal);
const {dialog} = storeToRefs(generalSettings);

const {putAssigmentEmployers} = actionModal;
const {addError} = errorStore;

defineProps({
  options: {
    type: Array,
    default: []
  }
})

const close = () => {
  dialog.value = false;
  userId.value = 0;
  termId.value = '';
};

const assignExecutor = () => {
  if (termId.value !== '') {
    putAssigmentEmployers()
    close();
  } else {
    addError(null, 'Пожалуйста выберите специалиста');
  }
};

</script>

<template>
  <div class="action-modal">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="496"
        scrollable
        content-class="assign-dialog"
    >
      <v-card>
        <v-card-title class="assign-dialog__title d-flex justify-lg-space-between">
          <span class="headline">Назначить исполнителя для заявки</span>
          <v-spacer></v-spacer>
          <v-btn
              icon
              @click="close"
              class="close-btn"
              :rounded="0"
              color="transparent"
              variant="flat"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-select
                v-model:close="dialog"
                v-model="termId"
                :items="options"
                label="Выберите исполнителя"
                outlined
                dense
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions class="assign-dialog__actions">
          <v-btn
              color="primary"
              @click="assignExecutor"
          >Назначить
          </v-btn>
          <v-btn
              color="grey lighten-1"
              @click="close"
          >Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style
    scoped
    lang="scss"
>
.action-modal {
  .assign-dialog {
    top: 20px !important;
    margin: 0 auto;
  }

  .assign-dialog__title {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .close-btn {
    min-width: 24px;
    width: 24px;
    height: 24px;
    padding: 0;
    margin: 0;
    background-color: transparent !important; // Убираем белый кружок
    color: #000; // Цвет иконки крестика
  }

  .assign-dialog__actions {
    display: flex;
    justify-content: space-between;
    padding: 16px;
  }

  .v-btn {
    min-width: 100px;
  }

  .v-btn.primary {
    background-color: #4a90e2 !important;
    color: #fff;
  }

  .v-btn.grey {
    background-color: #f1f3f4 !important;
    color: #000;
  }

  .v-select {
    .v-input__control {
      border: 1px solid #4a90e2;
    }
  }
}
</style>
