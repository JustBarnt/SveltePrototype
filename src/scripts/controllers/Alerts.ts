import { Colors } from "@enums/enums";

export class Alerts
{
	private static active:boolean = false;
	private static canExpire:boolean = true;
	private static expiresIn: number = 1500;

	constructor(active:boolean, canExpire:boolean, expiresIn:number)
	{
		Alerts.active = active;
		Alerts.canExpire = canExpire;
		Alerts.expiresIn = expiresIn;
	}

	public static SetAlert(visible: string, message: string, styles: Colors)
	{

	}

	/**
	* Returns the set of directives used to control the alerts.
	* @return {Record<string, any>} retuns the object of directives.
	*/
	public static get Directives(): Record<string, any>
	{
		return { active: this.active, canExpire: this.canExpire, expiresIn:this.expiresIn };
	}
}