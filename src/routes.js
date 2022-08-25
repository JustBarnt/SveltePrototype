//Routing Imports
import router from "page";
import Home from "./routes/Home.svelte";
import License from "./routes/License.svelte";
import Licenses from "./routes/Licenses.svelte";

export let page;

router("/", () => page = Home);
router("/Licenses", () => page = Licenses);
router("/License", () => page = License);

router.start();