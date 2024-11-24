<script>
  import { mapGetters, mapActions } from 'vuex';
  import CustomSelect from '@/components/other/CustomSelect.vue';

  export default {
    name: 'Pagination',
    components: {
      CustomSelect,
    },
    data() {
      return {
        pageSizes: [10, 20, 50, 100], // Возможные размеры страницы
      };
    },
    computed: {
      ...mapGetters('appealsModule', ['pagination']),
      totalPages() {
        return Math.ceil(this.pagination.total / this.pagination.pageSize);
      },
      visiblePages() {
        const pages = [];
        const range = 2;
        if (this.totalPages <= 5 + range * 2) {
          for (let i = 1; i <= this.totalPages; i++) pages.push(i);
        } else {
          if (this.pagination.page > range + 3) pages.push(1, '...');
          for (
            let i = Math.max(1, this.pagination.page - range);
            i <= Math.min(this.totalPages, this.pagination.page + range);
            i++
          ) {
            pages.push(i);
          }
          if (this.pagination.page < this.totalPages - range - 2)
            pages.push('...', this.totalPages);
        }
        return pages;
      },
      pageSizeOptions() {
        // Преобразуем pageSizes в формат, ожидаемый CustomSelect
        return this.pageSizes.map(size => ({
          id: size,
          address: size.toString(),
        }));
      },
    },
    methods: {
      ...mapActions('appealsModule', ['setPagination', 'fetchAppeals']),
      changePage(newPage) {
        this.setPagination({ page: newPage });
        this.fetchAppeals();
      },
      changePageSize(newSize) {
        this.setPagination({ pageSize: newSize, page: 1 });
        this.fetchAppeals();
      },
    },
  };
</script>

<template>
  <div class="pagination-wrapper">
    <div class="pagination-info">
      <span class="text">
        <strong>{{ (pagination.page - 1) * pagination.pageSize + 1 }}</strong>
        –
        <strong>{{
          Math.min(pagination.page * pagination.pageSize, pagination.total)
        }}</strong>
        из <strong>{{ pagination.total }}</strong> записей
      </span>

      <div class="select">
        <CustomSelect
          :options="pageSizeOptions"
          v-model="pagination.pageSize"
          placeholder="Страница"
          @input="changePageSize"
          direction="up"
        />
      </div>
    </div>
    <div class="pagination">
      <button :disabled="pagination.page === 1" @click="changePage(1)">
        «
      </button>
      <button
        :disabled="pagination.page === 1"
        @click="changePage(pagination.page - 1)"
      >
        ‹
      </button>
      <button
        v-for="pageNumber in visiblePages"
        :key="pageNumber"
        :class="{ active: pagination.page === pageNumber }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </button>
      <button
        :disabled="pagination.page === totalPages"
        @click="changePage(pagination.page + 1)"
      >
        ›
      </button>
      <button
        :disabled="pagination.page === totalPages"
        @click="changePage(totalPages)"
      >
        »
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .pagination-wrapper {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .pagination-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 16px;

    .text {
      font-size: 14px;
      line-height: 16.41px;
      text-align: left;
      text-underline-position: from-font;
      text-decoration-skip-ink: none;
      white-space: nowrap;
    }

    .select {
      height: 40px;
      width: 89px;
      border-bottom: 1px solid $border-color;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    button {
      width: 38px;

      padding: 5px 10px;
      border: none;
      cursor: pointer;
      font-size: 14px;
      background-color: transparent;

      &:disabled {
        cursor: not-allowed;
      }

      &.active {
        display: flex;
        align-items: center;
        justify-content: center;

        font-weight: bold;
        width: 32px;
        height: 32px;
        padding: 10px 16px 10px 16px;
        gap: 4px;
        border-radius: 50px;

        background-color: $primary-color;
        color: $background-color;
      }
    }

    .dots {
      font-size: 14px;
    }
  }
</style>
