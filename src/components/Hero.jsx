import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="hero">

      <img
        className="hero-bg"
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
        alt="Indian Himalayas"
      />

      <div className="hero-overlay">

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Pure Gold From
          The Indian Himalayas
        </motion.h1>

        <p>
          Harvested from pristine mountain forests,
          wildflower valleys, and remote Himalayan
          regions of Uttarakhand and Himachal Pradesh.
        </p>

        <button>
          Explore Collection
        </button>

      </div>

    </section>
  );
}

export default Hero;