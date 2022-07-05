import BaseApi from './base.api';
import ApiUrls from './urls.api';

export default {
    Users: {
        GetUsers: function () {
            return BaseApi.get(ApiUrls.User.Users.GetUsers);
        },
        PostUser: function (user) {
            return BaseApi.post(ApiUrls.User.Users.PostUser, user);
        },
        PutUser: function (user) {
            return BaseApi.put(ApiUrls.User.Users.PutUser, user);
        },
        DeleteUser: function (userId) {
            return BaseApi.delete(`${ApiUrls.User.Users.PutUser}/${userId}`);
        },
        GetUser: function (userId) {
            return BaseApi.get(`${ApiUrls.User.Users.GetUsers}/${userId}`);
        },
    },

    Cards: {
        GetCards: function () {
            return BaseApi.get(ApiUrls.User.Cards.GetCards);
        },
        PostCard: function (card) {
            return BaseApi.post(ApiUrls.User.Cards.PostCard, card);
        },
        PutCard: function (card) {
            return BaseApi.put(ApiUrls.User.Cards.PutCard, card);
        },
        DeleteCard: function (cardId) {
            return BaseApi.delete(`${ApiUrls.User.Cards.DeleteCard}/${cardId}`);
        },
        GetCard: function (cardId) {
            return BaseApi.get(`${ApiUrls.User.Cards.GetCard}/${cardId}`);
        },
    },

    Tasks: {
        GetTasks: function () {
            return BaseApi.get(ApiUrls.User.Tasks.GetTasks);
        },
        PostTask: function (task) {
            return BaseApi.post(ApiUrls.User.Tasks.PostTask, task);
        },
        PutTask: function (task) {
            return BaseApi.put(ApiUrls.User.Tasks.PutTask, task);
        },
        DeleteTask: function (taskId) {
            return BaseApi.delete(`${ApiUrls.User.Tasks.DeleteTask}/${taskId}`);
        },
        GetTask: function (taskId) {
            return BaseApi.get(`${ApiUrls.User.Tasks.GetTask}/${taskId}`);
        },
    },

    Materials: {
        GetMaterials: function () {
            return BaseApi.get(ApiUrls.User.Materials.GetMaterials);
        },
        PostMaterial: function (material) {
            return BaseApi.post(ApiUrls.User.Materials.PostMaterial, material);
        },
        PutMaterial: function (material) {
            return BaseApi.put(ApiUrls.User.Materials.PutMaterial, material);
        },
        DeleteMaterial: function (materialId) {
            return BaseApi.delete(`${ApiUrls.User.Materials.DeleteMaterial}/${materialId}`);
        },
        GetMaterial: function (materialId) {
            return BaseApi.get(`${ApiUrls.User.Materials.GetMaterial}/${materialId}`);
        },
    },
};
