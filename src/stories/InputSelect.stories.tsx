import React from 'react';

import InputSelectField from '../components/Input/InputSelectField';

export default {
  title: 'InputSelect',
  component: InputSelectField
};

const departmentData = [
  {
    id: 1,
    name: 'No Department'
  },
  {
    id: 2,
    name: '.Net Department'
  },
  {
    id: 3,
    name: 'Quality Department'
  },
  {
    id: 4,
    name: 'Unit 1 (JavaScript)'
  },
  {
    id: 5,
    name: 'Unit 2 (Python)'
  }
];

const positionData = [
  {
    id: 6,
    name: 'No Position'
  },
  {
    id: 7,
    name: 'Network and Computer Systems Administartor'
  },
  {
    id: 8,
    name: 'Quality Assurance Engineer'
  },
  {
    id: 9,
    name: 'Software Development Engineer'
  },
  {
    id: 10,
    name: 'Project Manager'
  }
];

export const InputSelectDepartment = () => (
  <InputSelectField data={departmentData} label="Department"></InputSelectField>
);
export const InputSelectPosition = () => (
  <InputSelectField data={positionData} label="Position"></InputSelectField>
);
