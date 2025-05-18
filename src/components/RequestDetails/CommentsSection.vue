<script
    lang="ts"
    setup
>
import {defineProps, onBeforeMount, ref} from "vue";
import {useRequestDetailsStore} from "@/stores/backofficeStores/RequestDetailsStore";
import {storeToRefs} from "pinia";

const requestDetailsStore = useRequestDetailsStore();

const {reviewData, reviews} = storeToRefs(requestDetailsStore);

const {getReviews, sendReview} = requestDetailsStore;

const newComment = ref('');

const props = defineProps<{customerId: number | undefined}>();

const addComment = () => {
  if (newComment.value.trim()) {
    reviewData.value.text = newComment.value;
    reviewData.value.user_id = props.customerId;
    sendReview();
    newComment.value = '';
  }
};

onBeforeMount(() => {
  getReviews();
})
</script>

<template>
  <v-card-text class="comments-section">
    <h3>Комментарии специалистов о пользователе</h3>
    <v-list>
      <v-list-item
          class="pa-0"
          v-for="(comment, index) in reviews"
          :key="index"
      >
        <v-list-item class="pa-0">
          <v-list-item-title class="comments-section__comment-author">{{
              comment.specialist.first_name + ' ' + comment.specialist.last_name
            }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ comment.text }}</v-list-item-subtitle>
        </v-list-item>
      </v-list-item>
    </v-list>
    <v-textarea
        class="mb-3"
        v-model="newComment"
        label="Добавьте новый комментарий"
        rows="2"
        outlined
    />
    <v-btn
        color="light-blue"
        block
        @click="addComment"
    >
      Добавить новый комментарий
    </v-btn>
  </v-card-text>

</template>

<style lang="scss">
.comments-section {

  &__comment-author {
    font-weight: 400;
    color: $light-gray;
  }
}
</style>
