<script
    setup
    lang="ts"
>
import {defineProps, onMounted} from 'vue';
import TableHeader from "@/components/UI/table/TableHeader.vue";
import TableRow from "@/components/UI/table/TableRow.vue";
import TablePagination from "@/components/UI/table/TablePagination.vue";
import {DataTableProps} from "@/stores/types/backofficeType/TableRowType";

const {tableType = '', count = 1, loader = false, title = ''} = defineProps<DataTableProps>();

onMounted(() => {
  const table = document.querySelector('.table-container');
  if (table) {
    doubleScroll(table);
  }
});

const doubleScroll = (element: Element) => {
  const scrollbar = document.createElement('div');
  const innerDiv = document.createElement('div');

  scrollbar.appendChild(innerDiv);
  scrollbar.style.overflow = 'auto';
  scrollbar.style.overflowY = 'hidden';

  // Убедимся, что firstChild существует и это HTMLElement
  if (innerDiv) {
    innerDiv.style.width = element.scrollWidth + 'px';
    innerDiv.style.paddingTop = '1px';
    innerDiv.appendChild(document.createTextNode('\xA0'));
  }

  // Добавление обработчиков событий через addEventListener
  scrollbar.addEventListener('scroll', () => {
    if (element instanceof HTMLElement) {
      element.scrollLeft = scrollbar.scrollLeft;
    }
  });

  if (element instanceof HTMLElement) {
    element.addEventListener('scroll', () => {
      scrollbar.scrollLeft = element.scrollLeft;
    });
  }

  // Проверка на null для parentNode
  if (element.parentNode) {
    element.parentNode.insertBefore(scrollbar, element);
  }
}
</script>

<template>
  <v-card class="dataTable">
    <v-card-title
        v-text="title"
    />
    <div class="table-container w-100">
      <table>
        <table-header
            :titles="titles"
            :tableType="tableType"
        />
        <v-progress-linear
            v-if="loader"
            indeterminate
            color="primary"
        />
        <tbody
            v-if="!loader"
        >
        <table-row
            v-if="requests.length"
            :rowContent="requests"
            :tableType="tableType"
        />
        <tr v-else>
          <td
              colspan="10"
              class="no-data-message"
          >
            <p>Нет данных для отображения</p>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <table-pagination
        :count="count"
    />
  </v-card>
</template>

<style lang="scss">
.dataTable {
  .table-container {
    overflow-x: auto;

    table {
      width: 100%;
    }
  }

  .grid-layout {
    display: grid;
    gap: 16px;
    align-items: center;

    tr, th {
      text-align: left;
    }

    &__requests {
      grid-template-columns: minmax(121.5px, 1fr) minmax(80px, 1fr) minmax(150px, 1fr) minmax(100px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr) minmax(150px, 1fr) minmax(340px, 1fr);
    }

    &__customers {
      grid-template-columns: minmax(121.5px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr) minmax(120px, 1fr)  minmax(200px, 1fr) minmax(200px, 1fr) minmax(160px, 1fr) minmax(340px, 1fr);
    }

    &__packages {
      grid-template-columns: minmax(214px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr) minmax(120px, 1fr) minmax(200px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr) minmax(170px, 1fr) minmax(340px, 1fr);
    }
  }


  .pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 8px;

    button {
      padding: 0;
      min-width: 32px;
      background-color: transparent;
      box-shadow: none;
      border-radius: 0;
      border: none;
    }

    span {
      margin-right: 16px;
      font-size: 14px;
    }

    .v-icon {
      font-size: 20px;
    }

    .v-btn--disabled {
      background-color: transparent;
      pointer-events: none;
    }
  }

  .white-row {
    background-color: $white;
  }

  .gradient-row {
    background: linear-gradient(to right, #f0f0f0, #e0e0e0);
  }

  .v-card--hover {
    &:hover {
      background: $soft-blue;
    }
  }
}
</style>
