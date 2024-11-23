<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Filters',
    data() {
      return {
        debounceTimeout: null,
      };
    },
    computed: {
      ...mapGetters('appealsModule', ['premises', 'filters']),
      search: {
        get() {
          return this.filters.search;
        },
        set(value) {
          this.setFilters({ ...this.filters, search: value });
        },
      },
      premiseId: {
        get() {
          return this.filters.premiseId;
        },
        set(value) {
          this.setFilters({ ...this.filters, premiseId: value });
        },
      },
    },
    methods: {
      ...mapActions('appealsModule', [
        'setFilters',
        'fetchAppeals',
        'setLoadingOn',
      ]),

      onSearchInput() {
        this.setLoadingOn();
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
          this.setFilters({ search: this.search, premiseId: null });
          this.fetchAppeals();
        }, 300);
      },
      onPremiseChange() {
        this.setFilters({ premiseId: this.premiseId, search: '' });
        this.fetchAppeals();
      },
    },
  };
</script>

<template>
  <div class="filters">
    <input
      v-model="search"
      placeholder="Поиск по заявкам"
      @input="onSearchInput"
    />
    <select
      v-if="premises && premises.length"
      v-model="premiseId"
      @change="onPremiseChange"
    >
      <option value="">Все дома</option>
      <option v-for="premise in premises" :key="premise.id" :value="premise.id">
        {{ premise.address }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
  .filters {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
  }

  .filters input,
  .filters select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
