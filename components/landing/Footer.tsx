import { ComponentProps } from "@measured/puck";

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends ComponentProps {
  companyName: string;
  description?: string;
  columns: FooterColumn[];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  copyright?: string;
}

export function Footer({
  companyName,
  description,
  columns,
  socialLinks,
  copyright,
}: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">{companyName}</h3>
            {description && (
              <p className="text-gray-400 mb-4">{description}</p>
            )}
            {socialLinks && (
              <div className="flex space-x-4">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FB
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    TW
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    IG
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    LI
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Link Columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            {copyright ||
              `© ${new Date().getFullYear()} ${companyName}. Todos os direitos reservados.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
