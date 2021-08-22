<template>
  <div>
    <b-table
      striped
      hover
      responsive="sm"
      :items="products"
      :busy="isBusy"
      :fields="fields"
    >
      <template #cell(actions)="row">
        <b-icon
          icon="pencil"
          class="ben123"
          @click="info(row.item, row.index, $event.target)"
        ></b-icon>
      </template>
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
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
  </div>
</template>
<script>
import ProductService from "../ProductService";
export default {
  name: "ProductList",
  data() {
    return {
      isBusy: false,
      fields: [
        {
          key: "id"
        },
        {
          key: "productName"
        },

        {
          key: "cogs.unitManufacturingCost",
          label: "Manufacturing Cost"
          // Variant applies to the whole column, including the header and footer
        },
        {
          key: "cogs.shipmentUnitCost",
          label: "Shipment Unit Cost"
          // Variant applies to the whole column, including the header and footer
        },
        {
          key: "cogs.monthlyAdvertismentCost",
          label: "Monthly Advertisment Cost"
          // Variant applies to the whole column, including the header and footer
        },
        {
          key: "cogs.manufacturingCountry",
          label: "Manufacturing Country"
          // Variant applies to the whole column, including the header and footer
        },
        {
          key: "actions"
        }
      ],
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      },
      editName: "",
      editCost: "",
      editShipment: "",
      editAdvCost: "",
      editCountry: "",
      submittedNames: [],
      showDialog: false,
      products: [],
      countries: [],
      loading: false,
      error: ""
    };
  },
  async created() {
    try {
      this.isBusy = true;
      this.products = await ProductService.getProducts();
      this.countries = await ProductService.getCountries();
      if (this.products.length && this.countries.length) {
        this.isBusy = false;
      }
    } catch (e) {
      this.error = e.message;
    }
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
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      let productToUpdate = {
        id: this.editProductId,
        productName: this.editName,
        cogs: {
          unitManufacturingCost: this.editCost,
          shipmentUnitCost: this.editShipment,
          monthlyAdvertismentCost: this.editAdvCost,
          manufacturingCountry: this.editCountry
        }
      };
      await ProductService.updateProduct(productToUpdate);
      let listElement = this.products.find((e) => e.id === productToUpdate.id);
      listElement.productName = productToUpdate.productName;
      listElement.cogs = productToUpdate.cogs;

      console.log(productToUpdate);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide(this.infoModal.id);
      });
    },
    info(item, index, button) {
      this.infoModal.title = item.productName;
      this.infoModal.content = item;
      this.editProductId = item.id;
      this.editName = item.productName;
      this.editCost = item.cogs.unitManufacturingCost;
      this.editShipment = item.cogs.shipmentUnitCost;
      this.editAdvCost = item.cogs.monthlyAdvertismentCost;
      this.editCountry = item.cogs.manufacturingCountry;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    }
  }
};
</script>
<style scoped>
div.container {
  max-width: 1500px;
  margin: 0 auto;
}
</style>
