import Vue from 'vue';
import dialogService from '../dialog.service';

export default {
    get(resource, slug = '') {
        this.setHeader();
        let url;

        if (slug) url = `${resource}/${slug}`;
        else url = resource;

        return new Promise((resolve, reject) => {
            Vue.axios
                .get(url)
                .then(response => resolve(response))
                .catch(error => {
                    if (error.response === undefined) {
                        reject(error);
                        return;
                    }

                    switch (error.response.status) {
                        case 400:
                            dialogService.showAlert('Ошибка', error.response.data.error);
                            reject(400);
                            break;

                        case 401:
                            dialogService.showAlert('Ошибка', 'Не авторизован');
                            reject(401);
                            break;

                        case 403:
                            dialogService.showAlert('Ошибка', 'Недостаточно прав для доступа');
                            reject(403);
                            break;

                        case 500:
                            dialogService.showAlert('Ошибка', `Ошибка сервера: ${error.response.data.error}`);
                            reject(500);
                            break;

                        case 502:
                        case 503:
                            dialogService.showAlert('Ошибка', 'Сервер недоступен');
                            reject(502);
                            break;

                        default:
                            dialogService.showAlert('Неизвестная ошибка', 'Отправьте лог из консоли администратору');
                            reject(null);
                            console.error(error.response);
                            break;
                    }
                });
        });
    },

    post(resource, params) {
        this.setHeader();

        return new Promise((resolve, reject) => {
            Vue.axios
                .post(`${resource}`, params)
                .then(response => {
                    if (response) resolve(response);
                    else resolve('successful');
                })
                .catch(error => {
                    switch (error.response.status) {
                        case 400:
                            dialogService.showAlert('Ошибка', error.response.data.error);
                            reject(400);
                            break;

                        case 401:
                            dialogService.showAlert('Ошибка', 'Не авторизован');
                            reject(401);
                            break;

                        case 403:
                            dialogService.showAlert('Ошибка', 'Недостаточно прав для доступа');
                            reject(403);
                            break;

                        case 500:
                            dialogService.showAlert('Ошибка', `Ошибка сервера: ${error.response.data.error}`);
                            reject(500);
                            break;

                        case 502:
                        case 503:
                            dialogService.showAlert('Ошибка', 'Сервер недоступен');
                            reject(502);
                            break;

                        default:
                            dialogService.showAlert('Неизвестная ошибка', 'Отправьте лог из консоли администратору');
                            reject(null);
                            console.error(error.response);
                            break;
                    }
                });
        });
    },

    update(resource, slug, params) {
        this.setHeader();
        return Vue.axios.put(`${resource}/${slug}`, params);
    },

    put(resource, params) {
        this.setHeader();
        return Vue.axios.put(`${resource}`, params);
    },

    delete(resource) {
        this.setHeader();
        return Vue.axios.delete(resource).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },
};
