import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

import type { Printer } from '../types/Printer';
import { Rows } from '../types/Rows';

export type PrinterTableProps = {
	printers: Printer[];
	rows: [keyof Rows, Rows][];
	onHide: (row: [keyof Rows, Rows]) => void;
};

const Clickable = styled.span`
	cursor: pointer;
`;

const Table = styled.table`
	flex-grow: 1;
	border-collapse: collapse;
`;

const RowHeading = styled.th`
	width: 10vw;
`;

const Row = styled.tr`
	padding: 8px;
	height: 100px;
	border: 1px solid gray;
	border-left: none;
	border-right: none;

	&:nth-of-type(even) {
		background: #ededed;
	}

	&:hover {
		background: white;
	}
`;

const Button = styled.button`
	align-items: center;
	background-clip: padding-box;
	background-color: orange;
	border: 1px solid transparent;
	border-radius: 0.25rem;
	box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
	box-sizing: border-box;
	color: #fff;
	cursor: pointer;
	display: inline-flex;
	font-family: system-ui, -apple-system, system-ui, 'Helvetica Neue', Helvetica,
		Arial, sans-serif;
	font-size: 16px;
	font-weight: 600;
	justify-content: center;
	line-height: 1.25;
	margin: 0;
	min-height: 3rem;
	padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
	position: relative;
	text-decoration: none;
	transition: all 250ms;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	vertical-align: baseline;
	width: auto;
`;

/**
 * Displays the selected printers and their properties.
 */
export const PrinterTable: React.FC<PrinterTableProps> = ({
	printers,
	rows,
	onHide,
}) => {
	/**
	 * Maps the printer property either to a text or to a button.
	 *
	 * @param printer Printer to map the property of
	 * @param property Property to be mapped
	 *
	 * @returns Component to be displayed in the table.
	 */
	const mapProperty = (
		printer: Printer,
		property: keyof Printer
	): React.ReactNode => {
		if (typeof printer[property] !== 'boolean') {
			return printer[property];
		}

		if (!printer[property]) {
			return null;
		}

		return (
			<Button>{property === 'builtPrinter' ? 'Built Printer' : 'DIY'}</Button>
		);
	};

	return (
		<Table>
			<tbody>
				{rows.map((row, index) => (
					<Row key={index}>
						<RowHeading align='left'>{row[1]}</RowHeading>

						<th align='left'>
							<Clickable>
								<FontAwesomeIcon icon={faEye} onClick={() => onHide(row)} />
							</Clickable>
						</th>

						{printers.map((printer, printerIndex) => (
							<td key={`${index}-${printerIndex}`}>
								{mapProperty(printer, row[0] as keyof Printer)}
							</td>
						))}
					</Row>
				))}
			</tbody>
		</Table>
	);
};
