import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Button } from './Button';

export default { component: Button } as ComponentMeta<typeof Button>; // コンポーネント指定
export const Primary: ComponentStoryObj<typeof Button> = {};
export const Secondary: ComponentStoryObj<typeof Button> = {
  args: { primary: false },
};
