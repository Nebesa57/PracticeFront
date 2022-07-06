<template>
    <b-container>
        <div class="row gy-4">
            <div class="col-4 p-lg-4">
                <div class="row gy-4">
                    <b-button variant="success" @click="addCardMaterialsModal(cardMaterials)"> Добавить </b-button>

                    <div class="p-2 alert alert-success">
                        <h3>Материалы</h3>

                        <div :list="materials" class="list-group kanban-column" group="tasks">
                            <div v-for="element in materials" :key="element.date">
                                <div class="list-group-item mt-1 card" button @click="openCardMaterialsModal(element)">
                                    <div>Тип: {{ element.type }}</div>

                                    <div>Дата: {{ element.date }}</div>

                                    <div>Название: "{{ element.name }}"</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-8 p-lg-5">
                <b-calendar
                    v-model="eventDate"
                    :date-info-fn="eventLog"
                    selected-variant="success"
                    today-variant="info"
                    nav-button-variant="success"
                    block
                    class="border rounded p-2"
                    start-weekday="1"
                    @context="onContext"
                />
            </div>
        </div>

        <b-modal
            id="show-modal"
            ref="show-modal"
            title="Информация о событии"
            hide-footer
            @show="resetModal"
            @hidden="resetModal"
        >
            <div>Тип: {{ cardMaterials.type }}</div>

            <div>Дата: {{ cardMaterials.date }}</div>

            <div>Название: "{{ cardMaterials.name }}"</div>

            <br />

            <div>
                <label for="text-area-m">Описание:</label>
                <b-form-textarea
                    id="text-area-m"
                    v-model="cardMaterials.description"
                    max-rows="8"
                    class="mt-2"
                    readonly
                />
            </div>
        </b-modal>

        <b-modal id="my-modal" ref="my-modal" :title="titleModal" hide-footer @show="resetModal" @hidden="resetModal">
            <b-container class="p-1 alert alert-warning">
                <b-form-input
                    id="input-1"
                    v-model="cardMaterials.type"
                    :state="cardMaterialsState(cardMaterials.type)"
                    required
                    placeholder="Тип"
                />

                <b-form-input
                    id="input-3"
                    v-model="cardMaterials.name"
                    :state="cardMaterialsState(cardMaterials.name)"
                    class="mt-2"
                    aria-describedby="input-live-feedback"
                    required
                    placeholder="Название"
                />

                <b-form-invalid-feedback id="input-live-feedback" class="mt-2">
                    Введите не менее 2 букв
                </b-form-invalid-feedback>

                <div>
                    <label for="datepicker">Выберите дату</label>
                    <b-form-datepicker id="datepicker" v-model="cardMaterials.date" class="mb-2"></b-form-datepicker>
                </div>

                <b-form-textarea
                    id="textarea-auto-height"
                    v-model="cardMaterials.description"
                    placeholder="Описание"
                    max-rows="8"
                    class="mt-2"
                />

                <hr />

                <b-row class="mt-2">
                    <b-col class="d-flex justify-content-end">
                        <b-button
                            v-if="showSaveButton"
                            size="sm"
                            variant="danger"
                            @click="deleteMaterial(cardMaterials.id)"
                        >
                            Удалить профиль
                        </b-button>
                    </b-col>
                    <b-col class="d-flex justify-content-end">
                        <b-button
                            v-if="showSaveButton"
                            size="sm"
                            variant="success"
                            @click="saveCardMaterials(cardMaterials)"
                        >
                            Сохранить
                        </b-button>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col class="d-flex justify-content-end">
                        <b-button
                            v-if="showAddButton"
                            size="sm"
                            variant="success"
                            @click="addCardInBackLog(cardMaterials)"
                        >
                            Добавить
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
    </b-container>
</template>

<script>
import '@/styles/materials/Materials.css';
import apiService from '@/services/api.service';
import Loading from '@/store/models/Loading';

export default {
    name: 'Materials',
    data() {
        let load = new Loading();
        this.getMaterials(load);
        return {
            cardMaterials: {
                type: '',
                date: new Date(),
                name: '',
                description: '',
            },
            materials: [],
            eventDate: '',
            titleModal: '',
            showSaveButton: true,
            showAddButton: true,
        };
    },
    methods: {
        getMaterials: function (load) {
            load.Calculate(true);

            apiService.User.Materials.GetMaterials()
                .then(response => {
                    this.materials = response.data;
                    load.Calculate(false);
                })
                .catch(() => load.Calculate(false));
        },
        onContext(ctx) {
            const eventLogDate = [];

            this.materials.forEach(material => {
                eventLogDate.push(material.date);
            });

            if (eventLogDate.includes(ctx.selectedYMD) && ctx.activeYMD == ctx.selectedYMD) {
                let card = this.materials.find(material => material.date == ctx.activeYMD);
                this.showCardMaterialsModal(card);
            }
        },
        eventLog: function (yml) {
            const eventLogDate = [];

            this.materials.forEach(material => {
                eventLogDate.push(material.date);
            });

            if (eventLogDate.includes(yml)) {
                return 'alert-success';
            }
        },
        addCardMaterialsModal: function (card) {
            this.styleModal(card);
            this.$refs['my-modal'].show();
            this.cardMaterials = card;
        },
        openCardMaterialsModal: function (card) {
            this.styleModal(card);
            this.$refs['my-modal'].show();
            this.cardMaterials = card;
        },
        showCardMaterialsModal: function (card) {
            this.$refs['show-modal'].show();
            this.cardMaterials = card;
        },
        deleteMaterial(bvModalEvent, id) {
            this.load.Calculate(true);

            apiService.User.Materials.DeleteMaterial(id)
                .then(() => {
                    this.load.Calculate(false);
                })
                .catch(() => this.load.Calculate(false));
            if (!this.validation(this.card)) {
                return bvModalEvent.preventDefault();
            }
            this.$refs['my-modal'].hide();
        },
        saveCardMaterials: function (bvModalEvent, card) {
            this.load.Calculate(true);

            apiService.User.Materials.PutMaterial(card)
                .then(() => {
                    this.load.Calculate(false);
                })
                .catch(() => this.load.Calculate(false));
            if (!this.validation(this.card)) {
                return bvModalEvent.preventDefault();
            }
            this.$refs['my-modal'].hide();
        },
        addCardInBackLog: function (bvModalEvent) {
            if (!this.validation(this.cardMaterials)) {
                return bvModalEvent.preventDefault();
            }

            if (this.cardMaterials) {
                this.load.Calculate(true);

                apiService.User.Materials.PostMaterial(this.cardMaterials)
                    .then(() => location.reload())
                    .catch(() => this.load.Calculate(false));
            }

            if (this.cardMaterials) {
                this.materials.push({
                    type: this.cardMaterials.type,
                    date: this.cardMaterials.date,
                    name: this.cardMaterials.name,
                    description: this.cardMaterials.description,
                });
            }
        },
        validation: function (card) {
            return card.type.length < 2 || card.date.length < 2 || card.name.length < 2 ? false : true;
        },
        cardMaterialsState: function (field) {
            return field.length > 1 ? true : false;
        },
        resetModal: function () {
            this.cardMaterials = {
                type: '',
                date: '',
                name: '',
                description: '',
            };
        },
        styleModal: function (card) {
            if (card === this.cardMaterials) {
                this.showSaveButton = false;
                this.showAddButton = true;
                this.titleModal = 'Добавить новый материал';
            } else {
                this.showSaveButton = true;
                this.showAddButton = false;
                this.titleModal = 'Обновить карточку материала';
            }
        },
    },
};
</script>
