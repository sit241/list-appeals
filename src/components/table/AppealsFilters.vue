<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Filters',
    data() {
      return {
        debounceTimeout: null,
        isDropdownOpen: false,
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
      selectedPremise() {
        const selected = this.premises.find(p => p.id === this.premiseId);
        return selected ? selected.address : 'Дом';
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
        this.isDropdownOpen = false;
        this.setFilters({ premiseId: value, search: '' });
        this.fetchAppeals();
      },
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
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
    <i class="mdi mdi-magnify"></i>

    <div class="custom-select">
      <div class="custom-select-trigger" @click="toggleDropdown">
        {{ selectedPremise }}
        <i
          class="mdi mdi-chevron-down"
          :class="isDropdownOpen ? 'open' : ''"
        ></i>
      </div>
      <ul v-if="isDropdownOpen" class="custom-options">
        <li
          v-for="premise in premises"
          :key="premise.id"
          class="custom-option"
          :class="{ selected: premiseId === premise.id }"
          @click="onPremiseSelect(premise.id)"
        >
          {{ premise.address }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/variables.scss';

  .filters {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
  }

  .filters input {
    padding: 8px;
  }

  .custom-select {
    position: relative;
    width: 250px;

    .custom-select-trigger {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 12px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      transition: background 0.3s, border-color 0.3s;

      &:hover {
        background: #e9ecef;
      }

      .mdi-chevron-down {
        transition: transform 0.3s;
      }

      .mdi-chevron-down.open {
        transform: rotate(-180deg);
      }
    }

    .custom-options {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      z-index: 10;
      max-height: 400px;
      padding: 0;
      overflow-y: auto;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      animation: fadeIn 0.3s;

      .custom-option {
        list-style: none;
        padding: 12px;
        margin: 0;

        font-size: 15px;
        font-weight: 400;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
        background: $background-color;

        &:hover {
          background: $primary-color;
          color: $background-color;
        }

        &.selected {
          font-weight: 600;
          background: $primary-hover;
        }
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
