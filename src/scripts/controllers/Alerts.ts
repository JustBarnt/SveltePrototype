import { Colors } from "@enums/enums";

export class Alerts
{
	private static active:boolean = false;
	private static canExpire:boolean = true;
	private static expiresIn: number = 1500;
	private static visible: string;
	private static message: string;
	private static color: Colors;

	constructor(Directives:AlertDirectives, Properties:PropDirectives)
	{
		Alerts.active = Directives.active;
		Alerts.canExpire = Directives.canExpire;
		Alerts.expiresIn = Directives.expiresIn;
		Alerts.visible = Properties?.visible;
		Alerts.message = Properties.message;
		Alerts.color = Properties.color;
	}

	/**
	* Updates the alerts parameters for creating/hiding(if canExpire is false) the alert.
	* @param {AlertDirectives} Directives - An object containing the directives that the alert uses.
	*/
	public static SetAlert(Directives:AlertDirectives, Properties:PropDirectives):void
	{
		Alerts.Directives = Directives;
		Alerts.Props = Properties;
	}

	/**
	* Returns all properties
	* @return {IAlert} Returns an object referencing the IAlert interface.
	*/
	public static GetAll(): IAlert
	{
		let Details: IAlert;
		Details.Directives = Alerts.Directives;
		Details.Props = Alerts.Props;
		return Details;
	}

	/**
	* Sets a single property by passing the name of the propert and the value
	* @param {String} name - The name of the properties: `active, canExpire, expiresIn, visible, message, color`
	* @param {any} value - the value to update the parameter to
	* @return {any} returns the value
	*/
	public static Set(name: string, value: any): any
	{
		Alerts[name] = value;
		return value;
	}

	/**
	* Returns the set of directives used to control the alerts.
	* @return {Record<string, any>} retuns the object of directives.
	*/
	public static get Directives(): AlertDirectives
	{
		return { active: this.active, canExpire: this.canExpire, expiresIn:this.expiresIn };
	}

	/**
	* Updates the alerts directives
	* @param {AlertDirectives} Directives - An object containing the directives that the alert uses.
	*/
	private static set Directives(Directives:AlertDirectives)
	{
		this.active = Directives.active;
		this.canExpire = Directives.canExpire;
		this.expiresIn = Directives.expiresIn;
	}

	public static get Props(): PropDirectives
	{
		return { visible: this.visible, message: this.message, color: this.color };
	}

	private static set Props(Properties:PropDirectives)
	{
		this.visible = Properties?.visible;
		this.message = Properties.message;
		this.color = Properties.color;
	}
}