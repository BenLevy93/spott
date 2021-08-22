import { shallowMount } from "@vue/test-utils";
import Navbar from "@/components/Navbar.vue";

describe("Navbar.vue", () => {
  it("renders Navbar with correct titles", () => {
    const wrapper = shallowMount(Navbar);
    expect(wrapper.find(".main-title").text()).toEqual("Spott");
    expect(wrapper.find(".sub-title").text()).toEqual("Manage Products");
  });
});
