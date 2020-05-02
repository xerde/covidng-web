import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import axios from '../../api/AxiosInstance';
import { covidAPIs } from '../../api';
import MainNavbar from '../../assets/components/MainNavbar';
import MobileNavbar from '../../assets/components/MobileNavbar';

import './assessment.scss';

const Assessment = props => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [formType, setFormType] = useState([]);
  const [questionId, setQuestionId] = useState([]);
  const [questionScore, setQuestionScore] = useState([]);
  const [trackerId, setTrackerId] = useState('');
  const [userScore, setUserScore] = useState([]);
  const [show, setShow] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const { pathname } = props.location;
  const token = localStorage.getItem("covid19_token");

  useEffect(() => {
    // Redirects to login if user is not logged in
    !token && props.history.push("/login");

    (async function() {
      setLoading(true);

      const config = { 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        } 
      };

      try {
        const response = await axios.get(covidAPIs.questions, config);

        setQuestions(response.data.length ? response.data[0] : response.data);
        setTrackerId(response.data.length ? response.data[1] : "");
        
        for (let i = 0; i < response.data[0].length; i++) {
          const anser = response.data[0][i].answer;
          const userAnser = response.data[0][i].answer;
          const questionType = response.data[0][i].formType;
          const questionId = response.data[0][i]._id;
          const questionScore = response.data[0][i].score;
          setAnswers(arr => [...arr, anser]);
          setUserAnswers(arr => [...arr, userAnser]);
          setFormType(arr => [...arr, questionType]);
          setQuestionId(arr => [...arr, questionId]);
          setQuestionScore(arr => [...arr, questionScore]);
        }

        setLoading(false);

      } catch (error) {
        setLoading(false);
        
        return error.response;
      }
    })();
  }, [token, props]);

  const handleChange = input => e => {
    let buff = userAnswers;
    buff[input] = e.target.value;
    setUserAnswers(buff);
  };

  const onSubmit = async () => {
    const token = localStorage.getItem("covid19_token");
    const userId = localStorage.getItem("c19assess_id");

    let buff = 0;
    const response = [];

    for (let i = 0; i < answers.length; i++) {
      buff = answers[i] === userAnswers[i] ? questionScore[i] + buff : 0 + buff;

      response.push({
        feedback: userAnswers[i],
        questionId: questionId[i],
        score: answers[i] === userAnswers[i] ? questionScore[i] : 0,
        userId,
        trackerId: trackerId[0].trackerId
      });
    }

    setUserScore(buff);

    const config = { 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      } 
    };

    setSubmitting(true);

    try {
      const res = await axios.post(covidAPIs.answer, { response }, config);

      setSubmitting(false);
      setSubmitError(false);

      handleShow();
    } catch (error) {
      setSubmitting(false);
      setSubmitError(true);
      return error.res;
    }
  };

  const handleShow = () => setShow(true);

  return (
    <div className="dashboard">
      <div className='dashboard-navbar'>
        <MainNavbar page={pathname} />
      </div>
      <Modal show={show}>
        <div className="result-modal">
          <h2>Assessment result</h2>
          <h3>
            Symthoms
            {" "}
            <span className={
              userScore < 3.6 ? "mild"
                : (userScore > 3.9 && userScore < 8)
                ? "moderate" : "severe"
            }>
              {userScore < 3.6 ? "Mild"
                : (userScore > 3.9 && userScore < 8)
                ? "Moderate" : "Severe" }
              </span>
          </h3>
          <h4>Recommendation</h4>
          {userScore < 3.6 && (<div>
            <p>Practice good personal hygiene such as regular hand washing; and the use of alchohol based hand sanitizers cannot be overemphasized.</p>
            <p>You may just be dehydrated or have a common cold.</p>
            <p>Try to get some rest.</p>
            <p>Make sure to drink lots of water and stay hydrated.</p>
            <p>Stay in a room that is properly ventiliated.</p>
            <p>Practice social disrtancing to protect yourself through out the entire period.</p>
            <p>Remember to heck you temperature every 2 days; and notify us if you notice any ew symptoms or don't get better after 3 - 5 days.</p>
            <p>The 14 days questionnaire is also available on the app to help track symptoms' progression.</p>
          </div>)}
          {(userScore > 3.9 && userScore < 8) && (<div>
            <p>Do not self medicate with Antibiotis!</p>
            <p>Continue to practice good personal hygiene including hand washing, and the use of sanitizers.</p>
            <p>Thoroughly wipe surfaces after contact and throw away the tissue.</p>
            <p>Make sure to drink lots of water and stay hydrated.</p>
            <p>Cough or sneeze into elbow.</p>
            <p>Wear a mask to protect yourself and others.</p>
            <p>Keep a social distance of at least 1 meter apasrt from people.</p>
            <p>Wash your hands thoroughly and avoid touching your nose, face and mouth.</p>
            <p>Take Tylenol for muscle aches and pains.</p>
            <p>You can boost immune system by taking 1000mg Vitamin C.</p>
            <p>Please notify us if dry cough lasts more than 7 days.</p>
            <p>Check temperature and notify us if fever progresses.</p>
            <p>The 14 day questionnaire is also available on the app to help track symptoms' progression.</p>
          </div>)}
          {(userScore > 7.9) && (<div>
            <p>If you are experiencing a persistent high fever, with accompanyinh cough and shortness of breath/difficuty breathing.</p>
            <p>You are required to contact the NCDC or the nearest COVID19 heathcare provider to get testes for the virus immediately or to have a test kit sent to you.</p>
            <p>Call a COVID 19 healthcare emergency hotline immediately severe difficulty in breathing and Hypoxia is Critical and Requires urgent need for a ventilator.</p>
          </div>)}

          <div className="form-button">
            <button onClick={() => props.history.push("/dashboard")}>Return to Dashboard</button>
          </div>
        </div>
      </Modal>
      <div className="assessment">
        <div className="assessment-questions">
          <h2>Covid19 Assessment</h2>
          {
            loading ? <Spinner animation="grow" variant="success" /> : (
              questions.length > 0 ? 
                <Form onSubmit={handleSubmit(onSubmit)}>
                  {questions.map((item, index) => {
                    const rowId = `question${index}`;
                    return (
                      <div className="assessment-questions-row" key={index}>
                        <p>{item.question}</p>
                        <div className="assessment-questions-row-buttons">
                          <Form.Group>
                            <Form.Check
                              type="radio"
                              label="Yes"
                              name={rowId}
                              value="Yes"
                              id={`question-${index + 1}`}
                              onChange={handleChange(index)}
                              ref={register({ required: true })}
                            />
                            <Form.Check
                              type="radio"
                              label="No"
                              name={rowId}
                              value="No"
                              id={`question-${index + 1}`}
                              onChange={handleChange(index)}
                              ref={register({ required: true })}
                            />
                            <Form.Text className="text-muted">
                              {errors[rowId] && <span>Answer is required</span>}
                            </Form.Text>
                          </Form.Group>
                        </div>
                      </div>
                    );
                  })}
                  <div className="form-button">
                    <Button type="submit">{submitting ? <Spinner animation="border" size="sm" /> : "Submit"}</Button>
                  </div>
                  <Form.Text>
                    {submitError && <p>Unable to submit assessment at the moment, please try again later</p>}
                  </Form.Text>
                </Form>
                : (
                    <div className="">
                      <p>{questions.message}</p>
                      <div className="form-button">
                        <button onClick={() => props.history.push("/dashboard")}>Return to Dashboard</button>
                      </div>
                    </div>
                  )
            )
          }
            <div className="assessment-disclaimer">
              <h2>Disclaimer</h2>
              <p>This is not a medical diagnosis. If in doubt it is always best to seek advise from medical professionals</p>
            </div>
        </div>
      </div>
      <div className="dashboard-mobile-nav">
        <MobileNavbar page={pathname} />
      </div>
    </div>
  )
}

export default Assessment;
