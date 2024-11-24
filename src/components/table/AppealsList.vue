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
    <div class="wrapper-btn">
      <button type="creat" class="creat-button">Создать</button>
    </div>

    <Filters />

    <table>
      <thead>
        <tr>
          <th @click="handleSort('number')" style="cursor: pointer">
            №
            <span v-if="sortBy === 'number'">
              <i v-if="sortOrder === 'asc'" class="mdi mdi-arrow-up"></i>
              <i v-else class="mdi mdi-arrow-down"></i>
            </span>
            <span v-else>
              <i class="mdi mdi-arrow-up grey" />
            </span>
          </th>
          <th @click="handleSort('created_at')" style="cursor: pointer">
            Создана
            <span v-if="sortBy === 'created_at'">
              <i v-if="sortOrder === 'asc'" class="mdi mdi-arrow-up"></i>
              <i v-else class="mdi mdi-arrow-down"></i>
            </span>
            <span v-else>
              <i class="mdi mdi-arrow-up grey" />
            </span>
          </th>
          <th>Адрес</th>
          <th>Заявитель</th>
          <th>Описание</th>
          <th>Срок</th>
          <th @click="handleSort('status')" style="cursor: pointer">
            Статус
            <span v-if="sortBy === 'status'">
              <i v-if="sortOrder === 'asc'" class="mdi mdi-arrow-up"></i>
              <i v-else class="mdi mdi-arrow-down"></i>
            </span>
            <span v-else>
              <i class="mdi mdi-arrow-up grey" />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td colspan="8">Загрузка...</td>
        </tr>
        <tr v-else-if="sortedAppeals.length === 0">
          <td colspan="8">Заявки не найдены</td>
        </tr>
        <template v-else>
          <tr v-for="appeal in sortedAppeals" :key="appeal.id">
            <td>
              <div class="number">
                {{ appeal.number }}
              </div>
            </td>
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
          </tr>
        </template>
      </tbody>
    </table>

    <pagination @change="fetchAppeals" />
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .wrapper-btn {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .creat-button {
    background-color: $primary-color;
    color: $background-color;
    cursor: pointer;
    border: none;

    box-shadow: 0px 4px 4px 0px #6aae5e40;

    width: 78px;
    height: 26px;
    padding: 10px 16px 10px 16px;
    gap: 4px;
    border-radius: 2px;
    opacity: 0px;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: $primary-hover;
    }
  }

  .appeals-list {
    background-color: $background-color;

    display: flex;
    flex-direction: column;
    gap: 32px;

    top: 27px;
    left: 15px;
    padding: 10px 20px 10px 20px;
    border-radius: 8px;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;

    color: $text-color;
  }

  th {
    cursor: pointer;
    color: $primary-color;

    .mdi {
      color: $text-color;
    }
  }

  th,
  tr,
  td {
    height: 58px;
    text-align: start;
    border-bottom: 1px solid $border-color;
    padding: 0;
  }

  .grey {
    color: $border-color !important;
  }

  .number {
    width: 56px;
    height: 28px;
    padding: 12px 16px 12px 16px;
    gap: 8px;
    border-radius: 4px;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3px;

    background-color: $primary-color;
    color: $background-color;

    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;

    cursor: pointer;
  }
</style>
