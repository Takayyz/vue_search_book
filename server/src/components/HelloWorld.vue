<template>
  <div>
    <div class="wrap">
      <div class="container">
        <div class="header">
          <p class="header__title">Search Books! by Vue.js</p>
        </div>
        <div class="search">
          <div class="search__text">
            <input
              @input="form.searchWord = $event.target.value"
              type="text"
              id="js-search-word"
              class="search__text__input"
              placeholder="タイトル、著者..."
            >
          </div>
          <button
            @click="doSearch"
            id="js-search-button"
            class="search__btn"
          >
            検索する
          </button>
        </div>
        <ul class="lists">
          <li class='lists__item'>
          <div class='lists__item__inner'>
            <a href='' class='lists__item__link' target='_blank'>
              <img src='' class='lists__item__img' alt=''>
              <p class='lists__item__detail'>作品名：</p>
              <p class='lists__item__detail'>作者　：</p>
              <p class='lists__item__detail'>出版社：</p>
            </a>
          </div>
         </li>
        </ul>
      </div>
    </div>
    <!-- <div class="hello">
      <h1>{{ msg }}</h1>
      <h2>Essential Links</h2>
      <ul>
        <li>
          <a
            href="https://vuejs.org"
            target="_blank"
          >
            Core Docs
          </a>
        </li>
        <li>
          <a
            href="https://forum.vuejs.org"
            target="_blank"
          >
            Forum
          </a>
        </li>
        <li>
          <a
            href="https://chat.vuejs.org"
            target="_blank"
          >
            Community Chat
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/vuejs"
            target="_blank"
          >
            Twitter
          </a>
        </li>
        <br>
        <li>
          <a
            href="http://vuejs-templates.github.io/webpack/"
            target="_blank"
          >
            Docs for This Template
          </a>
        </li>
      </ul>
      <h2>Ecosystem</h2>
      <ul>
        <li>
          <a
            href="http://router.vuejs.org/"
            target="_blank"
          >
            vue-router
          </a>
        </li>
        <li>
          <a
            href="http://vuex.vuejs.org/"
            target="_blank"
          >
            vuex
          </a>
        </li>
        <li>
          <a
            href="http://vue-loader.vuejs.org/"
            target="_blank"
          >
            vue-loader
          </a>
        </li>
        <li>
          <a
            href="https://github.com/vuejs/awesome-vue"
            target="_blank"
          >
            awesome-vue
          </a>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
      url: 'https://app.rakuten.co.jp/services/api/BooksTotal/Search/20130522',
      form: {
        searchWord: '',
        prevSearchWord: ''
      },
      page: 1,
      hits: 20,
      items: '',
      errorMessage: ''
    }
  },
  methods: {
    definePage() {
      if (this.form.searchWord !== '' && this.form.searchWord === this.form.prevSearchWord) {
        this.page++;
      } else {
        this.page = 1;
        this.form.prevSearchWord = this.form.searchWord;
      }
    },
    doSearch() {
      this.definePage();

      axios.get(this.url, {
        params: {
          datatype: 'json',
          applicationId: '1019399324990976605',
          booksGenreId: '001',
          hits: this.hits,
          page: this.page,
          keyword: this.form.searchWord,
        }
      }).then(({ data }) => {
        // 都度this.itemsに追加するのはよくなさそう...
        (data.count > 0) ? this.items = data.Items : this.errorMessage = '検索結果がありません。';
      }).catch((err) => {
        console.log('err');
        console.log(err);
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  width: 100%;
  background-color: #43cee0;
}
.header__title {
  line-height: 60px;
  text-align: center;
  font-size: 20px;
  color: #fff;
}
.search {
  overflow: hidden;
  margin-bottom: 50px;
  background: #fff;
  box-shadow: 0 1px 5px #ccc;
}
.search__text {
  width: 100%;
}
.search__text__input {
  -webkit-box-sizing: border-box;
      box-sizing: border-box;
  width: 100%;
  margin-bottom: 20px;
  padding: 0 10px;
  line-height: 3em;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #eee;
  font-size: 20px;
  outline: none;
}
.search__btn {
  display: block;
  margin: 0 auto 20px;
  padding: 0 20px;
  line-height: 40px;
  border: none;
  font-size: 18px;
  color: #fff;
  background-color: #43cee0;
  cursor: pointer;
  outline: none;
}
.search__btn:hover {
  background-color: #1eabbd;
}
.lists {
  overflow: hidden;
  margin-left: 20px;
}
.lists__item {
  -webkit-box-sizing: border-box;
      box-sizing: border-box;
  display: inline-block;
  width: 25%;
  padding: 0 20px 20px 0;
  vertical-align: top;
  text-align: center;
}
.lists__item__inner {
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
}
.lists__item__link {
  display: block;
  text-decoration: none;
}
.lists__item__img {
  margin-bottom: 20px;
  width: 100%;
  max-width: 150px;
  -webkit-box-shadow: 0 1px 5px #ccc;
      box-shadow: 0 1px 5px #ccc;
}
.lists__item__detail {
  margin-bottom: 10px;
  padding-left: 5em;
  text-indent: -5em;
  line-height: 1.5em;
  text-align: left;
  font-size: 12px;
}
.message {
  margin-bottom: 50px;
  text-align: center;
}

@media screen and (max-width: 767px) {
  .lists__item {
    width: 33.33%;
  }
}

@media screen and (max-width: 479px) {
  .lists__item {
    width: 50%;
  }
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
