// The below import defines which components come from formik
// import { Field, Form, Formik } from 'formik';

import {
  Button, FormControl, FormLabel, Input
} from "@chakra-ui/react";
import { useState } from "react";
import createThing from "../services/createThing";

export default function CreateForm() {
  const [name, setName] = useState("");

  return (
    <>
      <FormControl>
        <FormLabel>First name</FormLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={() => createThing({ name })}>
        Submit
      </Button>
    </>
  );
}
