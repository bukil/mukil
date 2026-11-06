import { Fragment } from 'react'
import styles from '../../styles/Daksha.module.css'

export default function RevealWords({ text }) {
  const words = text.split(/\s+/)
  return words.map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      <span className={styles.wordMask}>
        <span className={styles.revealWord} data-reveal-word>
          {word}
        </span>
      </span>
      {index < words.length - 1 ? ' ' : null}
    </Fragment>
  ))
}
