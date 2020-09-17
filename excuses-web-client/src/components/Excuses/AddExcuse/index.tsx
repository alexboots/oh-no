import React from 'react';
import { Card, Box, InputField, FieldStack } from 'bumbag';

export const AddExcuse = () => {
  const hi = (val: any) => {
    console.log('val', val.target.value);
  }
  return(
    <Box alignX="center" marginY="xl">
      <Card width="30rem">
        <FieldStack>
          <InputField label="Name" />
          <InputField label="Description" />
          <InputField label="Image" type="file" onChange={(val: any) => hi(val)}/>
          <input onChange={(val: any) => hi(val)} type="file" />
        </FieldStack>
      </Card>
    </Box>
  );
}