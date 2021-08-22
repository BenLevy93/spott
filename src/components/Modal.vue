<template>
  <b-modal
    :id="infoModal.id"
    :content="infoModal.content"
    ref="modal"
    title="Edit product"
    ok-title="Edit"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="Name"
        label-for="name-input"
        invalid-feedback="Name is required"
        :state="nameState"
      >
        <b-form-input
          id="name-input"
          v-model="editName"
          :state="nameState"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Cost"
        label-for="cost-input"
        invalid-feedback="Must be greater than 0"
        :state="costState"
      >
        <b-form-input
          id="cost-input"
          v-model="editCost"
          type="number"
          :state="costState"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Shipment Cost"
        label-for="ship-input"
        invalid-feedback="Must be greater than 0"
        :state="shipmentState"
      >
        <b-form-input
          id="ship-input"
          v-model="editShipment"
          type="number"
          :state="shipmentState"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Advertisment Cost"
        label-for="adv-input"
        invalid-feedback="Must be greater than 0"
        :state="advCostState"
      >
        <b-form-input
          id="adv-input"
          v-model="editAdvCost"
          type="number"
          :state="advCostState"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Country"
        label-for="country"
        invalid-feedback="Counry is required"
        :state="countryState"
      >
        <b-form-select
          id="country"
          v-model="editCountry"
          :options="countries"
          value-field="name"
          text-field="name"
        ></b-form-select>
      </b-form-group>
    </form>
  </b-modal>
</template>
<script>
export default {
  name: "Modal",
  data() {
    return {
      editName: "",
      editCost: "",
      editShipment: "",
      editAdvCost: "",
      editCountry: ""
    };
  },
  computed: {
    nameState() {
      return this.editName.length > 2 ? true : false;
    },
    advCostState() {
      return this.editAdvCost >= 0 ? true : false;
    },
    shipmentState() {
      return this.editShipment >= 0 ? true : false;
    },
    costState() {
      return this.editCost >= 0 ? true : false;
    },
    countryState() {
      return this.editCountry !== "";
    }
  },
  methods: {
    checkFormValidity() {
      return (
        this.nameState &&
        this.advCostState &&
        this.costState &&
        this.shipmentState &&
        this.countryState
      );
    }
  }
};
</script>
