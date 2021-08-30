import React from 'react'
import { Steps, Button, message } from 'antd';
import {Identification} from './Identification';
import {Home} from './Home';
import {GeneralInformation} from './GeneralInformation';
import {Location} from './Location';
import {VaccinationSite} from './VaccinationSite';


const { Step } = Steps;
const steps = [
    {
        title: 'Home',
        content: <Home/>,
      },
    {
      title: 'Identification',
      content: <Identification />,
    },
    {
      title: 'General Information',
      content: <GeneralInformation />
    },
    {
      title: 'Location',
      content: <Location />,
    },
    {
        title: 'Preffered Vaccination Site',
        content: <VaccinationSite />,
      },
  ];

export const Stepper = () => {
    const [current, setCurrent] = React.useState(0);

    const next = () => {
      setCurrent(current + 1);
    };
  
    const prev = () => {
      setCurrent(current - 1);
    };
    return (
        <>
        <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}
      
      </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
    )
}
