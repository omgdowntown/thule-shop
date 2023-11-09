<script setup>
const availableBikeFilter = computed(() => {
  return [2, 3, 4];
});

const props = defineProps({
  quantity: Number,
  modelValue: Array,
  eBikeFilter: Boolean,
});

const selectedBikeNumbers = ref([]);
const eBikeChecked = ref(null);

const emit = defineEmits(['update:model-value', 'update:e-bike-filter']);

const filterByBikeNumber = (event) => {
  const { value } = event.target;

  if (event.target.checked) {
    emit('update:model-value', [...props.modelValue, Number(value)]);
  } else {
    emit(
      'update:model-value',
      props.modelValue.filter((item) => item !== Number(value))
    );
  }
};

const filterByEBikeCompatible = (event) => {
  const { checked } = event.target;

  if (checked) {
    emit('update:e-bike-filter', true);
  } else {
    emit('update:e-bike-filter', null);
  }
};

const clearAllFilters = () => {
  selectedBikeNumbers.value = [];
  eBikeChecked.value = null;
  emit('update:model-value', []);
  emit('update:e-bike-filter', null);
};
</script>

<template>
  <div
    class="relative grid grid-cols-6 py-4 border-t-2 border-b-2 border-dark-200"
  >
    <details
      class="col-span-6 overflow-hidden rounded [&_summary::-webkit-details-marker]:hidden"
    >
      <summary
        class="flex items-center justify-between list-none cursor-pointer"
      >
        <div class="flex items-center hover:font-semibold">
          <Icon name="mdi:filter-variant" size="22" class="mb-0.5 mr-2" />
          <span>Szűrés</span>
        </div>
      </summary>
      <div class="items-start pt-4 space-y-2 sm:space-y-0 sm:flex gap-x-6">
        <!-- MAX BIKE NUMBER FILTER -->
        <details
          class="overflow-hidden rounded [&_summary::-webkit-details-marker]:hidden group"
        >
          <summary
            class="flex items-center justify-between gap-2 text-gray-900 transition bg-white cursor-pointer"
          >
            <span class="text-gray-600 hover:text-dark-100">
              Szállítható kerékpárok
            </span>

            <span class="transition group-open:-rotate-180">
              <Icon name="mdi:chevron-down" class="mb-1" size="20" />
            </span>
          </summary>
          <div class="py-2 space-y-1">
            <label
              v-for="(option, index) in availableBikeFilter"
              :key="option"
              class="flex items-center pl-1"
              :for="'filterMaxBikeNumber-' + index"
            >
              <input
                :id="'filterMaxBikeNumber-' + index"
                type="checkbox"
                :value="option"
                @change="filterByBikeNumber"
                v-model="selectedBikeNumbers"
                class="w-5 h-5 mb-1 shadow text-dark-100 focus:ring-accent-100"
              />
              <span class="ml-2">{{ option }}</span>
            </label>
          </div>
        </details>

        <!-- E-BIKE COMPATIBLE FILTER -->
        <details
          class="overflow-hidden rounded [&_summary::-webkit-details-marker]:hidden group"
        >
          <summary
            class="flex items-center justify-between gap-2 text-gray-900 transition bg-white cursor-pointer"
          >
            <span class="text-gray-600 hover:text-dark-100">
              E-Bike kompatibilis
            </span>

            <span class="transition group-open:-rotate-180">
              <Icon name="mdi:chevron-down" class="mb-1" size="20" />
            </span>
          </summary>
          <div class="py-2 space-y-1">
            <label class="flex items-center pl-1" for="eBikeCompatible">
              <input
                id="eBikeCompatible"
                type="checkbox"
                :value="eBikeFilter"
                class="w-5 h-5 shadow text-dark-100 focus:ring-accent-100"
                @change="filterByEBikeCompatible"
                v-model="eBikeChecked"
              />
              <span class="ml-2">Igen</span>
            </label>
          </div>
        </details>

        <!-- CLEAR ALL FILTERS -->
        <button
          class="flex items-center ml-auto text-gray-600 hover:font-bold hover:text-dark-100"
          @click="clearAllFilters"
        >
          <span>Szűrők törlése</span
          ><Icon name="mdi:close" size="20" class="ml-1" />
        </button>
      </div>
    </details>
    <span class="absolute right-0 top-4">{{ quantity }} termék</span>
  </div>
</template>