<template>
    <b-container>
        <div class="row">
            <b-row class="col-2 p-lg-4">
                <b-button variant="success" @click="addCardModal(card)">Добавить</b-button>
            </b-row>
        </div>

        <div class="row mt-2">
            <div class="col-3">
                <div class="p-2 alert alert-secondary">
                    <h3>Новые</h3>
                    <draggable :list="cardsBackLog" class="list-group kanban-column" group="cards" @change="onChange">
                        <div v-for="element in cardsBackLog" :key="element.id">
                            <div class="list-group-item mt-1 card" button @click="openCardModal(element)">
                                <div>Имя: {{ element.Users.name }}</div>
                                <div>Направление: {{ element.Users.direction }}</div>
                                <div>Должность: {{ element.Users.position }}</div>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>

            <div class="col-3">
                <div class="p-2 alert alert-primary">
                    <h3>0%</h3>
                    <draggable
                        :list="cardsInProgress"
                        class="list-group kanban-column"
                        group="cards"
                        @change="onChange"
                    >
                        <div v-for="element in cardsInProgress" :key="element.id">
                            <div class="list-group-item mt-1 card" button @click="openCardModal(element)">
                                <div>Имя: {{ element.Users.name }}</div>
                                <div>Направление: {{ element.Users.direction }}</div>
                                <div>Должность: {{ element.Users.position }}</div>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>

            <div class="col-3">
                <div class="p-2 alert alert-warning">
                    <h3>50%</h3>
                    <draggable :list="cardsTested" class="list-group kanban-column" group="cards" @change="onChange">
                        <div v-for="element in cardsTested" :key="element.id" button @click="openCardModal(element)">
                            <div class="list-group-item mt-1 card">
                                <div>Имя: {{ element.Users.name }}</div>
                                <div>Направление: {{ element.Users.direction }}</div>
                                <div>Должность: {{ element.Users.position }}</div>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>

            <div class="col-3">
                <div class="p-2 alert alert-success">
                    <h3>Сделано</h3>
                    <draggable :list="cardsDone" class="list-group kanban-column" group="cards" @change="onChange">
                        <div v-for="element in cardsDone" :key="element.id" button @click="openCardModal(element)">
                            <div button class="list-group-item mt-1 card">
                                <div>Имя: {{ element.Users.name }}</div>
                                <div>Направление: {{ element.Users.direction }}</div>
                                <div>Должность: {{ element.Users.position }}</div>
                            </div>
                        </div>
                    </draggable>
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
            @ok="addNewCard"
        >
            <b-container class="p-1 alert alert-warning">
                <label>Пользователь:</label>
                <multiselect
                    v-model="card.Users"
                    :options="users"
                    :searchable="true"
                    :allow-empty="false"
                    class="mt-2"
                    deselect-label="Can't remove this value"
                    track-by="name"
                    label="name"
                    placeholder="Выберите пользователя"
                />
                <hr />
                <b-form-input
                    id="input-1"
                    v-model="card.Users.name"
                    :state="cardState(card.Users.name)"
                    disabled
                    class="mt-2"
                    required
                    placeholder="Имя"
                />
                <b-form-input
                    id="input-2"
                    v-model="card.Users.position"
                    :state="cardState(card.Users.position)"
                    disabled
                    required
                    class="mt-2"
                    placeholder="Должность"
                />
                <b-form-input
                    id="input-3"
                    v-model="card.Users.direction"
                    :state="cardState(card.Users.direction)"
                    disabled
                    class="mt-2"
                    aria-describedby="input-live-feedback"
                    required
                    placeholder="Направление"
                />
                <b-form-invalid-feedback id="input-live-feedback"> Введите не менее 2 букв </b-form-invalid-feedback>
                <hr />
                <div v-if="showButtonUpdate" class="justify-content-md-center">
                    <div v-for="element in card.Task" :key="element.id" class="alert alert-success">
                        <b-row>
                            <b-col cols="1" class="p-3">
                                <input
                                    id="flexCheckDefault"
                                    v-model="element.done"
                                    class="big-checkbox"
                                    type="checkbox"
                                />
                            </b-col>
                            <b-col>
                                <b-form-textarea
                                    id="textarea-auto-height"
                                    v-model="element.text"
                                    placeholder="Enter something..."
                                    max-rows="8"
                                />
                            </b-col>
                            <b-col cols="1" class="p-1">
                                <b-button size="sm" variant="alert-success" @click="deleteTask(element.id)"
                                    ><b-icon icon="clipboard-x" variant="danger"
                                /></b-button>
                            </b-col>
                        </b-row>
                    </div>
                </div>
                <b-row class="mt-2">
                    <b-col class="d-flex justify-content-end ml-2">
                        <b-button v-if="showButtonUpdate" size="sm" variant="danger" @click="deleteCard(card.id)">
                            Удалить карточку
                        </b-button>
                    </b-col>
                    <b-col class="d-flex justify-content-end">
                        <b-button v-if="showButtonUpdate" size="sm" variant="success" @click="updateCard">
                            Сохранить
                        </b-button>
                    </b-col>
                    <b-col class="d-flex justify-content-end">
                        <b-button v-if="showButtonUpdate" size="sm" variant="primary" @click="addTask(card)">
                            Добавить задачу
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
    </b-container>
</template>

<script>
import draggable from 'vuedraggable';
import '@/styles/individualPlan/IndividualPlan.css';
import apiService from '@/services/api.service';
import Loading from '@/store/models/Loading';

export default {
    name: 'IndividualPlan',
    components: {
        //import draggable as a component
        draggable,
    },
    data() {
        let load = new Loading();
        this.getCards(load);
        this.getUsers(load);

        return {
            load: load,
            // for new tasks
            card: {
                id: '',
                name: '',
                position: '',
                description: '',
                Users: {
                    direction: '',
                    name: '',
                    position: '',
                },
                Task: [{ id: 1, done: false, text: '', cardId: '', status: '' }],
            },
            // 4 arrays to keep track of our 4 statuses
            cardsBackLog: [],
            cardsInProgress: [],
            cardsTested: [],
            cardsDone: [],
            cards: [],
            users: [],
            hideFooterModal: true,
            titleModal: '',
            showButtonUpdate: true,
        };
    },
    methods: {
        onChange({ added }) {
            if (added) {
                this.saveChange(added.element);
            }
        },
        saveChange: function (changeCard) {
            this.cardsBackLog.forEach(card => {
                if (card.id == changeCard.id) {
                    changeCard.pillar = 1;
                    apiService.User.Cards.PutCard(changeCard);
                }
            });
            this.cardsInProgress.forEach(card => {
                if (card.id == changeCard.id) {
                    changeCard.pillar = 2;
                    apiService.User.Cards.PutCard(changeCard);
                }
            });
            this.cardsTested.forEach(card => {
                if (card.id == changeCard.id) {
                    changeCard.pillar = 3;
                    apiService.User.Cards.PutCard(changeCard);
                }
            });
            this.cardsDone.forEach(card => {
                if (card.id == changeCard.id) {
                    changeCard.pillar = 4;
                    apiService.User.Cards.PutCard(changeCard);
                }
            });
        },
        getCards: function (load) {
            load.Calculate(true);

            apiService.User.Cards.GetCards()
                .then(response => {
                    this.cards = response.data;
                    this.filterCards(this.cards);
                    load.Calculate(false);
                })
                .catch(() => load.Calculate(false));
        },
        getUsers: function (load) {
            load.Calculate(true);

            apiService.User.Users.GetUsers()
                .then(response => {
                    this.users = response.data;
                    load.Calculate(false);
                })
                .catch(() => load.Calculate(false));
        },

        filterCards: function (cards) {
            cards.forEach(card => {
                if (card.pillar == 1) {
                    this.cardsBackLog.push(card);
                }
                if (card.pillar == 2) {
                    this.cardsInProgress.push(card);
                }
                if (card.pillar == 3) {
                    this.cardsTested.push(card);
                }
                if (card.pillar == 4) {
                    this.cardsDone.push(card);
                }
            });
        },
        //add new tasks method
        addCardModal: function (card) {
            this.styleModal(card);
            this.$refs['my-modal'].show();
            this.card = card;
        },

        addNewCard: function (bvModalEvent) {
            if (!this.validation(this.card)) {
                return bvModalEvent.preventDefault();
            }
            if (this.card) {
                var modelCard = {};
                modelCard['userId'] = this.card.Users.id;
                modelCard['pillar'] = 1;
                modelCard['name'] = this.card.Users.name;
                modelCard['description'] = this.card.Users.description;

                this.load.Calculate(true);

                apiService.User.Cards.PostCard(modelCard)
                    .then(() => location.reload())
                    .catch(() => this.load.Calculate(false));
            }
        },

        openCardModal: function (card) {
            this.styleModal(card);
            this.$refs['my-modal'].show();
            this.card = card;
        },

        updateCard: function (bvModalEvent) {
            if (!this.validation(this.card)) {
                return bvModalEvent.preventDefault();
            }

            this.load.Calculate(true);

            this.card.Task.forEach(Task => {
                if (Task.status == 'new') {
                    apiService.User.Tasks.PostTask(Task);
                } else {
                    apiService.User.Tasks.PutTask(Task);
                }
            });

            apiService.User.Cards.PutCard(this.card)
                .then(() => location.reload())
                .catch(() => this.load.Calculate(false));

            this.$refs['my-modal'].hide();
        },

        deleteCard: function (cardId) {
            this.load.Calculate(true);

            apiService.User.Cards.DeleteCard(cardId)
                .then(() => location.reload())
                .catch(() => this.load.Calculate(false));
        },

        addTask: function (card) {
            card.Task.push({ cardId: card.id, done: false, text: '', status: 'new' });
        },

        deleteTask: function (taskId) {
            apiService.User.Tasks.DeleteTask(taskId).then(() => location.reload());
        },

        validation: function (card) {
            return card.Users.name.length < 2 || card.Users.direction.length < 2 || card.Users.position.length < 2
                ? false
                : true;
        },

        cardState: function (field) {
            return field.length > 1 ? true : false;
        },

        resetModal: function () {
            this.card = {
                name: '',
                position: '',
                description: '',
                Users: {
                    direction: '',
                    name: '',
                    position: '',
                },
                Task: [{ id: 1, done: false, text: '' }],
            };
        },

        styleModal: function (card) {
            if (card === this.card) {
                this.showButtonUpdate = false;
                this.hideFooterModal = false;
                this.titleModal = 'Добавить карточку';
            } else {
                this.showButtonUpdate = true;
                this.hideFooterModal = true;
                this.titleModal = 'Обновить карточку';
            }
        },
    },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
