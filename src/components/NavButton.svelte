<script lang="ts">
	export let text:string;
	export let gridArea:string;
	export let link:string = "";
	
</script>

<p class="nav-item" style:grid-area={gridArea} on:click><a href={link}>{text}</a></p>

<style lang="scss">
		a{
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