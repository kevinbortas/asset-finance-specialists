import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Application Table Values
const Application = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.application.firstName}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.application.lastName}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.application.email}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.application.companyName}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.application.loanAmount}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      In Progress
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.application._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteApplication(props.application._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function applicationList() {
  const [applications, setApplications] = useState([]);

  // Fetche applications from MongoDB database.
  useEffect(() => {
    async function getApplications() {
      const response = await fetch(`http://localhost:5050/application/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const applications = await response.json();
      setApplications(applications);
    }
    getApplications();
    return;
  }, [applications.length]);

  // Deletes Application
  async function deleteApplication(id) {
    await fetch(`http://localhost:5050/application/${id}`, {
      method: "DELETE",
    });
    const newApplications = applications.filter((el) => el._id !== id);
    setApplications(newApplications);
  }

  // Maps applications on the table
  function applicationList() {
    return applications.map((application) => {
      return (
        <Application
          application={application}
          deleteApplication={() => deleteApplication(application._id)}
          key={application._id}
        />
      );
    });
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Finance Applications</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  First Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Last Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  E-mail
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Company Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Loan Amount
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Application Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {applicationList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}