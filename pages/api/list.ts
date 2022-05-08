import { NextApiRequest, NextApiResponse } from 'next';

import type { Printer } from '../../types/Printer';

// I am not sure the proper NextJS etiquette for importing static data is.
// So I'm using this naive approach, since it works for this example.
import Data from './data.json';
const printers: Printer[] = Data.data;
export function getPrinters() {
	return printers;
}

/**
 * Handles the requests for the list of printers. Can be searched by using the query parameter "search".
 *
 * @param req NextJS request object. Can include query search to "search" through the printers.
 * @param res NextJS Response
 *
 * @returns List of either all printers or only a filtered subset.
 */
export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Printer[]>
) {
	const { search } = req.query;
	if (!search) {
		return res.status(200).send(printers);
	}

	const terms: string[] = (
		typeof search === 'string' ? search.split(' ') : search
	)
		.map((s) => s.trim().toLowerCase())
		.filter((s) => s.length > 0);

	// Using the same condition - return pair again but this approach is less error-prone
	// to empty strings and string arrays, as the NextJS query can be both.
	if (terms.length < 1) {
		return res.status(200).send(printers);
	}

	return res.status(200).send(
		printers.filter((printer) => {
			for (const key in printer) {
				const property = printer[key as keyof Printer];

				// Only searches through string values.
				if (
					typeof property === 'string' &&
					terms.every((t) => property.toLowerCase().includes(t))
				) {
					return true;
				}
			}

			return false;
		})
	);
}
