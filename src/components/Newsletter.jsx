function Newsletter() {
  return (
    <section className="newsletter">

      <h2>Join Our Newsletter</h2>

      <p>
        Get exclusive offers, recipes,
        and wellness tips.
      </p>

      <form className="newsletter-form">

        <input
          type="email"
          placeholder="Enter your email"
        />

        <button type="submit">
          Subscribe
        </button>

      </form>

    </section>
  );
}

export default Newsletter;