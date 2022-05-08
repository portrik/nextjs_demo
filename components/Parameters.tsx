import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { Rows } from '../types/Rows';
import styled from 'styled-components';

export type ParametersProps = {
	parameters: [keyof Rows, Rows][];
	onParametersChange: (parameter: [keyof Rows, Rows][]) => void;
};

const Clickable = styled.span`
	cursor: pointer;
`;

const Table = styled.table`
	width: 100%;
`;

/**
 * Displays the hidden parameters and handles their removal from the hidden list.
 */
export const Parameters: React.FC<ParametersProps> = ({
	parameters,
	onParametersChange,
}) => {
	const handleChange = (parameter: [keyof Rows, Rows]) => {
		const newParameters = [...parameters];
		const index = newParameters.findIndex((p) => p[0] === parameter[0]);
		newParameters.splice(index, 1);
		onParametersChange(newParameters);
	};

	return (
		<div>
			<h3>Hidden Parameters:</h3>

			<Table>
				<tbody>
					{parameters.map((parameter, index) => (
						<tr key={index}>
							<td>{parameter[1]}</td>

							<td>
								<Clickable>
									<FontAwesomeIcon
										icon={faXmark}
										onClick={() => handleChange(parameter)}
									/>
								</Clickable>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};
