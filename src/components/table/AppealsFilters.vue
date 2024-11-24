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
    <div class="search">
      <input
        v-model="search"
        placeholder="Поиск (№ заявки, название)"
        @input="onSearchInput"
      />
      <i class="mdi mdi-magnify"></i>
    </div>

    <div class="custom-select">
      <div class="custom-select-trigger" @click="toggleDropdown">
        {{ selectedPremise }}
        <i class="mdi mdi-menu-up" :class="isDropdownOpen ? 'open' : ''"></i>
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

  .custom-select {
    position: relative;
    width: 50%;
    border-bottom: 1px solid $border-color;

    .custom-select-trigger {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 12px;
      padding-left: 0;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      transition: background 0.3s, border-color 0.3s;

      &:hover {
        background: #e9ecef;
      }

      .mdi-menu-up {
        font-size: 24px;
        transition: transform 0.3s;
        transform: rotate(-180deg);
      }

      .mdi-menu-up.open {
        transform: rotate(0deg);
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
