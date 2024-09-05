/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const SubForm = ({ type, existingForm, updateFormCallback }) => {
  const typeCapitalized = type[0].toUpperCase() + type.slice(1)
  
  const [form, setForm] = useState(existingForm);

  const addFormRow = () => {
    setForm([...form, { title: "", type: "", date: "", amount: "" }]);
  };

  const removeFormRow = () => {
    setForm(form.slice(0, -1));
  };

  useEffect(() => {
    switch(type) {
      case "expense":
        updateFormCallback({ expenses: form })
        break;
      case "asset":
        updateFormCallback({ assets: form })
        break;
      case "liability":
        updateFormCallback({ liabilities: form })
        break;
    }
  }, [form])

  useEffect(() => {
    console.log(existingForm)
    setForm(existingForm);
  }, [existingForm])

  return (
    <div className="grid grid-cols-3 gap-y-4 gap-x-10 overflow-hidden w-full">
      {form.length
        ? 
        <table className="w-full col-span-3 caption-bottom text-sm border-separate border-spacing-y-4">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                {typeCapitalized} Title
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                {typeCapitalized} Type
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                {typeCapitalized} Date
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                {typeCapitalized} Amount
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
          {form.map((field, index) => (
          <tr key={index}>
            <td>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">  
                <input
                  type="text"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                  value={field.title}
                  onChange={(e) =>
                    setForm(
                      form.map((r, i) =>
                        i === index ? { ...r, title: e.target.value } : r
                      )
                    )
                  }
                />
              </div>
            </td>
            <td>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">  
                <input
                  type="text"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                  value={field.type}
                  onChange={(e) =>
                    setForm(
                      form.map((r, i) =>
                        i === index ? { ...r, type: e.target.value } : r
                      )
                    )
                  }
                />
              </div>
            </td>
            <td>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">  
                <input
                  type="text"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                  value={field.date}
                  onChange={(e) =>
                    setForm(
                      form.map((r, i) =>
                        i === index ? { ...r, date: e.target.value } : r
                      )
                    )
                  }
                />
              </div>
            </td>
            <td>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">          
                <input
                  type="text"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                  value={field.amount}
                  onChange={(e) =>
                    setForm(
                      form.map((r, i) =>
                        i === index ? { ...r, amount: e.target.value } : r
                      )
                    )
                  }
                />
              </div>
            </td>
          </tr>
        ))}
          </tbody>
        </table>
        : null
      }
      <div className="col-start-1">
        <button
          name="addExpense"
          id="addExpense"
          className="w-full inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
          type="button"
          onClick={addFormRow}
        >
          Add {typeCapitalized}
        </button>
      </div>
      {form.length
      ? 
      <div className="col-start-2">
        <button
          name="removeExpense"
          id="removeExpense"
          className="w-full inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
          type="button"
          onClick={removeFormRow}
        >
          Remove {typeCapitalized}
        </button>
      </div>
      : null
    }
    </div>
  );
};

export default SubForm;