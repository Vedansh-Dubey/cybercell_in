import { Link } from 'react-router-dom'
import { SERVICES } from '../../data/services'
import { ServiceCard } from '../services/ServiceCard'
import { Icons } from '../ui/Icon'

export function ServicesPreview() {
  const preview = SERVICES.slice(0, 3)

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <span className="eyebrow">How we can help</span>
          <h2 className="section" style={{ margin: '10px 0 0' }}>Areas we work in.</h2>
        </div>
        <div className="services-grid">
          {preview.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} showVisual={false} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/services" className="btn btn-ghost btn-lg">
            Explore all areas <Icons.arrow size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
