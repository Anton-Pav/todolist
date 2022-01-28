import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './Button';
import AddItemForm from "../AddItemForm";
import {Primary} from "./Button.stories";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import {TaskType} from "../Todolist";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolists/Task',
    component: Task,
    args: {
      changeTaskStatus: action('change status'),
      changeTaskTitle: action('change title'),
      removeTask: action('task removed'),
      todolistId: '12'
    }
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
  task: {id: 'q', title: 'TS', isDone: true}
}

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
  task: {id: 'q', title: 'JS', isDone: false}
}