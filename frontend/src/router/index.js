import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/home/Home.vue";
import ReplicateInstance from "../components/replicateInstance/replicateInstance.vue";
import AvailablePhoneNo from "../components/phoneNumber/availablePhoneNo.vue";
import ClaimPhoneNo from "../components/phoneNumber/claimPhoneNo.vue";
import TrafficDistribution from "../components/trafficDistributionGroup/trafficDistributionGroup.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/replicat-instance",
    name: "replicateInstance",
    component: ReplicateInstance,
  },
  {
    path: "/traffic-distribution",
    name: "trafficDistribution",
    component: TrafficDistribution,
  },
  {
    path: "/available-phone-no",
    name: "availablePhoneNo",
    component: AvailablePhoneNo,
  },
  {
    path: "/claim-phone-no",
    name: "claimPhoneNo",
    component: ClaimPhoneNo,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
