import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Component() {
  const [formValues, setFormValues] = useState([
    { name: '', email: '', username: '' },
  ]);

  //router
  const router = useRouter();

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: '', email: '', username: '' }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    try {
      event.preventDefault();
      // JSON.stringify(formValues);
      console.log(formValues);

      axios.post(`http://localhost:8000/api/addUser`, {
        formValues,
      });
      router.push('/users');
    } catch (error) {
      console.log(error);
      alert(JSON.stringify('error'));
    }
  };

  return (
    <div className="flex justify-evenly w-full">
      <form className="" onSubmit={handleSubmit}>
        {formValues.map((element, index) => (
          <div className="">
            <div className="flex flex-row p-6" key={index}>
              <div className="flex flex-row p-3">
                <label className="m-4">Name</label>
                <input
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-600 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="text"
                  name="name"
                  value={element.name || ''}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="flex flex-row p-3">
                <label className="m-4">Email</label>
                <input
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-600 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="text"
                  name="email"
                  value={element.email || ''}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="flex flex-row p-3">
                <label className="m-4">Username</label>
                <input
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-600 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="text"
                  name="username"
                  value={element.username || ''}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              {index ? (
                <button
                  type="button"
                  className="px-4 py-1 font-semibold rounded-md bg-red-600 text-black-800"
                  onClick={() => removeFormFields(index)}
                >
                  Remove
                </button>
              ) : (
                <button
                  type="button"
                  className="px-4 py-1 font-semibold rounded-md bg-red-600 text-black-800"
                  onClick={() => removeFormFields(index)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="">
          <div className=" flex justify-center">
            <button
              className="m-4 px-8 py-3 font-semibold rounded-full bg-green-500 text-black-800"
              type="button"
              onClick={() => addFormFields()}
            >
              Add
            </button>
            <button
              className="m-4 px-8 py-3 font-semibold rounded-full bg-blue-600 text-black-800"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
