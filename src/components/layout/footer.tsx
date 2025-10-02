import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-blue-600" />
              <span className="font-bold">Vision Marine</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Plataforma de treinamento marítimo especializada em capacitação profissional.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Empresa</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Plataforma</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/auth/login"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Fazer login
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Criar conta
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Termos de uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Vision Marine. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}