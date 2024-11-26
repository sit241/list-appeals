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
        'error',
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
        'setPopUp',
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
  <div class="back" @click.self="setPopUp(false)">
    <div class="error-message" v-if="error">
      {{ error }}
    </div>
    <div class="form-wrapper">
      <div class="form-header">
        <h3>Создание заявки</h3>
        <span>Новая</span>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="wrapper-select">
            <label for="house-select">Дом</label>
            <CustomSelect
              id="house-select"
              :options="premises"
              v-model="houseId"
              placeholder="Дом"
              @input="selectPremise"
            />
          </div>
          <div class="wrapper-select">
            <label for="apartment-select">Квартира</label>
            <CustomSelect
              id="apartment-select"
              :options="apartments"
              v-model="HouseApartmentId"
              placeholder="Квартира"
            />
          </div>
          <div class="datetime-input">
            <label for="datetime-input">Срок</label>
            <input
              id="datetime-input"
              type="datetime-local"
              v-model="computedAppealData.dateTime"
              placeholder="Срок"
              class="input-field"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="field">
            <label for="lastname-input">Фамилия</label>
            <input
              id="lastname-input"
              type="text"
              v-model="computedAppealData.lastName"
              placeholder="Фамилия"
              class="input-field"
            />
          </div>
          <div class="field">
            <label for="firstname-input">Имя</label>
            <input
              id="firstname-input"
              type="text"
              v-model="computedAppealData.firstName"
              placeholder="Имя"
              class="input-field"
            />
          </div>
          <div class="field">
            <label for="middlename-input">Отчество</label>
            <input
              id="middlename-input"
              type="text"
              v-model="computedAppealData.middleName"
              placeholder="Отчество"
              class="input-field"
            />
          </div>
          <div class="field">
            <label for="phone-input">Телефон</label>
            <input
              id="phone-input"
              type="tel"
              v-model="computedAppealData.phone"
              placeholder="Телефон"
              class="input-field"
            />
          </div>
        </div>
        <div class="field-textarea">
          <label for="description-textarea">Описание заявки</label>
          <textarea
            id="description-textarea"
            v-model="computedAppealData.description"
            placeholder="Описание заявки"
            class="textarea-field"
          ></textarea>
        </div>

        <div class="wrapper-button">
          <button type="submit" class="submit-button">Создать</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@/assets/scss/variables.scss';

  .error-message {
    position: absolute;
    bottom: 26px;

    margin-top: 15px;
    //   color: $error-color;
    color: $background-color;
    font-size: 14px;

    //   background-color: $background-color;
    background-color: $error-color;
    padding: 6px;
    border-radius: 5px;
  }

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

      .field-textarea,
      .field,
      .datetime-input,
      .wrapper-select {
        display: flex;
        flex-direction: column;
        justify-content: end;
      }

      .datetime-input {
        width: 215px;
        height: 56px;
      }

      .field {
        height: 56px;
        width: 157px;
      }

      label {
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;

        color: $primary-color;
      }
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
        padding: 8px 0;
        border: none;
        border-bottom: 1px solid $border-color;
        font-size: 14px;
        color: $text-color;
        box-sizing: border-box;
        // width: 157px;
        text-align: start;
      }
    }

    .textarea-field {
      all: unset;
      text-align: start;

      width: 100%;
      height: 132px !important;

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
