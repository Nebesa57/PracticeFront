import vm from '../main';

export default {
    showAlert: function (title, text) {
        return new Promise(resolve => {
            vm.$modal.show('dialog', {
                title: title,
                text: text,
                buttons: [
                    {
                        title: 'Продолжить',
                        class: 'button green',
                        handler: () => {
                            vm.$modal.hide('dialog');
                            resolve(true);
                        },
                    },
                ],
            });
        });
    },

    showConfirm: function (title, text) {
        return new Promise((resolve, reject) => {
            vm.$modal.show('dialog', {
                title: title,
                text: text,
                buttons: [
                    {
                        title: 'Отмена',
                        class: 'button red',
                        handler: () => {
                            vm.$modal.hide('dialog');
                            reject(false);
                        },
                    },
                    {
                        title: 'Продолжить',
                        class: 'button green',
                        handler: () => {
                            vm.$modal.hide('dialog');
                            resolve(true);
                        },
                    },
                ],
            });
        });
    },
};
