<template>
    <b-container>
        <div class="row">
            <b-row class="col-2 p-lg-4">
                <b-button variant="success" @click="addCardProfileModal(cardProfile)">Добавить</b-button>
            </b-row>
        </div>

        <div class="row mt-2">
            <div>
                <div class="p-2 alert alert-success">
                    <h3>Коллеги</h3>
                    <div v-for="element in colleagues" :key="element.id">
                        <div class="list-group-item mt-1 profileCard" button @click="openCardProfileModal(element)">
                            <b-row>
                                <b-col cols="1">
                                    <b-icon icon="person-circle" variant="success"></b-icon>
                                </b-col>
                                <b-col>
                                    <div>Имя: {{ element.name }}</div>
                                    <div>Направление: {{ element.direction }}</div>
                                    <div>Должность: {{ element.position }}</div>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal
            id="my-modal"
            ref="my-modal"
            :hide-footer="hideFooterModal"
            :title="titleModal"
            ok-only
            @show="resetModal"
            @hidden="resetModal"
            @ok="addCardProfileInList"
        >
            <b-container class="p-1 alert alert-warning">
                <b-form-input
                    id="input-1"
                    v-model="cardProfile.name"
                    :state="cardProfileState(cardProfile.name)"
                    required
                    placeholder="Имя"
                />
                <b-form-input
                    id="input-2"
                    v-model="cardProfile.position"
                    :state="cardProfileState(cardProfile.position)"
                    required
                    class="mt-2"
                    placeholder="Должность"
                />
                <b-form-input
                    id="input-3"
                    v-model="cardProfile.direction"
                    :state="cardProfileState(cardProfile.direction)"
                    class="mt-2"
                    aria-describedby="input-live-feedback"
                    required
                    placeholder="Направление"
                />
                <b-form-invalid-feedback id="input-live-feedback" class="mt-2">
                    Введите не менее 2 букв
                </b-form-invalid-feedback>
                <hr />
                <b-form-textarea
                    id="textarea-auto-height"
                    v-model="cardProfile.description"
                    placeholder="Описание"
                    max-rows="8"
                    class="mt-2"
                />
                <b-row class="mt-2">
                    <b-col cols="9" class="d-flex justify-content-end">
                        <b-button
                            v-if="showSaveAndDeleteButton"
                            size="sm"
                            variant="danger"
                            @click="deleteCardProfile(cardProfile.id)"
                        >
                            Удалить профиль
                        </b-button>
                    </b-col>
                    <b-col class="d-flex justify-content-end">
                        <b-button
                            v-if="showSaveAndDeleteButton"
                            size="sm"
                            variant="success"
                            @click="saveCardProfile(_, cardProfile)"
                        >
                            Сохранить
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
    </b-container>
</template>

<script>
import '@/styles/colleagues/Colleagues.css';
import apiService from '@/services/api.service';
import Loading from '@/store/models/Loading';

export default {
    name: 'Colleagues',
    data() {
        let load = new Loading();
        this.getColleagues(load);
        return {
            load: load,
            // for new tasks
            cardProfile: {
                name: '',
                position: '',
                direction: '',
                description: '',
            },
            // 4 arrays to keep track of our 4 statuses
            colleagues: [],
            hideFooterModal: true,
            titleModal: '',
            showSaveAndDeleteButton: true,
        };
    },
    methods: {
        getColleagues: function (load) {
            load.Calculate(true);

            apiService.User.Users.GetUsers()
                .then(response => {
                    this.colleagues = response.data;
                    load.Calculate(false);
                })
                .catch(() => load.Calculate(false));
        },
        //add new tasks method
        addCardProfileModal: function (card) {
            this.styleModal(card);
            this.$refs['my-modal'].show();
            this.cardProfile = card;
        },

        addCardProfileInList: function (bvModalEvent) {
            if (!this.validation(this.cardProfile)) {
                return bvModalEvent.preventDefault();
            }

            if (this.cardProfile) {
                this.load.Calculate(true);

                apiService.User.Users.PostUser(this.cardProfile)
                    .then(() => location.reload())
                    .catch(() => this.load.Calculate(false));
            }
        },

        openCardProfileModal: function (card) {
            this.styleModal(card);
            this.$refs['my-modal'].show();
            this.cardProfile = card;
        },

        saveCardProfile: function (bvModalEvent, cardProfile) {
            if (!this.validation(this.cardProfile)) {
                return bvModalEvent.preventDefault();
            }

            this.load.Calculate(true);

            apiService.User.Users.PutUser(cardProfile)
                .then(() => location.reload())
                .catch(() => this.load.Calculate(false));

            this.$refs['my-modal'].hide();
        },

        deleteCardProfile: function (idProfile) {
            this.load.Calculate(true);

            apiService.User.Users.DeleteUser(idProfile)
                .then(() => location.reload())
                .catch(() => this.load.Calculate(false));
        },

        validation: function (card) {
            return card.name.length < 2 || card.direction.length < 2 || card.position.length < 2 ? false : true;
        },

        cardProfileState: function (field) {
            return field.length > 1 ? true : false;
        },

        resetModal: function () {
            this.cardProfile = { name: '', position: '', direction: '', description: '' };
        },

        styleModal: function (card) {
            if (card === this.cardProfile) {
                this.showSaveAndDeleteButton = false;
                this.hideFooterModal = false;
                this.titleModal = 'Добавить карточку профиля';
            } else {
                this.showSaveAndDeleteButton = true;
                this.hideFooterModal = true;
                this.titleModal = 'Обновить карточку профиля';
            }
        },
    },
};
</script>
