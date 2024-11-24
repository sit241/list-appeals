<script>
  export default {
    name: 'CustomSelect',
    props: {
      options: {
        type: Array,
        required: true,
      },
      value: {
        type: [String, Number],
        default: null,
      },
      placeholder: {
        type: String,
        default: 'Выберите',
      },
      direction: {
        type: String,
        default: 'down',
        validator: value => ['up', 'down'].includes(value),
      },
    },
    data() {
      return {
        isDropdownOpen: false,
      };
    },
    computed: {
      displayText() {
        const selected = this.options.find(option => option.id === this.value);
        return selected ? selected.address : this.placeholder;
      },
      dropdownClass() {
        return {
          'custom-options': true,
          open: this.isDropdownOpen,
          [this.direction]: true,
        };
      },
    },
    methods: {
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
      selectOption(id) {
        this.$emit('input', id); // Для поддержки v-model
        this.isDropdownOpen = false;
      },
      handleClickOutside(event) {
        if (!this.$el.contains(event.target)) {
          this.isDropdownOpen = false;
        }
      },
    },
    // Закрываем дропдаун при клике вне компонента
    mounted() {
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleClickOutside);
    },
  };
</script>

<template>
  <div class="custom-select" :class="direction">
    <div class="custom-select-trigger" @click="toggleDropdown">
      {{ displayText }}
      <i class="mdi mdi-menu-up" :class="{ open: isDropdownOpen }"></i>
    </div>
    <ul v-if="isDropdownOpen" :class="dropdownClass">
      <li
        v-for="option in options"
        :key="option.id"
        class="custom-option"
        :class="{ selected: option.id === value }"
        @click="selectOption(option.id)"
      >
        {{ option.address }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/variables.scss';

  .custom-select {
    position: relative;
    width: 100%;
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
        transform: rotate(0deg);

        &.open {
          transform: rotate(180deg);
        }

        &.rotate-up {
          transform: rotate(0deg);
        }

        &.rotate-down {
          transform: rotate(180deg);
        }
      }
    }

    .custom-options {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 10;
      max-height: 400px;
      padding: 0;
      overflow-y: auto;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      animation: fadeIn 0.3s;

      &.down {
        top: calc(100% + 4px);
      }

      &.up {
        bottom: calc(100% + 4px);
      }

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
