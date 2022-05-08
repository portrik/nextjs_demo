import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import type { Printer } from '../types/Printer';
import { Rows } from '../types/Rows';
import { getPrinters } from './api/list';

import { Controls } from '../components/Controls';
import { PrinterTable } from '../components/PrinterTable';
import styled from 'styled-components';

type HomepageProps = {
	initialPrinters: Printer[];
	initialHiddenRows: [keyof Rows, Rows][];
	initialSearch: string;
};

const PageWrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 100vw;
	height: 100vh;
	padding: 16px;
`;

const TableWrapper = styled.div`
	min-width: 80vw;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-content: center;
`;

const Search = styled.input`
	width: 100%;
	font-size: 16px;
	padding-left: 16px;
	padding-right: 16px;
	display: block;
	border: none;
	border-bottom: 1px solid black;
`;

const Home: NextPage<HomepageProps> = ({
	initialHiddenRows,
	initialPrinters,
	initialSearch,
}) => {
	// List of the rows used by the printer table
	const rows = Object.entries(Rows) as [keyof Rows, Rows][];

	// List of currently displayed printers
	const [printers, setPrinters] = useState<Printer[]>(initialPrinters);
	// List of hidden parameters
	const [hidden, setHidden] = useState<[keyof Rows, Rows][]>(initialHiddenRows);
	// Search term
	const [search, setSearch] = useState<string>(initialSearch);

	// Queries the API endpoint for the list of printers.
	// If search is not empty, the search term is used as a parameter.
	useEffect(() => {
		const newSearch = search.trim();
		let url = 'api/list';

		if (newSearch.length > 1) {
			url += `?search=${encodeURIComponent(newSearch)}`;
		}

		fetch(url).then((res) =>
			res.json().then((newPrinters) => setPrinters(newPrinters))
		);
	}, [search]);

	const hideRow = (row: [keyof Rows, Rows]) => {
		const newHidden = [...hidden];
		newHidden.push(row);
		setHidden(newHidden);
	};

	return (
		<PageWrapper>
			<Head>
				<title>Printer Table</title>
			</Head>

			<Controls
				parameters={hidden}
				onParametersChange={(value) => setHidden(value)}
				printers={initialPrinters}
				onChange={(value) => setPrinters(value)}
			/>

			<TableWrapper>
				<Search
					type='text'
					name='Search'
					placeholder='Search...'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<PrinterTable
					printers={printers}
					rows={rows.filter((row) => !hidden.find((r) => r[0] === row[0]))}
					onHide={(row) => hideRow(row)}
				/>
			</TableWrapper>
		</PageWrapper>
	);
};

export async function getServerSideProps(): Promise<{ props: HomepageProps }> {
	return {
		props: {
			initialPrinters: getPrinters(),
			initialHiddenRows: [],
			initialSearch: '',
		},
	};
}

export default Home;
