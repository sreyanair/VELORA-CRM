import { useState } from "react";

export default function LeadForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);

    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "New",
      notes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <button type="submit">
        Add Lead
      </button>
    </form>
  );
}