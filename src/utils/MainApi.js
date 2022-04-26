class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this.errors = {
      err400: "400 — Токен не передан или передан не в том формате",
      err401: "401 — Переданный токен некорректен "
    }
  }
  
  _checkResponse(res){
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/movies`, {
        method: "GET",
        credentials: 'include',
        headers: this._headers,
    })
    .then((res) => { 
        return this._checkResponse(res)
    });
}
  //Удаление карточки
  deleteCard(id){
    return fetch(`${this._url}/movies/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
    })
    .then((res) => { 
        return this._checkResponse(res)
    });
  }
  //Сохранение карточки
  saveMovie(data){
    return fetch(`${this._url}/movies`, {
        method: 'POST',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          country: data.country,
          director: data.director,
          duration: data.duration,
          year: data.year,
          description: data.description,
          image: `https://api.nomoreparties.co/${data.image.url}`,
          trailerLink: data.trailerLink,
          nameRU: data.nameRU,
          nameEN: data.nameEN,
          thumbnail: `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`,
          movieId: data.id,
        })
    })
    .then((res) => { 
        return this._checkResponse(res)
    });
  }
  //Обновление профиля
  patchNewProfile(name, email){
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
            name: name,
            email: email
        })
    })
    .then((res) => { 
        return this._checkResponse(res)
    });
  }
  //Логин
  onLogin(email, password){
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then((response) => {
      if (response.ok){
        return response.json();
      }
      else if(response.status === 400){
        // eslint-disable-next-line no-throw-literal
        throw "400 — не передано одно из полей ";
      }
      else if ((response.status === 401))
      {
        // eslint-disable-next-line no-throw-literal
        throw "401 — пользователь с email не найден";
      }
    })
    .then((res) => {
      return res;
    })
  }

  getInitialProfile(){
    return fetch(`${this._url}/users/me`, {
        method: "GET",
        credentials: 'include',
        headers: this._headers,
    })
    .then((res) => { 
        return this._checkResponse(res)
    });
}

  checkToken(){
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.ok){
        return response.json();
      }
      else if(response.status === 400){
        throw this.errors.err400;
      }
      else if ((response.status === 401))
      {
        throw this.errors.err401;
      }
    })
    .then((res) => {
      return res;
    })
  }
// Регистрация
  registerNewProfile(name, email, password){
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email
      })
    })
    .then((response) => {
      if (response.ok){
        return response.json();
      }
      else if(response.status === 400){
        // eslint-disable-next-line no-throw-literal
        throw "400 — некорректно заполнено одно из полей";
      }
    })
    .then((res) => {
      return res;
    })
  }
//
  // другие методы работы с API
}
export const mainApi = new MainApi({
  baseUrl: 'https://api.cyberfalcon.movies.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  }
});
