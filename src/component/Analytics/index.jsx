import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import axios from '../../api/AxiosInstance';
import { covidAPIs } from '../../api';

import MainNavbar from '../../assets/components/MainNavbar';
import MobileNavbar from '../../assets/components/MobileNavbar';

import './analytics.scss';

const Analytics = props => {
  const [results, setResults] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [days, setDays] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);

  const { pathname } = props.location;
  const token = localStorage.getItem("covid19_token")

  useEffect(() => {
    // Redirects to login if user is not logged in
    !token && props.history.push("/login");

    (async function() {
      const config = { 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        } 
      };

      setLoading(true);

      try {
        const response = await axios.get(covidAPIs.result, config);
        setResults(response.data);
        setDays(response.data[0].questionId.day);
        setApiError(false);

        // get analytics days
        computeDays(response.data);

        setLoading(false);
      } catch (error) {
        setApiError(true);
        setLoading(false);

        return error.response;
      }
    })();
  }, [props, token]);

  const computeDays = theArr => {
    for (let i = 0; i < theArr.length; i++) {
      setDays(arr => [...arr, theArr[i].questionId.day]);
      setScores(arr => [...arr, theArr[i].trackerId.score]);
    };
  };

  const uniqueDays = [...new Set(days)];
  const uniqueScore = [...new Set(scores)];
  let mapData = [];

  for (let i = 0; i < uniqueScore.length; i++) {
    const element = uniqueScore[i];
    mapData.push({name: `Day ${i + 1}`, score: element, pv: 10, amt: 10});
  }

  const renderLineChart = (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={600} height={300} data={mapData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="score" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="dashboard">
      <div className='dashboard-navbar'>
        <MainNavbar page={pathname} />
      </div>
      {apiError ? (
        <div className="analytics">
          <p>Sorry the analytics page cannot be displayed at the moment, please try again later.</p>
        </div>
      ) : (
        <div className="analytics">
          {loading ? (
            <div className="analytics-graph-content">
              <div className="graph-skeleton"></div>
            </div>
          ) : (
            <div className="analytics-graph-content">
              <div className="analytics-graph-content-line">
                {renderLineChart}
              </div>
              <div className="analytics-graph-legend">
                <p className="analytics-graph-header">Score Symptom</p>
                <p><span className="analytics-mild">Mild</span> 0 - 3.5</p>
                <p><span className="analytics-moderate">Moderate</span> 4 - 7.5</p>
                <p><span className="analytics-severe">Severe</span> 8 - 10</p>
              </div>
            </div>
          )}
          <div className="analytics-content">
            <div className="analytics-content-header">
              <h3>analytics Result</h3>
            </div>
            <div className="analytics-content-body">
              {loading ? (
                <div className="result-skeleton">
                  <div className="result-skeleton-header"></div>
                  <div className="result-skeleton-row"></div>
                  <div className="result-skeleton-row"></div>
                  <div className="result-skeleton-row"></div>
                  <div className="result-skeleton-row"></div>
                  <div className="result-skeleton-row"></div>
                  <div className="result-skeleton-row"></div>
                </div>
              ) : (
                uniqueDays.map((item, index) => {
                  return (
                    <div className="analytics-content-days" key={index}>
                      <div className="analytics-content-days-header">
                        <h4>Day: {item}</h4>
                      </div>
                      {results.map((result, resultIndex) => {
                        return result.questionId.day === item && (
                          <div className="analytics-content-row" key={resultIndex}>
                            <p className="analytics-question"><span>Q: </span>{result.questionId.question}</p>
                            <p><span>A: </span>{result.feedback}</p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
      <div className="dashboard-mobile-nav">
        <MobileNavbar page={pathname} />
      </div>
    </div>
  );
};

export default Analytics;
