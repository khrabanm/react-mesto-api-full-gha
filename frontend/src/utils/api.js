class Api {
    
    constructor(options) {
        // receive url server and headers
        this._url = options.baseUrl;
      }
    
      // check answer from server
      _handleResponse(res) {
        if (res.ok) {
          return res.json(); // if yes => return data
        }
        return Promise.reject(`Error: ${res.status}`); // or return error
      }
    
      // request to server and get data profile
      getProfile(jwt) {
        return fetch(`${this._url}/users/me`, {
          method: 'GET',
          headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${jwt}`},
        }).then(this._handleResponse);
      }
    
      // change profile info on server
      patchProfile(data, jwt) {
        return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${jwt}`},
          body: JSON.stringify(
            { name: data.profileName, about: data.profileJob }
          ),
        }).then(this._handleResponse);
      }
    
      getInitialCards(jwt) {
        return fetch(`${this._url}/cards`, {
          method: 'GET',
          headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${jwt}`},
        }).then(this._handleResponse);
      }
    
      setUserAvatar({avatar, jwt}) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${jwt}`},
          body: JSON.stringify({
            avatar,
          }),
        }).then(this._handleResponse);
      }
    
      addCard({name, link, jwt}) {
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${jwt}`},
          body: JSON.stringify({
            name,
            link,
          }),
        }).then(this._handleResponse);
      }
    
      deleteCard(cardId, jwt) {
        return fetch(`${this._url}/cards/${cardId}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${jwt}`},
        }).then(this._handleResponse);
      }
    
      addLike(cardId, isLiked, jwt) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: `${isLiked ? "DELETE" : "PUT"}`,
          headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${jwt}`},
        }).then(this._handleResponse);
      }
    
      deleteLike(cardId,jwt) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${jwt}`},
        }).then(this._handleResponse);
      }

}

const api = new Api({
    baseUrl: 'https://api.mesto.khrabanm.nomoredomainsrocks.ru',
    
  });

  export default api;