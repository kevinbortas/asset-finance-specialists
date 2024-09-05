import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SubForm from "./SubForm";

export default function Application() {

  const hello = "Testing CI_CD Pipeline";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    companyName: "",
    companyAddress: "",
    income: "",
    expenses: [],
    assets: [],
    liabilities: [],
    loanAmount: "",
    applicationReason: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  // Fetches application from MongoDB Database is using Edit
  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/application/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const application = await response.json();
      if (!application) {
        console.warn(`Application with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(application);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        // Creating new application
        response = await fetch("http://localhost:5050/application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        // updating exisiting application using ID
        response = await fetch(`http://localhost:5050/application/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ name: "", position: "", level: "" });
      navigate("/");
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Asset Finance Application</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden py-4 px-20"
      >
        <div className="grid grid-cols-3 gap-x-36 gap-y-4">
        <div>First & Last name</div>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">          
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => updateForm({ firstName: e.target.value })}
          />
        </div>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">          
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => updateForm({ lastName: e.target.value })}
          />
        </div>
        <div>
          E-mail
        </div>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">          
          <input
            type="text"
            name="email"
            id="email"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="john.smith@email.com"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="col-start-1">
          Mobile
        </div>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">          
          <input
            type="text"
            name="mobile"
            id="mobile"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="+61..."
            value={form.mobile}
            onChange={(e) => updateForm({ mobile: e.target.value })}
          />
        </div>
        <div className="col-start-1">
        </div>
        <div className="col-start-1">
          Company Name
        </div>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">          
          <input
            type="text"
            name="companyName"
            id="companyName"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="ABC PTY LTD"
            value={form.companyName}
            onChange={(e) => updateForm({ companyName: e.target.value })}
          />
        </div>
        <div className="col-start-1">
          Company Address
        </div>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">          
          <input
            type="text"
            name="companyAddress"
            id="companyAddress"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="John Smith Street, Sydney, NSW"
            value={form.companyAddress}
            onChange={(e) => updateForm({ companyAddress: e.target.value })}
          />
        </div>
        <div className="col-start-1">
          Income (yearly)
        </div>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">          
          <input
            type="text"
            name="income"
            id="income"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="10000"
            value={form.income}
            onChange={(e) => updateForm({ income: e.target.value })}
          />
        </div>
        <div className="col-start-1">
          Expenses
        </div>
        <div className="flex col-span-2">        
          <SubForm
            type="expense"
            existingForm={form.expenses}
            updateFormCallback={updateForm}
          />
        </div>

        <div className="col-start-1">
          Assets
        </div>
        <div className="flex col-span-2">        
          <SubForm
            type="asset" 
            existingForm={form.assets}
            updateFormCallback={updateForm} 
          />
        </div>

        <div className="col-start-1">
          liabilities
        </div>
        <div className="flex col-span-2">        
          <SubForm
            type="liability"
            existingForm={form.liabilities}
            updateFormCallback={updateForm} 
          />
        </div>

        <div className="col-start-1">

        </div>
        <div className="col-start-1">
          Loan Amount
        </div>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">          
          <input
            type="text"
            name="loanAmount"
            id="loanAmount"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="10000"
            value={form.loanAmount}
            onChange={(e) => updateForm({ loanAmount: e.target.value })}
          />
        </div>
        <div className="col-start-1">
          Reason For Application
        </div>
          <div className="flex col-span-2 rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">          
          <textarea
            type="text"
            name="applicationReason"
            id="applicationReason"
            className="block h-32 flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="This loan will help us to..."
            value={form.applicationReason}
            onChange={(e) => updateForm({ applicationReason: e.target.value })}
          />
        </div>
      </div>
        <input
          type="submit"
          value="Submit Finance Application"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}