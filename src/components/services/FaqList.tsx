import { useState } from 'react'
import { FAQ } from '../../data/faq'

export function FaqList() {
  const [open, setOpen] = useState(0)

  return (
    <div>
      {FAQ.map((item, i) => (
        <div key={i} className={`acc ${open === i ? 'open' : ''}`}>
          <button
            className="acc-head"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            <h4>{item.q}</h4>
            <span className="acc-toggle mono" aria-hidden="true">+</span>
          </button>
          <div className="acc-body" role="region" aria-hidden={open !== i}>
            {item.a}
          </div>
        </div>
      ))}
    </div>
  )
}
