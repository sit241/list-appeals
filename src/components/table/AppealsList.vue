<script>
  import Pagination from '@/components/table/Pagination.vue';
  import Filters from '@/components/table/AppealsFilters.vue';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'AppealsList',
    components: {
      Pagination,
      Filters,
    },
    computed: {
      ...mapGetters('appealsModule', [
        'appeals',
        'sortedAppeals',
        'pagination',
        'isLoading',
        'sortBy',
        'sortOrder',
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
        'setSortBy',
        'setSortOrderActions',
        'fetchPremises',
        'setPagination',
        'fetchAppeals',
      ]),
      handleSort(field) {
        if (this.sortBy === field) {
          // Переключение порядка сортировки
          this.setSortOrderActions(this.sortOrder == 'asc' ? 'desc' : 'asc');
        } else {
          // Установка нового поля сортировки
          this.setSortBy(field);
          this.setSortOrderActions('asc');
        }
      },
      handlePageChange(page) {
        this.setPagination({ page });
        this.fetchAppeals();
      },
      editAppeal(appeal) {
        this.$emit('editAppeal', appeal);
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
    <Filters />

    <table>
      <thead>
        <tr>
          <th @click="handleSort('number')" style="cursor: pointer">
            №
            <span v-if="sortBy === 'number'">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th @click="handleSort('created_at')" style="cursor: pointer">
            Создана
            <span v-if="sortBy === 'created_at'">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th>Адрес</th>
          <th>Заявитель</th>
          <th>Описание</th>
          <th>Срок</th>
          <th @click="handleSort('status')" style="cursor: pointer">
            Статус
            <span v-if="sortBy === 'status'">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td colspan="8">Загрузка...</td>
        </tr>
        <tr v-else-if="sortedAppeals.length === 0">
          <td colspan="8">Заявки не найдены</td>
        </tr>
        <tr v-for="appeal in sortedAppeals" :key="appeal.id">
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
          <td>{{ getAddress(appeal) }}</td>
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

    <pagination @change="fetchAppeals" />
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

  th {
    cursor: pointer;
  }
</style>
