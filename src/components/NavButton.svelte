<script lang="ts">
	import { createEventDispatcher } from "svelte";
	export let text:string;
	export let gridArea:string;
	
	const navDispatch = createEventDispatcher();
	const HandleNavigation = () => navDispatch("navigation");
</script>

<p class="nav-item" style:grid-area={gridArea} on:click on:click={HandleNavigation}>{text}</p>

<style lang="scss">
	.nav-item{
			color: white;
			text-decoration: none;
			font-weight: 600;
			border-radius: $borderRadius;
			border: 0.15rem solid transparent;
			transition: all 0.25s;
			padding: 0.5rem;
			cursor: pointer;

			&:hover, &:focus{
				padding: 0.5rem;
				border-color: $darkGrey;
				background-color: #30303050;
			}
		}
</style>