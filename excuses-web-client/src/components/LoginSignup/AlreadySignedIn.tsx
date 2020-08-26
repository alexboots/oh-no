import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'bumbag';

export const AlreadySignedIn = () => {
  return(
    <Container>
      You are already signed in. Go <Link to="/">Home</Link>.
    </Container>
  );
};