import React from 'react'
import styles from '../styles/DaysWrapper.module.css'
import DayCard from './DayCard'

export default function DaysWrapper({nextFiveDaysConditions}) {

  console.log(nextFiveDaysConditions)

  return (
    <div className={styles.container}>
      {nextFiveDaysConditions.map(daysCondition=>{
        return <DayCard daysCondition={daysCondition} index={nextFiveDaysConditions.indexOf(daysCondition)} />
      })}
    </div>
  )
}
