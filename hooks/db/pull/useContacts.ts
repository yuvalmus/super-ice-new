import { useState, useEffect } from "react";
import database from "@/db";
import { Contact as ContactModel } from "@/models/Contact";
import { Contact as ContactDB } from "@/db/models";

export const transformContactToModel = (contactDB: ContactDB): ContactModel => {
  return {
    id: contactDB.id,
    customerId: contactDB.customerId,
    name: contactDB.name,
    phone: contactDB.phone,
  };
};

export const useContactModels = () => {
  const contacts = useContacts();

  return contacts.map(transformContactToModel);
};

export const useContacts = () => {
  const [contacts, setContacts] = useState<ContactDB[]>([]);

  useEffect(() => {
    const query = database.get<ContactDB>("contacts").query();

    const subscription = query
      .observe()
      .subscribe((newContacts: ContactDB[]) => {
        setContacts(newContacts);
      });

    return () => subscription.unsubscribe();
  }, []);

  return contacts;
};
