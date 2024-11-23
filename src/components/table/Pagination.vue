<script>
  export default {
    name: 'Pagination',
    props: {
      page: {
        type: Number,
        required: true,
      },
      pageSize: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    computed: {
      totalPages() {
        return Math.ceil(this.total / this.pageSize);
      },
    },
    methods: {
      changePage(newPage) {
        this.$emit('change', newPage);
      },
    },
  };
</script>

<template>
  <div class="pagination">
    <button :disabled="page === 1" @click="changePage(page - 1)">Назад</button>
    <span>Страница {{ page }} из {{ totalPages }}</span>
    <button :disabled="page === totalPages" @click="changePage(page + 1)">
      Вперед
    </button>
  </div>
</template>
