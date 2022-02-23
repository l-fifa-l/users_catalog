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
    <form onSubmit={handleSubmit}>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={element.name || ''}
            onChange={(e) => handleChange(index, e)}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={element.email || ''}
            onChange={(e) => handleChange(index, e)}
          />
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={element.username || ''}
            onChange={(e) => handleChange(index, e)}
          />
          {index ? (
            <button
              type="button"
              className="button remove"
              onClick={() => removeFormFields(index)}
            >
              Remove
            </button>
          ) : null}
        </div>
      ))}

      <div className="button-section">
        <button
          className="button add"
          type="button"
          onClick={() => addFormFields()}
        >
          Add
        </button>
        <button className="button submit" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
