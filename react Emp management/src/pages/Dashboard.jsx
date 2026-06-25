import React, { useState, useEffect } from 'react';
import api from '../api';
import Chart from 'react-apexcharts';
import { Users, UserCheck, Briefcase } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-900/5 transition-transform duration-300">
    <div className="flex items-center gap-4">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get('/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees for dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }


  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const departments = [...new Set(employees.map(e => e.department))];

  const deptCountData = departments.map(dept =>
    employees.filter(e => e.department === dept).length
  );


  const statusData = [
    activeEmployees,
    totalEmployees - activeEmployees
  ];


  const barChartOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, horizontal: false } },
    dataLabels: { enabled: false },
    xaxis: { categories: departments },
    colors: ['#4f46e5'],
    title: { text: 'Department-wise Count', align: 'left', style: { fontSize: '16px', fontWeight: 600, color: '#111827' } }
  };

  const barChartSeries = [{ name: 'Employees', data: deptCountData }];

  const pieChartOptions = {
    chart: { type: 'donut' },
    labels: ['Active', 'Inactive'],
    colors: ['#10b981', '#f43f5e'],
    title: { text: 'Employee Status Distribution', align: 'left', style: { fontSize: '16px', fontWeight: 600, color: '#111827' } },
    legend: { position: 'bottom' }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Key metrics and analytics of your employees.</p>
      </div>


      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={Users}
          colorClass="bg-indigo-100 text-indigo-600"
        />
        <StatCard
          title="Active Employees"
          value={activeEmployees}
          icon={UserCheck}
          colorClass="bg-emerald-100 text-emerald-600"
        />
        <StatCard
          title="Departments"
          value={departments.length}
          icon={Briefcase}
          colorClass="bg-amber-100 text-amber-600"
        />
      </div>


      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-900/5">
          <Chart options={barChartOptions} series={barChartSeries} type="bar" height={350} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-900/5">
          <Chart options={pieChartOptions} series={statusData} type="donut" height={350} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
