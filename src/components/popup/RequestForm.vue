<script>
  import { mapGetters, mapActions } from 'vuex';
  import CustomSelect from '@/components/other/CustomSelect.vue';

  export default {
    name: 'RequestForm',
    components: {
      CustomSelect,
    },
    computed: {
      ...mapGetters('appealForm', [
        'isLoading',
        'error',
        'premises',
        'apartments',
        'premiseId',
        'apartmentId',
        'appealData',
        'appealId',
      ]),
      houseId: {
        get() {
          return this.premiseId;
        },
        set(value) {
          this.setPremiseId(value);
        },
      },
      HouseApartmentId: {
        get() {
          return this.apartmentId;
        },
        set(value) {
          this.setApartmentId(value);
        },
      },
      computedAppealData: {
        get() {
          return this.appealData;
        },
        set(value) {
          this.setAppealData(value);
        },
      },
    },
    methods: {
      ...mapActions('appealForm', [
        'fetchPremises',
        'fetchApartments',
        'createAppeal',
        'updateAppeal',
        'setPremiseId',
        'setApartmentId',
        'setAppealData',
        'setAppeal',
      ]),
      async handleSubmit() {
        if (this.appealId) {
          try {
            await this.updateAppeal(this.computedAppealData);
            alert('Обращение успешно создано!');
          } catch (error) {
            console.error('Ошибка при создании обращения:', error);
          }
        } else {
          try {
            await this.createAppeal(this.computedAppealData);
            alert('Обращение успешно создано!');
          } catch (error) {
            console.error('Ошибка при создании обращения:', error);
          }
        }
      },
      selectPremise() {
        this.fetchApartments();
      },

      test() {
        this.setAppeal({
          appealId: '392cfcf4-8820-4ab1-99a4-612941ecea5c',
          premise_id: 'be2bd482-1c62-4780-9a3c-72608f5bc09b', // ID обращения
          apartment_id: '404432', // ID обращения
          appealData: {
            dateTime: '2024-11-25T21:11', // Дата и время
            lastName: 'тест3 ', // Фамилия
            firstName: 'тест3 ', // Имя
            middleName: 'тест3 ', // Отчество
            phone: '+ 996 000-00-00', // Телефон
            description: 'отредактировал через фронт', // Описание обращения
          },
        });
      },
    },

    mounted() {
      this.fetchPremises();
    },
  };
</script>

<template>
  <div class="appeal-form">
    <div class="test" @click="test">test</div>

    <div v-if="isLoading" class="loading">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <form @submit.prevent="handleSubmit">
      <div class="select">
        <CustomSelect
          :options="premises"
          v-model="houseId"
          placeholder="Дом"
          @input="selectPremise"
        />
      </div>

      <div class="select">
        <CustomSelect
          :options="apartments"
          v-model="HouseApartmentId"
          placeholder="Квартира"
        />
      </div>

      <div class="form-group">
        <label for="datetime">Дата и время</label>
        <input
          type="datetime-local"
          id="datetime"
          v-model="computedAppealData.dateTime"
          placeholder="Выберите дату и время"
        />
      </div>

      <div class="form-group">
        <label for="LastName">Фамилия</label>
        <textarea
          id="LastName"
          v-model="computedAppealData.lastName"
          placeholder="Фамилия"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="FirstName">Имя</label>
        <textarea
          id="FirstName"
          v-model="computedAppealData.firstName"
          placeholder="Имя"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="MiddleName">Отчество</label>
        <textarea
          id="MiddleName"
          v-model="computedAppealData.middleName"
          placeholder="Отчество"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="phone">Телефон</label>
        <input
          type="tel"
          id="phone"
          v-model="computedAppealData.phone"
          placeholder="Телефон"
          pattern="^\+?[0-9\s\-]{7,15}$"
          title="Введите корректный номер телефона в формате +79991234567"
          required
        />
      </div>

      <div class="form-group">
        <label for="description">Описание</label>
        <textarea
          id="description"
          v-model="computedAppealData.description"
          placeholder="Введите описание"
        ></textarea>
      </div>

      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<style>
  .loading {
    color: blue;
  }
  .error {
    color: red;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .dropdown {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
  }
  .dropdown li {
    padding: 5px;
    cursor: pointer;
  }
  .dropdown li:hover {
    background-color: #f0f0f0;
  }

  input[type='datetime-local'] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: transparent;
    color: #333;
    outline: none;
  }

  input[type='datetime-local']::placeholder {
    color: #aaa;
  }
</style>
