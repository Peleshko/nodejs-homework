const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, "./db/contacts.json"),
    "utf-8"
  );
  const result = JSON.parse(content);
  return result;
};

async function listContacts() {
  return await readContent();
}

async function getContactById(contactId) {
  const contacts = await readContent();
  const result = contacts.find((c) => c.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const contacts = await readContent();
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index == -1) {
    return null;
  }
  const [removeContact] = contacts.splice(index, 1);
  await fs.writeFile(
    path.join(__dirname, "./db/contacts.json"),
    JSON.stringify(contacts)
  );
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await readContent();
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "./db/contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
