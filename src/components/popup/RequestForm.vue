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
      ...mapGetters('appealsModule', ['getAppealById', 'getAppealStatusById']),
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
        'resetState',
      ]),
      ...mapActions('appealsModule', ['fetchAppeals']),
      async handleSubmit() {
        if (this.appealId) {
          try {
            await this.updateAppeal(this.computedAppealData);
          } catch (error) {}
        } else {
          try {
            await this.createAppeal(this.computedAppealData);
          } catch (error) {
            console.error('Ошибка при создании обращения:', error);
          }
        }
        this.fetchAppeals();
        this.setPopUp(false);
      },
      selectPremise() {
        this.fetchApartments();
      },
      closePopUp() {
        this.resetState();
        this.setPopUp(false);
      },
    },

    mounted() {
      this.fetchPremises();
    },
  };
</script>

<template>
  <div class="back" @click.self="closePopUp">
    <div class="error-message" v-if="error">{{ error }}</div>
    <div class="form-wrapper">
      <div class="form-header">
        <h3>{{ appealId ? getAppealById(appealId) : 'Создание заявки' }}</h3>
        <span>{{ appealId ? getAppealStatusById(appealId) : 'Новая' }}</span>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="wrapper-select">
            <transition name="fade">
              <label :class="{ hidden: !houseId }" for="house-select">
                Дом
              </label>
            </transition>
            <CustomSelect
              id="house-select"
              :options="premises"
              v-model="houseId"
              placeholder="Дом"
              @input="selectPremise"
            />
          </div>
          <div class="wrapper-select">
            <transition name="fade">
              <label
                :class="{
                  hidden: !HouseApartmentId,
                }"
                for="apartment-select"
              >
                Квартира
              </label>
            </transition>
            <CustomSelect
              id="apartment-select"
              :options="apartments"
              v-model="HouseApartmentId"
              placeholder="Квартира"
            />
          </div>
          <div class="datetime-input">
            <transition name="fade">
              <label
                :class="{
                  hidden: !computedAppealData.dateTime,
                }"
                for="datetime-input"
              >
                Срок
              </label>
            </transition>
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
            <transition name="fade">
              <label
                :class="{
                  hidden: !computedAppealData.lastName,
                }"
                for="lastname-input"
              >
                Фамилия
              </label>
            </transition>
            <input
              id="lastname-input"
              type="text"
              v-model="computedAppealData.lastName"
              placeholder="Фамилия"
              class="input-field"
            />
          </div>
          <div class="field">
            <transition name="fade">
              <label
                :class="{
                  hidden: !computedAppealData.firstName,
                }"
                for="firstname-input"
              >
                Имя
              </label>
            </transition>
            <input
              id="firstname-input"
              type="text"
              v-model="computedAppealData.firstName"
              placeholder="Имя"
              class="input-field"
            />
          </div>
          <div class="field">
            <transition name="fade">
              <label
                :class="{
                  hidden: !computedAppealData.middleName,
                }"
                for="middlename-input"
              >
                Отчество
              </label>
            </transition>
            <input
              id="middlename-input"
              type="text"
              v-model="computedAppealData.middleName"
              placeholder="Отчество"
              class="input-field"
            />
          </div>
          <div class="field">
            <transition name="fade">
              <label
                :class="{
                  hidden: !computedAppealData.phone,
                }"
                for="phone-input"
              >
                Телефон
              </label>
            </transition>
            <input
              id="phone-input"
              type="tel"
              v-model="computedAppealData.phone"
              placeholder="Телефон"
              class="input-field"
            />
          </div>
        </div>
        <div class="wrapper-textarea">
          <transition name="fade">
            <label
              :class="{
                hidden: !computedAppealData.description,
              }"
              for="description-input"
            >
              Описание заявки
            </label>
          </transition>
          <textarea
            id="description-textarea"
            v-model="computedAppealData.description"
            placeholder="Описание заявки"
            class="textarea-field"
          ></textarea>
        </div>

        <div class="wrapper-button">
          <button type="submit" class="submit-button">
            {{ appealId ? 'Сохранить' : 'Создать' }}
          </button>
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
        color: #999;
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

    .wrapper-textarea {
      display: flex;
      flex-direction: column;
      justify-content: end;

      height: 132px;
    }

    .textarea-field {
      all: unset;
      text-align: start;

      width: 100%;
      flex-grow: 1;

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

  .label {
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
