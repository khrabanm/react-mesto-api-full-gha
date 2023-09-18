class Api {
    
    constructor(options) {
        // receive url server and headers
        this._headers = options.headers;
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
      getProfile() {
        return fetch(`${this._url}/users/me`, {
          method: 'GET',
          headers: this._headers,
        }).then(this._handleResponse);
      }
    
      // change profile info on server
      patchProfile(data) {
        return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(
            { name: data.profileName, about: data.profileJob }
          ),
        }).then(this._handleResponse);
      }
    
      getInitialCards() {
        return fetch(`${this._url}/cards`, {
          method: 'GET',
          headers: this._headers,
        }).then(this._handleResponse);
      }
    
      setUserAvatar({avatar}) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar,
          }),
        }).then(this._handleResponse);
      }
    
      addCard({name, link}) {
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name,
            link,
          }),
        }).then(this._handleResponse);
      }
    
      deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers,
        }).then(this._handleResponse);
      }
    
      addLike(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: `${isLiked ? "DELETE" : "PUT"}`,
          headers: this._headers,
        }).then(this._handleResponse);
      }
    
      deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this._headers,
        }).then(this._handleResponse);
      }

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
      authorization: '102a038a-4e75-47d3-b5e0-c0f094086372',
      'Content-Type': 'application/json'
    }
  });

  export default api;