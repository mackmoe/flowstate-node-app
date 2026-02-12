import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-3">FlowState FM</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your sophisticated sound sanctuary for deep work and creative flow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/listen"
                  className="text-gray-400 hover:text-brand-cyan transition-colors"
                >
                  Listen
                </Link>
              </li>
              <li>
                <Link
                  href="/flow-state"
                  className="text-gray-400 hover:text-brand-cyan transition-colors"
                >
                  Flow State
                </Link>
              </li>
              <li>
                <Link
                  href="/kit"
                  className="text-gray-400 hover:text-brand-cyan transition-colors"
                >
                  Free Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-3">Stay Updated</h4>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-brand-cyan text-black text-sm font-medium rounded-lg hover:bg-brand-cyan/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FlowState FM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
