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
  <div class="back">
    <div class="form-wrapper">
      <div class="form-header">
        <h3>Создание заявки</h3>
        <span>Новая</span>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="wrapper-select">
            <CustomSelect
              :options="premises"
              v-model="houseId"
              placeholder="Дом"
              @input="selectPremise"
            />
          </div>
          <div class="wrapper-select">
            <CustomSelect
              :options="apartments"
              v-model="HouseApartmentId"
              placeholder="Квартира"
            />
          </div>
          <input
            type="datetime-local"
            v-model="computedAppealData.dateTime"
            placeholder="Срок"
            class="input-field"
          />
        </div>
        <div class="form-row">
          <input
            type="text"
            v-model="computedAppealData.lastName"
            placeholder="Фамилия"
            class="input-field"
          />
          <input
            type="text"
            v-model="computedAppealData.firstName"
            placeholder="Имя"
            class="input-field"
          />
          <input
            type="text"
            v-model="computedAppealData.middleName"
            placeholder="Отчество"
            class="input-field"
          />
          <input
            type="tel"
            v-model="computedAppealData.phone"
            placeholder="Телефон"
            class="input-field"
          />
        </div>
        <textarea
          v-model="computedAppealData.description"
          placeholder="Описание заявки"
          class="textarea-field"
        ></textarea>

        <div class="wrapper-button">
          <button type="submit" class="submit-button">Создать</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@/assets/scss/variables.scss';

  .back {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-wrapper {
    background-color: $background-color;
    padding: 24px 32px;
    border-radius: 8px;
    box-shadow: $box-shadow-light;
    margin: 0 auto;

    box-sizing: border-box;
    width: 738px;
    height: 480px;
    top: 176px;
    left: 271px;
    padding: 24px 32px 24px 32px;
    gap: 24px;
    border-radius: 8px;
    opacity: 0px;

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      height: 40px;

      h3 {
        margin: 0;
        font-size: 18px;
        color: $text-color;
      }

      span {
        font-size: 14px;
        color: $icon-color;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .form-row {
      display: flex;
      gap: 15px;

      .wrapper-select {
        width: 215px;
        height: 56px;
        border-bottom: 1px solid $border-color;
        color: $text-color;
      }

      .input-field {
        all: unset;
        flex: 1;
        padding: 17px 0;
        border: none;
        border-bottom: 1px solid $border-color;
        font-size: 14px;
        color: $text-color;
        box-sizing: border-box;
        width: 157px;
        height: 56px;
        text-align: start;
      }
    }

    .textarea-field {
      all: unset;
      text-align: start;

      width: 100%;
      height: 132px;

      border: none;
      border-bottom: 1px solid $border-color;
      font-size: 14px;
      color: $text-color;

      font-size: 14px;
      color: $text-color;
      resize: none;
      box-sizing: border-box;
    }

    .wrapper-button {
      display: flex;
      justify-content: end;

      width: 100%;
      margin-top: -8px;

      .submit-button {
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: $primary-color;
        border: none;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        margin-right: 0;

        width: 87px;
        height: 36px;
        padding: 12px 16px 12px 16px;
        border-radius: 2px;

        &:hover {
          background-color: $primary-hover;
        }

        &:focus {
          outline: none;
        }
      }
    }
  }
</style>
