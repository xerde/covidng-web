import React from 'react';

import MainNavbar from '../../assets/components/MainNavbar';
import MobileNavbar from '../../assets/components/MobileNavbar';
import FormButton from '../../assets/components/FormButton';
import doctors from '../../assets/images/doctors.jpg';

import './Hub.scss';

const Hub = props => {
  const { pathname } = props.location;

  return (
    <div className="dashboard">
      <div className='dashboard-navbar'>
        <MainNavbar page={pathname} />
      </div>
      <div className="hub-container d-flex flex-column p-3">
        <div  className="mb-5">
          <img src={doctors} alt="doctors" />
        </div>
        <h3 className="mb-3">
          COVID-19 (Coronavirus Disease 2019), formerly known as 2019-nCov
        </h3>
        <p className="mb-4">
          COVID-19 is the disease resulting from infection by a new respiratory
          visur(SARS-Cov-2), first identified on December, 8 2019 in Wuhan, Hubei
          Province, China as the cause of a respiratory outbreak. The name
          'COVID-19 was suggested by the WHO(World Health Organization), using
          established guidelines.
        </p>

        <h3 className="mb-3">Reported affected areas</h3>
        <p className="mb-4">
          In the beginning, most cases were detected in China. Europe and North
          America are not epicentres of the outbreak, however, all continents are
          reporting an increasing number of cases. The COVID-19 outbreak was
          declared a pandemic by the WHO on March, 11, 2020.
        </p>

        <h3 className="mb-3">Causes and risks</h3>
        <p>
          Coronaviruses are a large family of viruses that cause infection in a
          variety of animal species. Bats appear to be the reservoir of the
          COVID-19 virus, but the intermediate host(s) has not yet been
          identified. Coronaviruses can also spread between animals and humans.
          This is rare, but in the past, has led to outbreaks(MERS-CoV and SARS).
        </p>

        <p>
          Initially, many of the patients in the COVID-19 outbreak were linked to
          a large market selling seafood and live animals - suggesting it was
          spread by animal-to-person contact. However, subsequent cases did not
          have direct exposure to animal markets, indicating person-to-person
          transmission. This has been observed both within an outside of China.
        </p>
        <p>
          The disease spreads from person to person through small droplets from
          the nose or mouth which are passed when a person with COVID-19 coughs or
          exhales. These droplets land on surrounding objects and surfaces. Other
          people then catch COVID-19 by touching these objects or surfaces, then
          touching their eyes, nose or mouth. People can also catch COVID-19 if
          they inhale droplets from a person with COVID-19 who coughs or exhales
          droplets. Studies suggest that the virus is mainly transmitted through
          contact with respiratory droplets rather than through the air. While
          investigations suggest the virus may be found in feces in some cases,
          the ristk of fecal-oral transmission seems to be low.
        </p>
        <p className="mb-4">
          Your risk level depends on where you live, your age, and your overall
          health. The majority of cases are adults, with 2 percent younger than
          20years old. Most patients(80 percent) experienced mild illness and
          recovered without needing special treatment. Around 14 percent
          experienced severe disease and 5 percent were critically ill.
          Approximately 2-3 percent of people with the disease have died
        </p>

        <h3 className="mb-3">Signs and symptoms</h3>
        <p>
          Typical signs and symptoms include fever, dry cough, fatigue, coughing
          up phlegm, and shortness of breath. Some cases also report sore throat,
          headache, muscle pain and chills
        </p>
        <p>
          More serious cases develop severe pneumonia, acure respiratory distress
          syndrome, sepsis and septic shock that can lead to deach. People over 60
          and those with existing chronic conditions(namely hypertension,
          diabetes, cardiovascular disease, chronic respiratory disease and
          cancer) seem to be more vulnerable to sever illness and death.
        </p>
        <p className="mb-4">
          Current estimates of the time between infection and onset of symptoms
          range from one to 14days with average estimates of five to six days.
          While people are mostly infectious when they show symptoms, there are
          indications that rarely, some people might transmit the virus without
          showing any symptoms or before the symptoms appear. If this is
          confirmed, it would make early detection of COVID-19 infections more
          difficult. However, it is not unusual for viral infections of this type.
          For example, this is also seen with measles.
        </p>

        <h3 className="mb-3">Who should be tested for COVID-19</h3>
        <p>
          People who have a sudden onset of at lease one of the following should
          be tested:
        </p>
        <ol className="w-100">
          <li>Fever</li>
          <li>Cough</li>
          <li>Shortness of breath</li>
        </ol>
        <p>
          Current advice for testing depends on the stage of the outbreak in the
          country or area where you live. Areas have different outbreaks, even
          within the same country, and testing approaches will be adapted to the
          situation at a national and local level
        </p>
        <p>
          People who, in the 14 days before the onset of symptoms, fulfilled at
          lease one of the following criteria should also be tested:
        </p>
        <p>
          close contact with a COVID-19 patient(living in the same household,
          healthcare-associated exposure, working together in close proximity or
          sharing thesame classroom environment, or travelling together.
        </p>
        <p>
          a history of travelling to areas with ongoing community trasmission of
          COVID-19
        </p>
        <p>
          worked in or attended a healthcare facility where patients with COVID-19
          infections were been treated.
        </p>

        <a
          href="https://covid19.ncdc.gov.ng/"
          className="text-white btn-mobile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="info">
            <FormButton title="Get More Info" />
          </div>
        </a>
      </div>
      <div className="dashboard-mobile-nav">
        <MobileNavbar page={pathname} />
      </div>
    </div>
  );
};

export default Hub;
