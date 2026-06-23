function FeaturedProducts() {
  return (
    <section className="featured-product">

      <div className="featured-badge">
        ⭐ Best Seller
      </div>

      <div className="featured-container">

        <div className="featured-image">
          <img
            src="https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800"
            alt="Raw Himalayan Honey"
          />
        </div>

        <div className="featured-content">

          <h2>Raw Himalayan Honey</h2>

          <p>
            Harvested from wild Himalayan flowers,
            naturally rich in antioxidants and nutrients.
          </p>

          <ul>
            <li>100% Raw & Unfiltered</li>
            <li>Rich In Antioxidants</li>
            <li>No Added Sugar</li>
            <li>Sustainably Harvested</li>
          </ul>

          <div className="featured-price">
            ₹999
          </div>

        </div>

      </div>

    </section>
  );
}

export default FeaturedProducts;