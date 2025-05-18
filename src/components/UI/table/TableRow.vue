<script
    lang="ts"
    setup
>
import {storeToRefs} from "pinia";
import {computed, defineProps, withDefaults} from "vue";
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import {CustomersResponse} from "@/api/Customers/models/CustomersResponse";
import {RequestItem} from "@/api/Requests/models/RequestsListResponse";
import {TableRowProps} from "@/stores/types/backofficeType/TableRowType";
import {useRequestDetailsStore} from "@/stores/backofficeStores/RequestDetailsStore";
import {useActionModalStore} from "@/stores/backofficeStores/ActionModal";
import {usePackageStore} from "@/stores/backofficeStores/PackageStore";
import {CanceledItem} from "@/api/Packages/models/PackagesResponse";

const generalSettings = useGeneralSettings();
const RequestDetailsStore = useRequestDetailsStore();
const packagesStore = usePackageStore();
const actionModalStore = useActionModalStore();

const {openChat, dialog, openClientDetails} = storeToRefs(generalSettings);
const {renderInfo, requestId, customerId, status} = storeToRefs(RequestDetailsStore);
const {userId} = storeToRefs(actionModalStore);
const {clientData} = storeToRefs(packagesStore);

const {formatDateString} = generalSettings;


const props = withDefaults(defineProps<TableRowProps>(), {
  tableType: 'requests'
});


const fields = computed(() => {
  switch (props.tableType) {
    case 'requests':
      return [
        {key: 'id'},
        {key: 'user_full_name'},
        {key: 'phone'},
        {key: 'service_name'},
        {key: 'package_name'},
        {key: 'assigned_employee'},
        {key: 'status.name'},
        {key: 'dt_created', format: formatDateString}
      ];
    case 'customers':
      return [
        {key: 'id'},
        {key: 'full_name'},
        {key: 'phone'},
        {key: 'certificate_code'},
        {key: 'package_count'},
        {key: 'dt_registered', format: formatDateString}
      ];
    case'packages':
      return [
        {
          key: 'order_id'
        },
        {
          key: 'certificate_number'
        },
        {
          key: 'partner'
        },
        {
          key: 'package'
        },
        {
          key: 'price'
        },
        {
          key: 'phone'
        },
        {
          key: 'customer_full_name'
        },
        {
          key: 'start_date',
          format: formatDateString
        },
        {
          key: 'end_date',
          format: formatDateString
        },
        {
          key: 'purchase_date',
          format: formatDateString
        }
      ]
    default:
      return [];
  }
});

const getValueByPath = (obj: RequestItem | CustomersResponse | CanceledItem, path: string): any => {
  const keys = path.split('.');
  let result: any = obj;

  for (const key of keys) {
    if (result && key in result) {
      result = result[key];
    } else {
      return 'Нет данных';
    }
  }
  return result;
};

const getDetails = (request_id: number | undefined, customer_id: number | null = 0) => {
  openChat.value = true;
  status.value = '';
  switch (props.tableType) {
    case 'requests':
      requestId.value = request_id || 0;
      customerId.value = customer_id || 0;
      break;
    case 'customers':
      customerId.value = request_id || 0;
      renderInfo.value = 'onlyCustomer';
      break;
  }

}

const putEmployer = (id: number | undefined) => {
  userId.value = id;
  dialog.value = true;
}

const showClientDetails = (item: RequestItem | CustomersResponse | CanceledItem | null) => {
  clientData.value = item;
  openClientDetails.value = true;
}
</script>

<template>
  <tr
      v-for="(item, index) in props.rowContent"
      :key="item.id ? item.id : item.order_id"
      :class="[
          `table-row py-3 px-5 grid-layout grid-layout__${props.tableType}`,
          'v-card--hover border-t',
          index % 2 !== 0 ? 'gradient-row' : 'white-row',
        ]"
  >
    <td
        v-if="props.tableType !=='packages'"
    >
      <v-btn
          text="ДЕТАЛИ"
          class="text-light-blue font-weight-bold"
          @click="getDetails(item?.id, item.customer_id ? item.customer_id : 0)"
      />
    </td>
    <td
        v-for="field in fields"
        :key="field.key"
        class="text-body-2"
    >
      {{ field.format ? field.format(getValueByPath(item, field.key)) : getValueByPath(item, field.key) }}
    </td>
    <td>
      <div
          :class="[
              'table-row__actions',
              props.tableType === 'customers' ? 'd-flex ga-2' : ''
          ]"
      >
        <v-btn
            v-if="props.tableType !=='packages'"
            v-text="props.tableType === 'customers' ? 'Купить пакет' : 'Действие'"
            color="primary"
            class="font-weight-bold"
            @click="putEmployer(item.id)"
            :width="props.tableType !== 'customers' ? '100%' : 'auto'"
        />
        <v-btn
            v-if="props.tableType ==='packages'"
            v-text="'Реквезиы для возврата'"
            color="primary"
            class="p-5 w-100"
            @click="showClientDetails(item)"
        />

        <v-btn
            v-if="props.tableType === 'customers'"
            text="Создать запрос"
            color="pink"
            class="font-weight-bold"
        ></v-btn>
      </div>

    </td>
  </tr>
</template>

