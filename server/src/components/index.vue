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
        <template v-if="this.items">
          <ul class="lists">
            <li
              v-for="(item, index) in this.items"
              :key="index"
              class='lists__item'
            >
              <div class='lists__item__inner'>
                <a v-bind:href="item.Item.itemUrl" class='lists__item__link' target='_blank'>
                  <img :src='item.Item.largeImageUrl' class='lists__item__img' alt=''>
                  <p class='lists__item__detail'>作品名：{{ item.Item.title }}</p>
                  <p class='lists__item__detail'>作者　：{{ item.Item.author }}</p>
                  <p class='lists__item__detail'>出版社：{{ item.Item.publisherName }}</p>
                </a>
              </div>
            </li>
          </ul>
          <div class="pager">
            <ul class="btn__wrapper">
              <li class="is-prev pager__btn disabled">
                <a href="#" class="btn__anchor">前へ</a>
              </li>
              <li class="is-next pager__btn">
                <a href="#" class="btn__anchor">次へ</a>
              </li>
            </ul>
          </div>
        </template>
        <p v-else-if="this.errorMessage">{{ this.errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  data () {
    return {
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
    noResult() {
      console.log('noResult');
      this.items = '';
      this.errorMessage = '検索結果がありません。';
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
        (data.count > 0) ? this.items = data.Items : this.noResult();
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
a {
  color: inherit;
  text-decoration: none;
}
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #fff inset;
}
.header {
  width: 100%;
  background-color: #43cee0;
}
.header__title {
  margin: 0;
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
  margin-bottom: 20px;
}
.search__text__input {
  -webkit-box-sizing: border-box;
      box-sizing: border-box;
  width: 100%;
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
.pager {
  border-top: 1px solid #ccc;
  padding: 35px 0;
}
.btn__wrapper {
  display: flex;
  justify-content: center;
}
.pager__btn {
  margin-left: 10px;
  width: 80px;
  height: 40px;
  line-height: 40px;
  background-color: #43cee0;
  box-sizing: border-box;
}
.pager__btn:first-child {
  margin-left: 0;
}
.pager__btn:hover:not(.disabled) {
  background-color: #1eabbd;
}
.disabled {
  background-color: #888;
}
.disabled .btn__anchor {
  cursor: default;
}
.btn__anchor {
  display: block;
  height: 100%;
  font-size: 16px;
  text-align: center;
  color: #fff;
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
</style>
