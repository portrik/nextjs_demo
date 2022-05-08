import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import type { Printer } from '../types/Printer';

import { ParametersProps, Parameters } from './Parameters';
import { IndeterminateCheckbox } from './IndeterminateCheckbox';

export type ControlsProps = ParametersProps & {
	printers: Printer[];
	onChange: (printers: Printer[]) => void;
};

const ControlsWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-content: center;
	padding: 16px;
`;

const Filters = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	min-height: 20%;
`;

/**
 * Controls handle the filtering of available printers.
 */
export const Controls: React.FC<ControlsProps> = ({
	printers,
	onChange,
	parameters,
	onParametersChange,
}) => {
	const [diy, setDiy] = useState<boolean | undefined>(undefined);
	const [built, setBuilt] = useState<boolean | undefined>(undefined);

	// Filters the printer list when the filters or the printer list change.
	useEffect(() => {
		let newPrinters = [...printers];

		if (diy !== undefined) {
			newPrinters = newPrinters.filter((printer) => printer.diyKit === diy);
		}

		if (built !== undefined) {
			newPrinters = newPrinters.filter(
				(printer) => printer.builtPrinter === built
			);
		}

		onChange(newPrinters);
	}, [printers, diy, built, onChange]);

	return (
		<ControlsWrapper>
			<Filters>
				<h3>Filters</h3>

				<IndeterminateCheckbox
					name='diy'
					label='DIY Kit'
					onChange={(value) => setDiy(value)}
					state={diy}
				/>

				<IndeterminateCheckbox
					name='built'
					label='Built Printer'
					onChange={(value) => setBuilt(value)}
					state={built}
				/>
			</Filters>

			<Parameters
				parameters={parameters}
				onParametersChange={onParametersChange}
			/>
		</ControlsWrapper>
	);
};
