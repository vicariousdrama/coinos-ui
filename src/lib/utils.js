import { browser } from '$app/env';
import { toast } from '@zerodevx/svelte-toast';

export function scroll(section) {
	section.scrollIntoView({ behavior: 'smooth' });
}

const base = browser ? '' : import.meta.env.VITE_COINOS_URL;

export const get = (url, headers = { accept: 'application/json' }) =>
	fetch(base + url, { headers })
		.then((r) => r.text())
		.then((body) => {
			try {
				return JSON.parse(body);
			} catch (e) {
				throw new Error(body);
			}
		});

export const post = (url, body, headers) => {
	headers = { ...headers, accept: 'application/json', 'content-type': 'application/json' };
	return fetch(base + url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers
	})
		.then((r) => r.text())
		.then((body) => {
			try {
				body = JSON.parse(body);
			} catch (e) {
				throw new Error(body);
			}

			if (body instanceof Error) throw body;
			if (body.name === 'Error') throw new Error(body.message);

			return body;
		});
};

export const copy = (text) => {
	navigator.clipboard.writeText(text);
	success('Copied!');
};

export function reverseFormat(val, locale) {
	let parts = new Intl.NumberFormat(locale).formatToParts(1111.1);
	let group = parts.find((part) => part.type === 'group').value;
	let decimal = parts.find((part) => part.type === 'decimal').value;
	let reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
	reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
	return Number.isNaN(reversedVal) ? 0 : +reversedVal;
}

export let protectedRoutes = [
	/receive/,
	/customers/,
	/dashboard/,
	/settings/,
	/transactions/,
	/support/
];

export const success = (m) => {
	toast.pop();
	toast.push(m, {
		theme: {
			'--toastBarBackground': '#16A34A'
		}
	});
};

export const warning = (m) => {
	toast.pop();
	toast.push(m, {
		theme: {
			'--toastBarBackground': '#FFCE22'
		}
	});
};
export const failure = (m) => {
	toast.pop();
	toast.push(m, {
		theme: {
			'--toastBarBackground': '#E93535'
		}
	});
};
export const info = (m) => {
	toast.pop();
	toast.push(m, {
		theme: {
			'--toastBarBackground': '#1C69FF'
		}
	});
};
