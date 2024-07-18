import SpainFlag from '@/components/flags/Spain.astro';
import UnitedStatesFlag from '@/components/flags/UnitedStates.astro';

// Add missing imports
export const LANGUAGES: Record<
	string,
	{ code: string; name: string; flag: typeof SpainFlag }
> = {
	en: {
		code: 'en',
		name: 'English',
		flag: UnitedStatesFlag,
	},
	es: {
		code: 'es',
		name: 'Español',
		flag: SpainFlag,
	},
};

export const defaultLang = 'es';
export const showDefaultLang = false;

export const ui = {
	es: {
		'nav.inicio': 'Inicio',
		'nav.nosotros': 'Nosotros',
		'nav.servicios': 'Servicios',
		'nav.contactenos': 'Contáctenos',
		'nav.galeria': 'Galería'
	},
	en: {
		'nav.inicio': 'Home',
		'nav.nosotros': 'About',
		'nav.servicios': 'Services',
		'nav.contactenos': 'Contact us',
		'nav.galeria': 'Gallery'
	}
} as const;

export const routes = {
	es: {
		nosotros: 'nosotros',
		servicios: 'servicios',
		contactenos: 'contactenos',
		galeria: 'galeria'
	},
	en: {
		nosotros: 'about',
		servicios: 'services',
		contactenos: 'contact-us',
		galeria: 'gallery'
	}
};