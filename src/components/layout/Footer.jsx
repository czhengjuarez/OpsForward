import { Link } from 'react-router-dom'
import { Text } from '../ui/Text'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--of-bg-recessed)] border-t border-[var(--of-border-line)] mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-left">
          <div className="mb-2">
            <Text size="lg" weight="bold">
              OpsForward
            </Text>
          </div>
          <div className="mb-6">
            <Link to="/about" className="text-[var(--of-fg-muted)] hover:text-[var(--of-fg-default)] transition-colors">
              <Text>About</Text>
            </Link>
          </div>
          <Text color="secondary" size="xs">
            © {currentYear} OpsForward. Built with Cloudflare products.
          </Text>
        </div>
      </div>
    </footer>
  )
}
