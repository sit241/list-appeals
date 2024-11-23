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
        },
      };
    },
    computed: {
      ...mapGetters('appealsModule', ['appeals', 'premises', 'pagination']),
    },
    methods: {
      ...mapActions('appealsModule', [
        'fetchPremises',
        'setFilters',
        'setPagination',
        'setFiltersAndFetch',
        'fetchAppeals',
      ]),
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
    <div class="filters">
      <input
        v-model="filters.search"
        placeholder="Поиск по заявкам"
        @input="fetchAppeals"
      />
      <select
        v-if="premises && premises.length"
        v-model="filters.premiseId"
        @change="fetchAppeals"
      >
        <option value="">Выберите дом</option>
        <option
          v-for="premise in premises"
          :key="premise.id"
          :value="premise.id"
        >
          {{ premise.name }}
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
        <tr v-if="appeals.length === 0">
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
            <div
              class=""
              v-if="
                appeal &&
                  appeal.premise &&
                  appeal.premise.short_address &&
                  appeal.apartment &&
                  appeal.apartment.label
              "
            >
              {{ appeal.premise.short_address }},
              {{ appeal.apartment.label }}
            </div>

            <div class="" v-else>
              <pre>Адрес отсутвует</pre>
            </div>
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
