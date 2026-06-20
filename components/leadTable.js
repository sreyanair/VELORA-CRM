import API from "../services/api";

export default function LeadTable({
  leads,
  refresh,
}) {
  const deleteLead = async (id) => {
    await API.delete(`/leads/${id}`);

    refresh();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Company</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {leads.map((lead) => (
          <tr key={lead._id}>
            <td>{lead.name}</td>
            <td>{lead.email}</td>
            <td>{lead.companyName}</td>

            <td>{lead.leadStatus}</td>

            <td>
              <button
                onClick={() =>
                  deleteLead(lead._id)
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}