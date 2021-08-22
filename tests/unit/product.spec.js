import { mount } from "@vue/test-utils";
import ProductTabel from "@/components/ProductTabel.vue";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

const mockProductsList = [
  {
    id: "B093TGGHS7",
    productName: "BESTKID BALL Kids Basketball Size 6",
    cogs: {
      unitManufacturingCost: 10,
      shipmentUnitCost: 10,
      monthlyAdvertismentCost: 10,
      manufacturingCountry: "China"
    }
  }
];

const mockCountriesList = [
  { name: "China", code: "CN" },
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" }
];

let wrapper;
beforeEach(async () => {
  wrapper = mount(ProductTabel, {
    data: function() {
      return {
        products: null,
        countries: null,
        isBusy: false,
        hasError: false
      };
    },

    mocks: {}
  });

  await wrapper.setData({
    countries: mockCountriesList,
    products: mockProductsList
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("Product", () => {
  it("click display edit mode button: remove and add elements to the dom", async () => {
    console.log("Ben45", wrapper);
    expect(await wrapper.contains("th")).toEqual(true);
    await wrapper.find(".ben123").trigger("click");
    expect(await wrapper.find(".btn-primary").exists()).toEqual(false);
    expect(await wrapper.find(".btn-secondary").exists()).toEqual(false);
  });
});
