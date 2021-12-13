import React, { useState } from 'react';
import './styles.scss'
import TitleHeader from "../../components/TitleHeader/TitleHeader";
import ChartThree from "../../components/ChartThree/ChartThree";
import ChartTwo from "../../components/ChartTwo/ChartTwo";
import ChartOne from "../../components/ChartOne/ChartOne";


const Home = () => {

  const [open, setOpen] = useState(false)
  const [trigger, setTrigger] = useState(false)

  return (<div className="container">
      <TitleHeader
        title={"Sales statistics"}
        subtitle={"Welcome to CRM dashboard"}
        onClick={() => setOpen(true)}
        setTrigger={setTrigger}
      />
      <div className="tables">
        <div className="tables-left">
          <div className="one">
            <ChartOne/>
          </div>
          <div className="two">
            <ChartTwo/>
          </div>
        </div>
        <div className="tables-right">
          <div className="three">
            <ChartThree/>
          </div>
        </div>
      </div>
    </div>)
};

export default Home;