import React from 'react'
import styles from './Chart.module.css'

function Chart() {
  return (
    <svg className='circle-chart' viewBox='0 0 34 34' width='30' height='30' xmlns='http://www.w3.org/2000/svg'>
      <circle
        className='circle-chart__background'
        stroke='#efefef'
        stroke-width='2'
        fill='#081c22'
        cx='16.91549431'
        cy='16.91549431'
        r='15.91549431'
      />
      <circle
        className={styles['circle-chart__circle']}
        stroke='#00acc1'
        stroke-width='2'
        stroke-dasharray='30,100'
        stroke-linecap='round'
        fill='none'
        cx='16.91549431'
        cy='16.91549431'
        r='15.91549431'
      />
      <g className={styles['circle-chart__info']}>
        <text
          className='circle-chart__percent'
          x='15'
          y='18'
          alignment-baseline='central'
          text-anchor='middle'
          font-size='13'
          fill='white'
          fontWeight='600'
        >
          30
        </text>
        <text
          className='circle-chart__percent'
          x='25'
          y='15'
          alignment-baseline='central'
          text-anchor='middle'
          font-size='7'
          fill='white'
        >
          %
        </text>
      </g>
    </svg>
  )
}

export default Chart
