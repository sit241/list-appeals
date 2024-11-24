<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Auth',
    data() {
      return {
        username: process.env.NODE_ENV === 'development' ? '79122333444' : '+7', // Подставляем в dev-режиме
        password: process.env.NODE_ENV === 'development' ? '123456' : '', // Подставляем в dev-режиме
        error: null,
        showPassword: false,
        activeInput: null,
      };
    },
    methods: {
      ...mapActions('auth', ['login']),
      async handleLogin() {
        try {
          await this.login({
            username: this.username,
            password: this.password,
          });
          const redirect = this.$route.query.redirect || '/';
          this.$router.push(redirect);
        } catch (err) {
          this.error = 'Ошибка входа. Проверьте логин и пароль.';

          setTimeout(() => {
            this.error = '';
          }, 3000);
        }
      },
      togglePassword() {
        const passwordField = document.getElementById('password');
        this.showPassword = !this.showPassword;
        passwordField.type = this.showPassword ? 'text' : 'password';
      },
      setActiveInput(input) {
        this.activeInput = input;
      },
      clearActiveInput() {
        this.activeInput = null;
      },
    },
  };
</script>

<template>
  <div class="auth-container">
    <div class="auth-box">
      <h1>Авторизация</h1>
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="input-group">
          <transition name="fade">
            <label
              :class="{ hidden: !(activeInput == 'username' || username) }"
              for="username"
            >
              Логин или Телефон
            </label>
          </transition>
          <div class="input-container">
            <i class="mdi mdi-phone"></i>
            <input
              v-model="username"
              id="username"
              type="text"
              placeholder="Логин или Телефон"
              required
              @focus="setActiveInput('username')"
              @blur="clearActiveInput"
            />
          </div>
        </div>
        <div class="input-group">
          <transition name="fade">
            <label
              :class="{ hidden: !(activeInput == 'password' || password) }"
              for="password"
            >
              Пароль
            </label>
          </transition>
          <div class="input-container">
            <i class="mdi mdi-lock"></i>
            <input
              v-model="password"
              id="password"
              type="password"
              placeholder="Пароль"
              required
              @focus="setActiveInput('password')"
              @blur="clearActiveInput"
            />
            <i
              class="mdi"
              :class="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click="togglePassword"
            ></i>
          </div>
        </div>
        <div class="wrapper-btn">
          <button type="submit" class="submit-button">Войти</button>
        </div>
      </form>
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  i.mdi {
    color: $icon-color;

    font-size: 24px;
    cursor: pointer;

    &:last-child {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    height: 100vh;
    background: url(~@/assets/background.jpeg) no-repeat center center;
    background-size: cover;

    .auth-box {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      width: 340px;
      height: 290px;
      box-sizing: border-box;

      top: 19px;
      padding: 52px 20px 20px 20px;
      border-radius: 5px;

      background-color: $background-color;

      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        color: $background-color;
        background-color: $primary-color;

        border-radius: 5px;
        margin-bottom: 54px;
        margin-top: -68px;
        width: 308px;
        height: 56px;
        box-sizing: border-box;

        font-size: 16px;
        font-weight: 500;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      .auth-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .input-group {
          margin-bottom: 15px;

          /* Анимация для плавного изменения прозрачности */
          .fade-enter-active,
          .fade-leave-active {
            transition: opacity 0.5s ease;
          }
          .fade-enter,
          .fade-leave-to {
            opacity: 0;
          }

          /* Класс для управления видимостью */
          .hidden {
            opacity: 0;
            pointer-events: none; /* Чтобы элемент был недоступен */
          }

          label {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: $primary-color;
            margin-bottom: 5px;
            margin-left: 36px;

            i {
              margin-right: 8px;
            }
          }

          input {
            width: 100%;
            padding: 10px;
            border: none;
            font-size: 14px;

            &:focus {
              border-color: $primary-color;
              outline: none;
            }
          }

          .input-container {
            position: relative;

            width: 100%;
            border-bottom: 1px solid $border-color;

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;

            input {
              width: calc(100% - 30px);
            }

            .icon-eye {
              position: absolute;
              right: 10px;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
            }
          }
        }

        .wrapper-btn {
          flex-grow: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .submit-button {
          background-color: $primary-color;
          color: $background-color;
          cursor: pointer;
          border: none;

          box-shadow: 0px 4px 4px 0px #6aae5e40;

          width: 110px;
          height: 36px;
          padding: 12px 16px 12px 16px;
          gap: 8px;
          border-radius: 4px;
          opacity: 0px;

          &:hover {
            background-color: $primary-hover;
          }
        }
      }
    }

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
  }
</style>
