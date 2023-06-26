function Footer() {
  const date = new Date();

  return (
    <footer className="footer">
      <p className="footer__copyright">&#169; {date.getFullYear()}. Данил Симонов</p>
    </footer>
  )
}

export default Footer;