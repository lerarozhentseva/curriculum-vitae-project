import React, { useState, useEffect } from 'react';
import { IDepartment } from '@interfaces/IDepartment';
import { IPosition } from '@interfaces/IPosition';
import { IUser } from '@interfaces/IUser';
import { useProfileData } from '@pages/ProfilePage/hooks';
import { IFormInput } from '@graphql/user/IFormInput';

interface IUseProfileForm {
  user?: IUser;
  onSubmit: (data: IFormInput) => void;
  initialDepartment?: IDepartment;
  initialPosition?: IPosition;
}

const useFormSendProfile = ({
  user,
  onSubmit,
  initialDepartment,
  initialPosition
}: IUseProfileForm) => {
  const { departmentsData, positionsData } = useProfileData();
  const [firstName, setFirstName] = useState(user?.profile.first_name || '');
  const [lastName, setLastName] = useState(user?.profile.last_name || '');
  const [department, setDepartment] = useState(initialDepartment?.id || user?.department?.id || '');
  const [position, setPosition] = useState(initialPosition?.id || user?.position?.id || '');

  useEffect(() => {
    setFirstName(user?.profile.first_name || '');
    setLastName(user?.profile.last_name || '');
    setDepartment(initialDepartment?.id || user?.department?.id || '');
    setPosition(initialPosition?.id || user?.position?.id || '');
  }, [user, initialDepartment, initialPosition]);

  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = { firstName, lastName, department, position };
    onSubmit(data);
  };

  return {
    handleSubmit,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    department,
    setDepartment,
    position,
    setPosition,
    departmentsData,
    positionsData
  };
};

export default useFormSendProfile;
