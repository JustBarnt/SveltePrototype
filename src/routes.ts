//Routing Imports
import router from "page";
import Login from "./pages/Login.svelte";
import Home from "./pages/Home.svelte";
import License from "./pages/License.svelte";
import Licenses from "./pages/Licenses.svelte";

export let page;

router("/", () => page = Login);
router("/home", () => page = Home);
router("/licenses", () => page = Licenses);
router("/license", () => page = License);

router.start();