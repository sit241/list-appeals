<script>
  import Pagination from '@/components/table/Pagination.vue';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'AppealsList',
    components: {
      Pagination,
    },
    data() {
      return {
        filters: {
          search: '',
          premiseId: null,
          debounceTimeout: null,
        },
      };
    },
    computed: {
      ...mapGetters('appealsModule', [
        'appeals',
        'premises',
        'pagination',
        'isLoading',
      ]),

      // получаем адресс, если вообще есть хоть какой-то. в случае полного отствия хоть каких-то данных по адресу, возвращаем заглушку
      getAddress() {
        return appeal => {
          const addressParts = [];
          if (appeal && appeal.premise && appeal.premise.short_address) {
            addressParts.push(appeal.premise.short_address);
          }
          if (appeal && appeal.apartment && appeal.apartment.label) {
            addressParts.push(appeal.apartment.label);
          }
          return addressParts.join(', ') || 'Адрес отсутствует';
        };
      },
    },
    methods: {
      ...mapActions('appealsModule', [
        'fetchPremises',
        'setFilters',
        'setPagination',
        'fetchAppeals',
        'setLoadingOn',
      ]),
      handlePageChange(page) {
        this.setPagination({ page });
        this.fetchAppeals();
      },
      editAppeal(appeal) {
        this.$emit('editAppeal', appeal);
      },
      updateFiltersHouse() {
        this.setFilters({ premiseId: this.filters.premiseId });
        this.fetchAppeals();
      },
      updateFiltersSearch() {
        this.setLoadingOn();
        clearTimeout(this.debounceTimeout);

        this.debounceTimeout = setTimeout(() => {
          this.setFilters({ search: this.filters.search });
          this.fetchAppeals();
        }, 300);
      },
    },
    mounted() {
      this.fetchPremises();
      this.fetchAppeals();
    },
  };
</script>

<template>
  <div class="appeals-list">
    <div class="filters">
      <input
        v-model="filters.search"
        placeholder="Поиск по заявкам"
        @input="updateFiltersSearch"
      />
      <select
        v-if="premises && premises.length"
        v-model="filters.premiseId"
        @change="updateFiltersHouse"
      >
        <option
          v-for="premise in premises"
          :key="premise.id"
          :value="premise.id"
        >
          {{ premise.address }}
        </option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Создана</th>
          <th>Адрес</th>
          <th>Заявитель</th>
          <th>Описание</th>
          <th>Срок</th>
          <th>Статус</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td colspan="8">загрузка</td>
        </tr>
        <tr v-else-if="appeals.length === 0">
          <td colspan="8">Заявки не найдены</td>
        </tr>
        <tr v-for="appeal in appeals" :key="appeal.id">
          <td>{{ appeal.number }}</td>
          <td>
            {{
              new Date(appeal.created_at).toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })
            }}
          </td>
          <td>
            {{ getAddress(appeal) }}
          </td>
          <td>
            {{ appeal.applicant.last_name }}
            {{ appeal.applicant.first_name[0] }}.{{
              appeal.applicant.patronymic_name[0]
            }}.
          </td>
          <td>{{ appeal.description }}</td>
          <td>
            {{
              new Date(appeal.due_date).toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            }}
          </td>
          <td>{{ appeal.status.name }}</td>
          <td>
            <button @click="editAppeal(appeal)">Редактировать</button>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination
      :page="pagination.page"
      :pageSize="pagination.pageSize"
      :total="pagination.total"
      @change="handlePageChange"
    />
  </div>
</template>

<style lang="scss">
  @import '@/assets/scss/variables.scss';

  .appeals-list {
    background-color: $background-color;

    top: 27px;
    left: 15px;
    padding: 10px 20px 10px 20px;
    gap: 32px;
    border-radius: 8px;
  }
</style>
