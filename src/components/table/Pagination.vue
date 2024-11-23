<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Pagination',
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
    },
    methods: {
      ...mapActions('appealsModule', ['setPagination', 'fetchAppeals']),
      changePage(newPage) {
        this.setPagination({ page: newPage });
        this.fetchAppeals();
      },
      changePageSize() {
        this.setPagination({ pageSize: this.pagination.pageSize, page: 1 });
        this.fetchAppeals();
      },
    },
  };
</script>

<template>
  <div class="pagination-wrapper">
    <div class="pagination-info">
      <span
        >{{ (pagination.page - 1) * pagination.pageSize + 1 }}–{{
          Math.min(pagination.page * pagination.pageSize, pagination.total)
        }}
        из {{ pagination.total }} записей</span
      >
      <select v-model="pagination.pageSize" @change="changePageSize">
        <option v-for="size in pageSizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
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

<style lang="scss">
  .pagination-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    button {
      padding: 5px 10px;
      border: none;
      cursor: pointer;
      font-size: 14px;

      &:disabled {
        cursor: not-allowed;
      }

      &.active {
        font-weight: bold;
      }
    }

    .dots {
      font-size: 14px;
    }
  }
</style>
