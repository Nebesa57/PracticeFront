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
                    <draggable :list="cardsBackLog" class="list-group kanban-column" group="tasks">
                        <div v-for="element in cardsBackLog" :key="element.name">
                            <div class="list-group-item mt-1 card" button @click="openCardModal(element)">
                                <div>Имя: {{ element.name }}</div>
                                <div>Направление: {{ element.direction }}</div>
                                <div>Должность: {{ element.position }}</div>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>

            <div class="col-3">
                <div class="p-2 alert alert-primary">
                    <h3>0%</h3>
                    <draggable :list="cardsInProgress" class="list-group kanban-column" group="tasks">
                        <div v-for="element in cardsInProgress" :key="element.name">
                            <div class="list-group-item mt-1 card" button @click="openCardModal(element)">
                                <div>Имя: {{ element.name }}</div>
                                <div>Направление: {{ element.direction }}</div>
                                <div>Должность: {{ element.position }}</div>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>

            <div class="col-3">
                <div class="p-2 alert alert-warning">
                    <h3>50%</h3>
                    <draggable :list="cardsTested" class="list-group kanban-column" group="tasks">
                        <div v-for="element in cardsTested" :key="element.name" button @click="openCardModal(element)">
                            <div class="list-group-item mt-1 card">
                                <div>Имя: {{ element.name }}</div>
                                <div>Направление: {{ element.direction }}</div>
                                <div>Должность: {{ element.position }}</div>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>

            <div class="col-3">
                <div class="p-2 alert alert-success">
                    <h3>Сделано</h3>
                    <draggable :list="cardsDone" class="list-group kanban-column" group="tasks">
                        <div v-for="element in cardsDone" :key="element.name" button @click="openCardModal(element)">
                            <div button class="list-group-item mt-1 card">
                                <div>Имя: {{ element.name }}</div>
                                <div>Направление: {{ element.direction }}</div>
                                <div>Должность: {{ element.position }}</div>
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
            @ok="addCardInBackLog"
        >
            <b-container class="p-1 alert alert-warning">
                <b-form-input
                    id="input-1"
                    v-model="card.name"
                    :state="cardState(card.name)"
                    required
                    placeholder="Имя"
                />
                <b-form-input
                    id="input-2"
                    v-model="card.position"
                    :state="cardState(card.position)"
                    required
                    class="mt-2"
                    placeholder="Должность"
                />
                <b-form-input
                    id="input-3"
                    v-model="card.direction"
                    :state="cardState(card.direction)"
                    class="mt-2"
                    aria-describedby="input-live-feedback"
                    required
                    placeholder="Направление"
                />
                <b-form-invalid-feedback id="input-live-feedback"> Введите не менее 2 букв </b-form-invalid-feedback>
                <hr />
                <div class="justify-content-md-center">
                    <div v-for="element in card.checkTask" :key="element.id" class="alert alert-success">
                        <b-row>
                            <b-col cols="1" class="p-3">
                                <input
                                    id="flexCheckDefault"
                                    v-model="element.check"
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
                        </b-row>
                    </div>
                </div>
                <b-row class="mt-2">
                    <b-col class="d-flex justify-content-end">
                        <b-button
                            v-if="showSaveAndDeleteButton"
                            size="sm"
                            variant="danger"
                            @click="deleteCardProfile(cardProfile.id)"
                        >
                            Удалить профиль
                        </b-button>
                    </b-col>
                    <b-col cols="8" class="d-flex justify-content-end">
                        <b-button v-if="showSaveAndDeleteButton" size="sm" variant="success" @click="saveCard(card)">
                            Сохранить
                        </b-button>
                    </b-col>
                    <b-col>
                        <b-button size="sm" variant="primary" @click="addTask(card)"> Добавить задачу </b-button>
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
        return {
            load: load,
            // for new tasks
            card: {
                name: '',
                position: '',
                direction: '',
                checkTask: [{ id: 1, check: false, text: '' }],
            },
            // 4 arrays to keep track of our 4 statuses
            cardsBackLog: [],
            cardsInProgress: [],
            cardsTested: [],
            cardsDone: [],
            cards: [],
            hideFooterModal: true,
            titleModal: '',
            showSaveAndDeleteButton: true,
        };
    },
    methods: {
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
        filterCards: function (cards) {
            cards.forEach(card => {
                if (card.column == 1) {
                    this.cardsBackLog.push(card);
                }
                if (card.column == 2) {
                    this.cardsInProgress.push(card);
                }
                if (card.column == 3) {
                    this.cardsTested.push(card);
                }
                if (card.column == 4) {
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

        addCardInBackLog: function (bvModalEvent) {
            if (!this.validation(this.card)) {
                return bvModalEvent.preventDefault();
            }

            if (this.card) {
                this.cardsBackLog.push({
                    name: this.card.name,
                    position: this.card.position,
                    direction: this.card.direction,
                    checkTask: this.card.checkTask,
                });
            }
        },

        openCardModal: function (card) {
            this.styleModal(card);
            this.$refs['my-modal'].show();
            this.card = card;
        },

        saveCard: function (bvModalEvent, card) {
            this.load.Calculate(true);

            apiService.User.Cards.PutCard(card)
                .then(response => {
                    this.load.Calculate(false);
                })
                .catch(() => load.Calculate(false));
            if (!this.validation(this.card)) {
                return bvModalEvent.preventDefault();
            }
            this.$refs['my-modal'].hide();
        },

        addTask: function (card) {
            card['checkTask'].push({ id: 3, check: false, text: 'Тест' });
        },

        validation: function (card) {
            return card.name.length < 2 || card.direction.length < 2 || card.position.length < 2 ? false : true;
        },

        cardState: function (field) {
            return field.length > 1 ? true : false;
        },

        resetModal: function () {
            this.card = { name: '', position: '', direction: '', checkTask: [{ id: 1, check: false, text: '' }] };
        },

        styleModal: function (card) {
            if (card === this.card) {
                this.showSaveAndDeleteButton = false;
                this.hideFooterModal = false;
                this.titleModal = 'Добавить карточку';
            } else {
                this.showSaveAndDeleteButton = true;
                this.hideFooterModal = true;
                this.titleModal = 'Обновить карточку';
            }
        },
    },
};
</script>
