import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/home/Home.vue";
import ReplicateInstance from "../components/replicateInstance/replicateInstance.vue";
import AvailablePhoneNo from "../components/phoneNumber/availablePhoneNo.vue";
import ClaimPhoneNo from "../components/phoneNumber/claimPhoneNo.vue";
import ListPhoneNo from "../components/phoneNumber/listPhoneNumber.vue";
import TrafficDistribution from "../components/trafficDistributionGroup/trafficDistributionGroup.vue";
import ListTrafficDistribution from "../components/trafficDistributionGroup/listTrafficDistribution.vue";
import store from '../store/store'

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
    meta: { requiresAuth: true },
  },
  {
    path: "/traffic-distribution",
    name: "trafficDistribution",
    component: TrafficDistribution,
    meta: { requiresAuth: true },
  },
  {
    path: "/list-traffic-distribution",
    name: "listTrafficDistribution",
    component: ListTrafficDistribution,
    meta: { requiresAuth: true },
  },
  {
    path: "/available-phone-no",
    name: "availablePhoneNo",
    component: AvailablePhoneNo,
    meta: { requiresAuth: true },
  },
  {
    path: "/claim-phone-no",
    name: "claimPhoneNo",
    component: ClaimPhoneNo,
    meta: { requiresAuth: true },
  },
  {
    path: "/list-phone-no",
    name: "listPhoneNo",
    component: ListPhoneNo,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
