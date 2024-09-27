// components/MovableGrid.js
import { motion } from 'framer-motion';

const MovableGrid = () => {
  const items = Array.from({ length: 9 }, (_, index) => index + 1); // Simple grid items

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
      {items.map((item) => (
        <motion.div
          key={item}
          drag
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#3498db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            color: 'white',
            cursor: 'grab',
          }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
};

export default MovableGrid;
