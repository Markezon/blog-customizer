import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton, OnClick } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	render: () => {
		const handleClick: OnClick = () => {
			console.log('Button clicked');
		};
		return (
			<>
				<ArrowButton isOpen={false} onClick={handleClick} />
			</>
		);
	},
};
