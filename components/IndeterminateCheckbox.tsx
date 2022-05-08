import React, { useEffect, useRef, useState } from 'react';

export type IndeterminateCheckboxProps = {
	state: boolean | undefined;
	onChange: (value: boolean | undefined) => void;
	name: string;
	label: string;
};

/**
 * Since the filters for the table can be set to true/false/undefined, a normal checkbox is not enough.
 * The indeterminate checkbox seems like the most elegant solution that provides three different states.
 */
export const IndeterminateCheckbox: React.FC<IndeterminateCheckboxProps> = ({
	state,
	onChange,
	name,
	label,
}) => {
	const ref = useRef<HTMLInputElement>(null);

	// Starts in the indeterminate state
	useEffect(() => {
		if (ref && ref.current) {
			ref.current.indeterminate = true;
		}
	}, []);

	/**
	 * Handles the state change of the indeterminate checkbox.
	 *
	 * @param e Checkbox onChange event
	 */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newState = e.target.checked;

		// Changes to indeterminate on switch from checked to unchecked
		if (ref && ref.current) {
			ref.current.indeterminate = !state && state !== undefined;
		}

		onChange(ref.current?.indeterminate ? undefined : newState);
	};

	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input
				type='checkbox'
				name={name}
				ref={ref}
				checked={state ?? false}
				onChange={handleChange}
			/>
		</div>
	);
};
