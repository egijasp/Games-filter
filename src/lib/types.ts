type Game = {
	app_id: string;
	name: string;
	icon: string;
};

type Retention = {
	app_id: string;
	app_ver: string;
	country: string;
	days: number[];
};

type ViewType = 'table' | 'chart';

type DropdownOption = {
	value?: string;
	name: string;
	icon?: string;
	trimmedName?: string;
};

type RetentionOption = {
	devices: number;
	version?: string;
	country?: string;
};

type Filter = {
	game?: string;
	version?: string;
	country?: string;
};

export type { Game, Retention, ViewType, DropdownOption, RetentionOption, Filter };
