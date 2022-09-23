<script lang="ts">
    import { Colors } from "@enums/enums";
    import { componentStore as alerts } from "@stores/stores";
    import { createEventDispatcher, onMount } from "svelte";
    import { backIn, backOut } from "svelte/easing";
    import { slide } from "svelte/transition";
	
	let props:ComponentManagement = { id: null, name: null, extras: null }; 
	export let visible = "hidden";
	export let message = "";
	export let styles: Colors;
	export let expiration: number | never = undefined;

	const dispatch = createEventDispatcher();
	
	onMount(() =>
	{
		AlertCreated($alerts, expiration);
	});

	/**
	* Runs when the alert is created sets all properties and started the destruction predicate if applicable
	* @param {ComponentManagement[]} store - The store containing components
	* @param {Number} expiration - The expiration time if applicable
	*/
	const AlertCreated = (store: ComponentManagement[], expiration:number) => 
	{
		props = { id: store.length+1, name: `alerts_${store.length+1}`, extras: message };
		store[store.length] = props;

		expiration !== undefined ? setTimeout(() => { DestorySelf(); }, expiration) : null;
	}; 

	/**
	* Destroys an alert if it was given an expiration time.
	*/
	function DestorySelf()
	{
		console.log("removing license");
		$alerts.filter((value:any) => 
		{
			if(value.id !== props.id) 
			{
				alerts.set([ { ...value } ]);
				visible = "hidden";
			}
			else
			{
				alerts.set([...$alerts]);
			}
		}); 


		dispatch("destroyed", { destroy: true });
	}

</script>
<alert class={visible} style="background-color: {styles}" in:slide={{ duration: 500, easing: backOut }} out:slide={{ duration: 500, delay: 250, easing: backIn }}>
	<p>
		{message}
	</p>
</alert>
<style lang="scss">
	alert{
		cursor:default;
		
		&.hidden{
			@include alert-base;
			@include alert-hidden;
		}
	
		&.visible{
			@include alert-base;
			@include alert-visible;
		}
	}
</style>