<script>
  import { mapGetters, mapActions } from 'vuex';
  import CustomSelect from '@/components/other/CustomSelect.vue'; // Убедитесь, что путь правильный

  export default {
    name: 'Filters',
    components: {
      CustomSelect,
    },
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
      onPremiseSelect(value) {
        this.setFilters({ premiseId: value, search: '' });
        this.fetchAppeals();
      },
    },
  };
</script>

<template>
  <div class="filters">
    <div class="search">
      <input
        v-model="search"
        placeholder="Поиск (№ заявки, название)"
        @input="onSearchInput"
      />
      <i class="mdi mdi-magnify"></i>
    </div>

    <div class="select">
      <CustomSelect
        :options="premises"
        v-model="premiseId"
        placeholder="Дом"
        @input="onPremiseSelect"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/variables.scss';

  .filters {
    display: flex;
    gap: 16px;

    width: 100%;

    color: #999999;

    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .filters input {
    padding: 18px;
    padding-left: 0;
    overflow: visible;
  }

  .search {
    width: 50%;
    border-bottom: 1px solid $border-color;

    display: flex;

    input {
      all: unset;
      flex-grow: 1;
      border: none;
    }

    i {
      font-size: 24px;
      display: flex;
      align-items: center;
      padding: 12px;
    }
  }

  .select {
    width: 50%;
    border-bottom: 1px solid $border-color;
  }
</style>
