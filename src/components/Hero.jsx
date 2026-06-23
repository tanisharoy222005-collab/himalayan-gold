import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate();

  const handleExplore = () => {

    if (window.location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const products =
          document.getElementById("products");

        if (products) {
          products.scrollIntoView({
            behavior: "smooth"
          });
        }
      }, 300);

    } else {

      const products =
        document.getElementById("products");

      if (products) {
        products.scrollIntoView({
          behavior: "smooth"
        });
      }

    }
  };

  return (
    <section className="hero">

      <img
        className="hero-bg"
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600"
        alt="Indian Himalayas"
      />

      <div className="hero-overlay">

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Pure Gold From
          <br />
          The Indian Himalayas
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Harvested from pristine mountain forests,
          wildflower valleys, and remote Himalayan
          regions of Uttarakhand and Himachal Pradesh.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={handleExplore}
        >
          Explore Collection
        </motion.button>

      </div>

    </section>
  );
}

export default Hero;