import React, { useState, useEffect } from 'react';

function useHelloWorld(): [
  string,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [helloWorld, setHelloWorld] = useState('');
  useEffect(() => {
    setHelloWorld('Hello World!');
  }, []);
  return [helloWorld, setHelloWorld];
}

export default useHelloWorld;
