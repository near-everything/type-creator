// The below import defines which components come from formik
// import { Field, Form, Formik } from 'formik';

import { Button, Checkbox, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import signCard from "../services/signCard";

export default function CreateForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [consent, setConsent] = useState(false);

  return (
    <>
      <FormControl>
        <FormLabel>First name</FormLabel>
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="first name"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Last name</FormLabel>
        <Input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="last name"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Phone</FormLabel>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="phone"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Sponsor</FormLabel>
        <Input
          value={sponsor}
          onChange={(e) => setSponsor(e.target.value)}
          placeholder="sponsor"
        />
      </FormControl>
        <Checkbox
        isChecked={consent}
        onChange={(e) => setConsent(e.target.checked)}
      >
        Consent
      </Checkbox>
      <Button
        mt={4}
        colorScheme="teal"
        onClick={() =>
          signCard({ firstName, lastName, email, phone, sponsor, consent })
        }
      >
        Submit
      </Button>
    </>
  );
}
