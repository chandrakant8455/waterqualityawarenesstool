import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Water Quality Awareness Tool &mdash;
          Promoting clean water for a healthier world.
        </p>
      </div>
    </footer>
  );
}
