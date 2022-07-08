import "./index.css";

import {
  api,
  cardsGallerySelector,
  cardTemplateSelector,
  popupFormSettings,
  formValidators,
  addPlaceBtn,
  editProfileBtn,
  editFormElement,
  avatarEditBtn,
} from "../utils/constants.js";

import { initiateFormValidators } from "../utils/utils.js";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

let currentUserId;

api
  .processInitialRequests([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    userInfoPanel.setUserInfo({
      name: userInfo.name,
      about: userInfo.about,
    });
    userInfoPanel.setAvatar(userInfo.avatar);
    currentUserId = userInfo._id;
    cards.reverse().forEach((card) => {
      renderCard(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const renderCard = (item) => {
  const card = new Card(
    {
      cardData: item,
      userId: currentUserId,
      handleCardClick: (item) => {
        const cardPopup = new PopupWithImage(item, "#photo-viewer-popup");
        cardPopup.open();
        cardPopup.setEventListeners();
      },
      handleLikeCard: () => {
        api
          .likeCard(card.getId(), card.isLiked())
          .then((data) => {
            card.setCardLikes(data.likes);
          })
          .catch((err) => console.log(err));
      },
      handleDeleteCard: () => {
        deleteCardPopup.open();
        deleteCardPopup.changeSubmitHandler(() => {
          deleteCardPopup.changeButtonText("Deleting...");
          api
            .deleteCardData(card.getId())
            .then(() => {
              card.deleteCard();
            })
            .catch((err) => console.log(err))
            .finally(() => {
              deleteCardPopup.close();
              deleteCardPopup.changeButtonText("Yes");
            });
        });
      },
    },
    cardTemplateSelector
  );
  cardsGallery.addItem(card.generateCard());
};

const cardsGallery = new Section(
  {
    items: null,
    renderer: renderCard,
  },
  cardsGallerySelector
);

const userInfoPanel = new UserInfo({
  selectors: {
    name: ".profile__name-title",
    description: ".profile__description",
    avatar: ".avatar",
  },
});

const addFormPopoup = new PopupWithForm("#add-popup", (inputsObj) => {
  addFormPopoup.changeButtonText("Saving...");
  api
    .addCardData(inputsObj)
    .then((data) => {
      renderCard(data);
      addFormPopoup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addFormPopoup.changeButtonText("Create");
    });
});

const editFormPopup = new PopupWithForm("#edit-popup", (inputsObj) => {
  editFormPopup.changeButtonText("Saving...");
  api
    .updateUserInfo(inputsObj)
    .then((data) => {
      userInfoPanel.setUserInfo(data);
      editFormPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editFormPopup.changeButtonText("Save");
    });
});

const editAvatarPopup = new PopupWithForm("#edit-avatar-popup", (inputsObj) => {
  editAvatarPopup.changeButtonText("Saving...");
  api
    .updateUserAvatar(inputsObj)
    .then((data) => {
      userInfoPanel.setAvatar(data.avatar);
      editAvatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editAvatarPopup.changeButtonText("Save");
    });
});

const deleteCardPopup = new PopupWithForm("#delete-card-popup");

editProfileBtn.addEventListener("click", function () {
  const { name, about } = userInfoPanel.getUserInfo();
  editFormPopup.open();
  editFormElement["name"].value = name;
  editFormElement["description"].value = about;
  formValidators["edit-form"].resetValidation();
});

addPlaceBtn.addEventListener("click", function () {
  addFormPopoup.open();
  formValidators["add-form"].resetValidation();
});

avatarEditBtn.addEventListener("click", function () {
  editAvatarPopup.open();
  formValidators["edit-avatar-form"].resetValidation();
});

initiateFormValidators(popupFormSettings);
addFormPopoup.setEventListeners();
editFormPopup.setEventListeners();
editAvatarPopup.setEventListeners();
deleteCardPopup.setEventListeners();
