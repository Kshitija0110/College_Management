import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { getSubject } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);


const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const attendance = useSelector((state) => state.student.attendance.result);

  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);

  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const subjects = useSelector((state) => state.admin.subjects.result);

  useEffect(() => {
    if (subjects?.length !== 0) setLoading(false);
  }, [subjects]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const prepareChartData = () => {
    if (!attendance) return null;
    
    // Pie chart data
    const pieData = {
      labels: attendance.map(item => item.subjectName),
      datasets: [
        {
          label: 'Attendance Percentage',
          data: attendance.map(item => parseFloat(item.percentage)),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(199, 199, 199, 0.6)',
            'rgba(83, 102, 255, 0.6)',
            'rgba(78, 252, 153, 0.6)',
            'rgba(255, 89, 132, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)',
            'rgba(83, 102, 255, 1)',
            'rgba(78, 252, 153, 1)',
            'rgba(255, 89, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    // Bar chart data
    const barData = {
      labels: attendance.map(item => item.subjectName),
      datasets: [
        {
          label: 'Attended',
          data: attendance.map(item => item.attended),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Total',
          data: attendance.map(item => item.total),
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };

    return { pieData, barData };
  };

  // Chart options
  const pieOptions = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Attendance Percentage by Subject',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const barOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Attendance Comparison',
        font: {
          size: 16
        }
      }
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    maintainAspectRatio: false,
  };

  const chartData = attendance && attendance.length > 0 ? prepareChartData() : null;


  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <MenuBookIcon />
          <h1>All Subjects</h1>
        </div>
        <div className=" mr-10 bg-white rounded-xl pt-6 pl-6 h-[29.5rem]">
          <div className="col-span-3 mr-6">
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {error.noSubjectError && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noSubjectError}
                </p>
              )}
            </div>

            {/* Charts Section */}
            {!loading && attendance && attendance.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div style={{ height: '300px' }}>
                    {chartData && <Pie data={chartData.pieData} options={pieOptions} />}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div style={{ height: '300px' }}>
                    {chartData && <Bar data={chartData.barData} options={barOptions} />}
                  </div>
                </div>
              </div>
            )}


            {/* Attendance Status Summary */}
            {!loading && attendance && attendance.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Attendance Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {attendance.map((subject, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-lg shadow-md border-l-4 ${
                        parseFloat(subject.percentage) >= 75 
                          ? 'border-green-500 bg-green-50' 
                          : parseFloat(subject.percentage) >= 60
                            ? 'border-yellow-500 bg-yellow-50'
                            : 'border-red-500 bg-red-50'
                      }`}
                    >
                      <h3 className="font-bold text-gray-700">{subject.subjectName}</h3>
                      <p className="text-sm text-gray-600">Code: {subject.subjectCode}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-sm">
                          {subject.attended}/{subject.total} classes
                        </span>
                        <span className={`font-bold text-lg ${
                          parseFloat(subject.percentage) >= 75 
                            ? 'text-green-600' 
                            : parseFloat(subject.percentage) >= 60
                              ? 'text-yellow-600'
                              : 'text-red-600'
                        }`}>
                          {subject.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!loading &&
              Object.keys(error).length === 0 &&
              subjects?.length !== 0 && (
                <div className={classes.adminData}>
                  <div className="grid grid-cols-8">
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Sr no.
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Subject Code
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-2`}>
                      Subject Name
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-2`}>
                      Attended
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Total
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Percentage
                    </h1>
                  </div>
                  {attendance?.map((res, idx) => (
                    <div
                      key={idx}
                      className={`${classes.adminDataBody} grid-cols-8`}>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {idx + 1}
                      </h1>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {res.subjectCode}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}>
                        {res.subjectName}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}>
                        {res.attended}
                      </h1>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {res.total}
                      </h1>
                      <h1
                        className={`col-span-1 ${
                          parseFloat(res.percentage) >= 75
                            ? 'text-green-600 font-bold'
                            : parseFloat(res.percentage) >= 60
                            ? 'text-yellow-600 font-bold'
                            : 'text-red-600 font-bold'
                        } ${classes.adminDataBodyFields}`}
                      >
                        {res.percentage}%
                      </h1>
                    </div>
                  ))}
                </div>
                 )}
                {(!attendance || attendance.length === 0) && !loading && (
                  <div className="text-center py-10">
                    <p className="text-xl text-gray-500">No attendance records found.</p>
                  </div>
                )}
              </div>
        </div>
      </div>
    </div>
  );
};

export default Body;


