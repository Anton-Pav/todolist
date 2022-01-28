import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';
import AddItemForm from "../AddItemForm";
import {Primary} from "./Button.stories";
import {action} from "@storybook/addon-actions";
import AppWitnRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Todolists/AddItemForm',
  component: AppWitnRedux,
  decorators: [ReduxStoreProviderDecorator]

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof AppWitnRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWitnRedux> = (args) => <AppWitnRedux />;

export const AppWitnReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppWitnReduxStory.args = {};
