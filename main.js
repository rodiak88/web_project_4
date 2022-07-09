!function(){"use strict";const e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit-btn",inactiveButtonClass:"popup__submit-btn_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},t={},s=document.querySelector(".profile__edit-btn"),n=document.querySelector(".profile__add-btn"),i=document.querySelector(".avatar__editBtn"),r=new class{constructor(e){this._baseURL=e.baseURL,this._headers=e.headers}_checkServerResponse(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status," - ").concat(e.statusText))}getInitialCards(){return fetch("".concat(this._baseURL,"/cards"),{method:"GET",headers:this._headers}).then((e=>this._checkServerResponse(e)))}getUserInfo(){return fetch("".concat(this._baseURL,"/users/me"),{method:"GET",headers:this._headers}).then((e=>this._checkServerResponse(e)))}updateUserInfo(e){return fetch("".concat(this._baseURL,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})}).then((e=>this._checkServerResponse(e)))}updateUserAvatar(e){return fetch("".concat(this._baseURL,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.link})}).then((e=>this._checkServerResponse(e)))}addCardData(e){return fetch("".concat(this._baseURL,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e.title,link:e.link})}).then((e=>this._checkServerResponse(e)))}likeCard(e,t){const s=t?"DELETE":"PUT";return fetch("".concat(this._baseURL,"/cards/likes/").concat(e),{method:s,headers:this._headers}).then((e=>this._checkServerResponse(e)))}deleteCardData(e){return fetch("".concat(this._baseURL,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((e=>this._checkServerResponse(e)))}processInitialRequests(e){return Promise.all(e).then((e=>e))}}({baseURL:"https://around.nomoreparties.co/v1/cohort-3-en",headers:{authorization:"e9954642-7ca9-42fe-b8e5-fe91e4314998","Content-Type":"application/json"}});class a{constructor(e,t){this._settings=e,this._formElement=t}_showInputError(e,t){const s=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._settings.inputErrorClass),s.textContent=t,s.classList.add(this._settings.errorClass)}_hideInputError(e){const t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._settings.inputErrorClass),t.textContent="",t.classList.remove(this._settings.errorClass)}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_hasInvalidInput(e){return e.some((e=>!e.validity.valid))}_toggleButtonState(){this._hasInvalidInput(this._inputList)?(this._buttonElement.disabled=!0,this._buttonElement.classList.add(this._settings.inactiveButtonClass)):(this._buttonElement.disabled=!1,this._buttonElement.classList.remove(this._settings.inactiveButtonClass))}_setInputEventListeners(){this._inputList=Array.from(this._formElement.querySelectorAll(this._settings.inputSelector)),this._buttonElement=this._formElement.querySelector(this._settings.submitButtonSelector),this._toggleButtonState(),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}enableValidation(){this._formElement.addEventListener("submit",(e=>{e.preventDefault()})),this._setInputEventListeners()}resetValidation(){this._toggleButtonState(),this._inputList.forEach((e=>{this._hideInputError(e)}))}}class o{constructor(e,t){let{cardData:s,userId:n,handleCardClick:i,handleLikeCard:r,handleDeleteCard:a}=e;this._title=s.name,this._link=s.link,this._cardId=s._id,this._likes=s.likes,this._owner=s.owner,this._userId=n,this._cardSelector=t,this._handleCardClick=i,this._handleLikeCard=r,this._handleDeleteCard=a}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}generateCard(){return this._element=this._getTemplate(),this._cardPhoto=this._element.querySelector(".card__photo-container"),this._cardTitle=this._element.querySelector(".card__title"),this._deleteBtn=this._element.querySelector(".card__delete-btn"),this._likeBtn=this._element.querySelector(".card__like-btn"),this._cardLikesElement=this._element.querySelector(".card__like-count"),this._cardPhoto.style.backgroundImage="url(".concat(this._link,")"),this._cardPhoto.ariaLabel=this._title,this._cardTitle.textContent=this._title,this.isOwner()||this._deleteBtn.remove(),this.setCardLikes(this._likes),this._setEventListeners(),this._element}deleteCard(){this._element.remove(),this._element=null,this._cardTitle=null,this._cardPhoto=null,this._likeBtn=null,this._cardLikesElement=null}setCardLikes(e){this._likes=e,this._isLiked=this.isLiked(),this._isLiked?this._likeBtn.classList.add("card__like-btn_active"):this._likeBtn.classList.remove("card__like-btn_active"),this._cardLikesElement.textContent=this._likes.length}isLiked(){return!!this._likes.find((e=>e._id===this._userId))}isOwner(){return this._userId===this._owner._id}getId(){return this._cardId}_setEventListeners(){this._deleteBtn.addEventListener("click",(e=>{e.stopPropagation(),this._handleDeleteCard()})),this._likeBtn.addEventListener("click",this._handleLikeCard),this._cardPhoto.addEventListener("click",(()=>{this._handleCardClick({title:this._title,link:this._link})}))}}class l{constructor(e){var t,s;s=e=>{"Escape"===e.key&&this.close()},(t="_handleEscClose")in this?Object.defineProperty(this,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):this[t]=s,this._popup=document.querySelector(e)}open(){this._popup.classList.add("popup__active"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup__active"),document.removeEventListener("keydown",this._handleEscClose)}setEventListeners(){this._popup.addEventListener("mousedown",(e=>{e.target.classList.contains("popup__active")&&this.close(),e.target.classList.contains("popup__close-btn")&&this.close()}))}}class c extends l{constructor(t,s){var n,i;super(t),i=()=>{this._handleFormSubmit(this._getInputValues())},(n="_formSubmit")in this?Object.defineProperty(this,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):this[n]=i,this._handleFormSubmit=s,this._formElement=this._popup.querySelector(e.formSelector),this._inputList=Array.from(this._formElement.querySelectorAll(e.inputSelector)),this._submitBtnElement=this._formElement.querySelector(e.submitButtonSelector),this._submitBtnText=this._submitBtnElement.textContent}_getInputValues(){const e={};return this._inputList.forEach((t=>{e[t.name]=t.value})),e}setInputValues(e){this._inputList.forEach((t=>{t.value=e[t.name]}))}setEventListeners(){super.setEventListeners(),this._formElement.addEventListener("submit",this._formSubmit)}renderLoadingMsg(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Saving...";this._submitBtnElement.textContent=e?t:this._submitBtnText}changeSubmitHandler(e){this._handleFormSubmit=e}close(){super.close(),this._formElement.reset()}}let h;r.processInitialRequests([r.getUserInfo(),r.getInitialCards()]).then((e=>{let[t,s]=e;u.setUserInfo({name:t.name,about:t.about}),u.setAvatar(t.avatar),h=t._id,s.reverse().forEach((e=>{d(e)}))})).catch((e=>{console.log(e)}));const d=e=>{const t=new o({cardData:e,userId:h,handleCardClick:e=>{E.open(e)},handleLikeCard:()=>{r.likeCard(t.getId(),t.isLiked()).then((e=>{t.setCardLikes(e.likes)})).catch((e=>console.log(e)))},handleDeleteCard:()=>{g.open(),g.changeSubmitHandler((()=>{g.renderLoadingMsg(!0,"Deleting..."),r.deleteCardData(t.getId()).then((()=>{t.deleteCard(),g.close()})).catch((e=>console.log(e))).finally((()=>{g.renderLoadingMsg(!1)}))}))}},"#card-template");_.addItem(t.generateCard())},_=new class{constructor(e,t){let{items:s,renderer:n}=e;this._initialArray=s,this._renderer=n,this._container=document.querySelector(t)}addItem(e){this._container.prepend(e)}clear(){this._container.innerHTML=""}renderItems(){this.clear(),this._initialArray.forEach((e=>{this._renderer(e)}))}}({items:null,renderer:d},".gallery__list"),u=new class{constructor(e){let{selectors:t}=e;this._nameElement=document.querySelector(t.name),this._descriptionElement=document.querySelector(t.description),this._avatarElement=document.querySelector(t.avatar)}getUserInfo(){const e={};return e.name=this._nameElement.textContent,e.about=this._descriptionElement.textContent,e.avatar=this._avatarElement.style.backgroundImage,e}setUserInfo(e){this._nameElement.textContent=e.name,this._descriptionElement.textContent=e.about}setAvatar(e){this._avatarElement.style.backgroundImage="url(".concat(e,")")}}({selectors:{name:".profile__name-title",description:".profile__description",avatar:".avatar"}}),p=new c("#add-popup",(e=>{p.renderLoadingMsg(!0),r.addCardData(e).then((e=>{d(e),p.close()})).catch((e=>{console.log(e)})).finally((()=>{p.renderLoadingMsg(!1)}))})),m=new c("#edit-popup",(e=>{m.renderLoadingMsg(!0),r.updateUserInfo(e).then((e=>{u.setUserInfo(e),m.close()})).catch((e=>{console.log(e)})).finally((()=>{m.renderLoadingMsg(!1)}))})),v=new c("#edit-avatar-popup",(e=>{v.renderLoadingMsg(!0),r.updateUserAvatar(e).then((e=>{u.setAvatar(e.avatar),v.close()})).catch((e=>console.log(e))).finally((()=>{v.renderLoadingMsg(!1)}))})),E=new class extends l{constructor(e){super(e),this._popupImageElement=this._popup.querySelector(".popup__photo"),this._popupCaptionElement=this._popup.querySelector(".popup__photoTitle")}open(e){this._popupImageElement.src=e.link,this._popupImageElement.alt=e.title,this._popupCaptionElement.textContent=e.title,super.open()}}("#photo-viewer-popup"),g=new c("#delete-card-popup");var L;s.addEventListener("click",(function(){m.open(),m.setInputValues(u.getUserInfo())})),n.addEventListener("click",(function(){p.open(),t["add-form"].resetValidation()})),i.addEventListener("click",(function(){v.open(),t["edit-avatar-form"].resetValidation()})),L=e,Array.from(document.querySelectorAll(L.formSelector)).forEach((e=>{const s=new a(L,e);t[e.getAttribute("name")]=s,s.enableValidation()})),p.setEventListeners(),m.setEventListeners(),v.setEventListeners(),E.setEventListeners(),g.setEventListeners()}();