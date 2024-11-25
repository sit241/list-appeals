<script>
  export default {
    name: 'RequestForm',
    data() {
      return {
        form: {
          house: '',
          apartment: '',
          deadline: '',
          lastName: '',
          firstName: '',
          middleName: '',
          phone: '',
          description: '',
        },
        houses: ['Дом 1', 'Дом 2', 'Дом 3'], // Пример списка домов
        apartments: ['Квартира 1', 'Квартира 2'], // Пример списка квартир
      };
    },
    methods: {
      submitForm() {
        console.log('Данные формы:', this.form);
        // Логика отправки формы
      },
      goMain() {
        this.$router.push('/');
      },
    },
  };
</script>

<template>
  <div class="back" @click="goMain">
    <div class="request-form-container">
      <h1>Создание заявки</h1>
      <form @submit.prevent="submitForm" class="request-form">
        <div class="form-group">
          <label for="house">Дом</label>
          <select v-model="form.house" id="house">
            <option disabled value="">Выберите дом</option>
            <option v-for="house in houses" :key="house" :value="house">
              {{ house }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="apartment">Квартира</label>
          <select v-model="form.apartment" id="apartment">
            <option disabled value="">Выберите квартиру</option>
            <option
              v-for="apartment in apartments"
              :key="apartment"
              :value="apartment"
            >
              {{ apartment }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="deadline">Срок</label>
          <input v-model="form.deadline" type="date" id="deadline" />
        </div>

        <div class="form-group">
          <label for="lastName">Фамилия</label>
          <input
            v-model="form.lastName"
            type="text"
            id="lastName"
            placeholder="Фамилия"
          />
        </div>

        <div class="form-group">
          <label for="firstName">Имя</label>
          <input
            v-model="form.firstName"
            type="text"
            id="firstName"
            placeholder="Имя"
          />
        </div>

        <div class="form-group">
          <label for="middleName">Отчество</label>
          <input
            v-model="form.middleName"
            type="text"
            id="middleName"
            placeholder="Отчество"
          />
        </div>

        <div class="form-group">
          <label for="phone">Телефон</label>
          <input
            v-model="form.phone"
            type="tel"
            id="phone"
            placeholder="Телефон"
          />
        </div>

        <div class="form-group">
          <label for="description">Описание заявки</label>
          <textarea
            v-model="form.description"
            id="description"
            placeholder="Описание"
          ></textarea>
        </div>

        <button type="submit" class="submit-button">Создать</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .back {
    position: absolute;
    width: 100vw;
    height: 100vh;

    z-index: 99;
    background: #00000033;
  }

  .request-form-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fff;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }

  .request-form {
    display: flex;
    flex-direction: column;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    font-size: 14px;
    margin-bottom: 5px;
    display: block;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  textarea {
    resize: none;
  }

  .submit-button {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 10px 15px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
  }

  .submit-button:hover {
    background-color: #218838;
  }
</style>
