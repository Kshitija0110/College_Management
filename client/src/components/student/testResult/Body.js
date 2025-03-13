import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { getSubject } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS, TEST_RESULT } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const testResult = useSelector((state) => state.student.testResult.result);

  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const subjects = useSelector((state) => state.admin.subjects.result);
  const [search, setSearch] = useState(false);

  console.log(error);
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    // Fetch subjects if not already loaded
    if (!subjects || subjects.length === 0) {
      dispatch(getSubject());
    }
  }, [subjects, dispatch]);
  
  // useEffect(() => {
  //   // Fetch subjects if not already loaded
  //   if (!subjects || subjects.length === 0) {
  //     dispatch(getSubject());
  //   } else {
  //     setLoading(false);
  //   }
  // }, [subjects, dispatch]);

  useEffect(() => {
    // Set loading to false when testResult is loaded
    if (testResult !== undefined) {
      setLoading(false);
    }
  }, [testResult]);

  // useEffect(() => {
  //   dispatch({ type: TEST_RESULT, payload: {} });
  // }, [dispatch]);
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);
  
  // Add this to Body.js in the testResult component
console.log("Test Results:", testResult);
  return (
    // Add this to Body.js in the testResult component
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
                      Test
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Marks Obtained
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Total Marks
                    </h1>
                  </div>
                {testResult?.map((res, idx) => (
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
                      {res.test}
                    </h1>
                    <h1
                      className={`col-span-1 ${classes.adminDataBodyFields}`}>
                      {res.marks}
                    </h1>
                    <h1
                      className={`col-span-1 ${classes.adminDataBodyFields}`}>
                      {res.totalMarks}
                    </h1>
                  </div>
                ))}
                {!loading && !testResult?.length && (
                  <div className="text-center py-10">
                    <p className="text-xl text-gray-500">No test results found. Your instructors haven't uploaded any marks yet.</p>
                  </div>
                )}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
