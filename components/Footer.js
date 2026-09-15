import Link from 'next/link';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4a22 22 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.2V10H7.4v3h2.7v8h3.4Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
    <circle cx="12" cy="12" r="4.1" />
    <circle cx="17.5" cy="6.6" r="1" className="social-fill" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 7.2a2.9 2.9 0 0 0-2-2.1C17.2 4.6 12 4.6 12 4.6s-5.2 0-7 .5a2.9 2.9 0 0 0-2 2.1 30 30 0 0 0-.5 4.8c0 1.6.2 3.2.5 4.8a2.9 2.9 0 0 0 2 2.1c1.8.5 7 .5 7 .5s5.2 0 7-.5a2.9 2.9 0 0 0 2-2.1c.3-1.6.5-3.2.5-4.8s-.2-3.2-.5-4.8Z" />
    <path className="social-cutout" d="m10 9 5 3-5 3V9Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <Link href="/" className="footer-logo">StyleNest</Link>
          <p>Your one-stop destination for feminine, elegant styles and modern accessories.</p>
          <div className="social" aria-label="StyleNest social media">
            <a href="#" aria-label="Facebook" className="social-link"><FacebookIcon /></a>
            <a href="#" aria-label="Instagram" className="social-link"><InstagramIcon /></a>
            <a href="#" aria-label="YouTube" className="social-link"><YoutubeIcon /></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link href="/">Home</Link><Link href="/shop/indian-dresses">Shop</Link><a href="#">About Us</a><a href="#">Contact Us</a><a href="#">Returns & Exchange</a>
        </div>
        <div>
          <h4>Shop by Category</h4>
          <Link href="/shop/indian-dresses">Dresses</Link><Link href="/shop/accessories">Accessories</Link><Link href="/shop/footwear">Footwear</Link><Link href="/shop/nightwear">Nightwear</Link><Link href="/shop/bags">Bags</Link>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p>Get new arrivals and boutique offers in your inbox.</p>
          <div className="newsletter"><input placeholder="Your email address"/><button>Subscribe</button></div>
        </div>
      </div>
      <div className="copyright">© 2026 StyleNest. All rights reserved.</div>
    </footer>
  );
}
