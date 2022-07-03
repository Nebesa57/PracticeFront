import BaseApi from './base.api';
import ApiUrls from './urls.api';

export default {
    Users: {
        GetUsers: function () {
            return BaseApi.get(ApiUrls.User.Users.GetUsers);
        },
        PostUser: function (userId, user) {
            return BaseApi.get(`${ApiUrls.User.Users.PostUser}?id=${userId}`, user);
        },
        PutUser: function (userId, user) {
            return BaseApi.get(`${ApiUrls.User.Users.PutUser}?id=${userId}`, user);
        },
        DeleteUser: function (userId, user) {
            return BaseApi.get(`${ApiUrls.User.Users.PutUser}?id=${userId}`, user);
        },
        GetUser: function (userId) {
            return BaseApi.get(`${ApiUrls.User.Users.GetUsers}?id=${userId}`);
        },
    },

    Cards: {
        GetCards: function () {
            return BaseApi.get(ApiUrls.User.Cards.GetCards);
        },
        PostCard: function (cardId, card) {
            return BaseApi.get(`${ApiUrls.User.Cards.PostCard}?id=${cardId}`, card);
        },
        PutCard: function (cardId, card) {
            return BaseApi.get(`${ApiUrls.User.Cards.PutCard}?id=${cardId}`, card);
        },
        DeleteCard: function (cardId, card) {
            return BaseApi.get(`${ApiUrls.User.Cards.DeleteCard}?id=${cardId}`, card);
        },
        GetCard: function (cardId) {
            return BaseApi.get(`${ApiUrls.User.Cards.GetCard}?id=${cardId}`);
        },
    },

    Tasks: {
        GetTasks: function () {
            return BaseApi.get(ApiUrls.User.Tasks.GetTasks);
        },
        PostTask: function (taskId, task) {
            return BaseApi.get(`${ApiUrls.User.Tasks.PostTask}?id=${taskId}`, task);
        },
        PutTask: function (taskId, task) {
            return BaseApi.get(`${ApiUrls.User.Tasks.PutTask}?id=${taskId}`, task);
        },
        DeleteTask: function (taskId, task) {
            return BaseApi.get(`${ApiUrls.User.Tasks.DeleteTask}?id=${taskId}`, task);
        },
        GetTask: function (taskId) {
            return BaseApi.get(`${ApiUrls.User.Tasks.GetTask}?id=${taskId}`);
        },
    },

    Materials: {
        GetMaterials: function () {
            return BaseApi.get(ApiUrls.User.Materials.GetMaterials);
        },
        PostMaterial: function (materialId, material) {
            return BaseApi.get(`${ApiUrls.User.Materials.PostMaterial}?id=${materialId}`, material);
        },
        PutMaterial: function (materialId, material) {
            return BaseApi.get(`${ApiUrls.User.Materials.PutMaterial}?id=${materialId}`, material);
        },
        DeleteMaterial: function (materialId, material) {
            return BaseApi.get(`${ApiUrls.User.Materials.DeleteMaterial}?id=${materialId}`, material);
        },
        GetMaterial: function (materialId) {
            return BaseApi.get(`${ApiUrls.User.Materials.GetMaterial}?id=${materialId}`);
        },
    },
};
