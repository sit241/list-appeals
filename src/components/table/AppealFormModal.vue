<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'AppealFormModal',
    props: {
      appealId: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        isVisible: true,
        form: {
          premise_id: null,
          apartment_id: null,
          applicant: {
            last_name: '',
            first_name: '',
            patronymic_name: '',
            username: '',
          },
          description: '',
          due_date: '',
        },
      };
    },
    computed: {
      ...mapGetters('appeals', ['premises', 'apartments']),
    },
    methods: {
      ...mapActions('appeals', [
        'createAppeal',
        'updateAppeal',
        'fetchPremises',
        'fetchApartments',
      ]),
      async saveAppeal() {
        try {
          if (this.appealId) {
            await this.updateAppeal({
              appealId: this.appealId,
              appealData: this.form,
            });
          } else {
            await this.createAppeal(this.form);
          }
          this.close();
        } catch (error) {
          console.error('Ошибка сохранения заявки:', error);
        }
      },
      async fetchApartments() {
        if (this.form.premise_id) {
          await this.fetchApartments(this.form.premise_id);
        }
      },
      close() {
        this.isVisible = false;
        this.$emit('close');
      },
    },
    mounted() {
      this.fetchPremises();
      if (this.appealId) {
        this.$store
          .dispatch('appeals/fetchAppealDetails', this.appealId)
          .then(details => {
            this.form = details;
          });
      }
    },
  };
</script>

<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <h3>{{ appealId ? 'Редактировать заявку' : 'Создать заявку' }}</h3>

      <form @submit.prevent="saveAppeal">
        <div>
          <label>Дом:</label>
          <select v-model="form.premise_id" @change="fetchApartments">
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
        <div>
          <label>Квартира:</label>
          <select v-model="form.apartment_id">
            <option value="">Выберите квартиру</option>
            <option
              v-for="apartment in apartments"
              :key="apartment.id"
              :value="apartment.id"
            >
              {{ apartment.name }}
            </option>
          </select>
        </div>
        <div>
          <label>Заявитель:</label>
          <input v-model="form.applicant.last_name" placeholder="Фамилия" />
          <input v-model="form.applicant.first_name" placeholder="Имя" />
          <input
            v-model="form.applicant.patronymic_name"
            placeholder="Отчество"
          />
          <input v-model="form.applicant.username" placeholder="Телефон" />
        </div>
        <div>
          <label>Описание:</label>
          <textarea
            v-model="form.description"
            placeholder="Описание"
          ></textarea>
        </div>
        <div>
          <label>Срок:</label>
          <input type="datetime-local" v-model="form.due_date" />
        </div>

        <div class="actions">
          <button type="submit">Сохранить</button>
          <button type="button" @click="close">Отмена</button>
        </div>
      </form>
    </div>
  </div>
</template>
