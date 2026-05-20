import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

type Employee = {
  _id: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  employmentStatus: string;
  employmentType: string;
  hoursPerWeek: number;
};

const API_URL = 'http://localhost:3010';

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    startDate: '2026-05-20',
    employmentStatus: 'Active',
    employmentType: 'Full-time',
    hoursPerWeek: 40,
    departments: 'Engineering',
    titles: 'Developer',
  });

  async function fetchEmployees() {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get<Employee[]>(`${API_URL}/employees`);
      setEmployees(response.data);
    } catch {
      setError('Unable to load employees.');
    } finally {
      setIsLoading(false);
    }
  }

  async function createEmployee(event: React.FormEvent) {
    event.preventDefault();
    setError('');

    try {
      await axios.post(`${API_URL}/employees`, {
        ...form,
        hoursPerWeek: Number(form.hoursPerWeek),
        departments: form.departments.split(',').map((item) => item.trim()),
        titles: form.titles.split(',').map((item) => item.trim()),
      });

      await fetchEmployees();
    } catch (error: any) {
      setError(error.response?.data?.message ?? 'Unable to create employee.');
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <main>
      <h1>SES Employee Directory</h1>

      <form onSubmit={createEmployee}>
        <input placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        <input placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        <input placeholder="Work email" value={form.workEmail} onChange={(e) => setForm({ ...form, workEmail: e.target.value })} />
        <button type="submit">Create employee</button>
      </form>

      {isLoading && <p>Loading employees...</p>}
      {error && <p className="error">{error}</p>}

      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            <strong>{employee.firstName} {employee.lastName}</strong> — {employee.workEmail} — {employee.employmentType}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;