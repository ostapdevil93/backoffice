<script
    lang="ts"
    setup
>
import {defineProps} from "vue";
import {PurchasedPackagesProps} from "@/stores/types/backofficeType/RequestDetailsType";

defineProps<PurchasedPackagesProps>()
</script>

<template>

  <v-card-text class="purchased-packages">
    <h3 class="text-h6 font-weight-medium">Купленные пакеты</h3>
    <v-list dense>
      <v-list-item
          v-for="(pkg, index) in listPurchasedPackages"
          :key="index"
          class="purchased-packages__item pa-0 mt-5"
      >
        <v-card class="purchased-packages__card">
          <v-row>
            <v-col
                cols="12"
                class="text-body-2 grey--text text--darken-1"
            >Пакет: {{ pkg.name }}
            </v-col>
            <v-col
                cols="12"
                class="date-row"
            >Дата покупки:
              <v-chip
                  color="green"
                  class="chip"
              >{{ pkg.purchaseDate }}
              </v-chip>
            </v-col>
            <v-col
                cols="12"
                class="date-row"
            >Дата окончания:
              <v-chip
                  color="red"
                  class="chip"
              >{{ pkg.expiryDate }}
              </v-chip>
            </v-col>
          </v-row>
        </v-card>
      </v-list-item>
    </v-list>
  </v-card-text>
</template>

<style lang="scss">
.purchased-packages{
  &__card {
    padding: 16px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    .date-row {
      display: flex;
      align-items: center;
      margin-bottom: 4px;

      .chip {
        margin-left: 8px;
        font-size: 0.8rem;
      }
    }
  }
}

</style>
