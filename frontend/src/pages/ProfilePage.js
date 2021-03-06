import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProfileContainer from '../containers/profile/ProfileContainer';

const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>ProfilePage | 100moon1ta</title>
      </Helmet>
      <ProfileContainer />
    </>
  );
};

export default ProfilePage;
