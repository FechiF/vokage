import { useState } from 'react';
import Modal from './Modal';

import Instructions from './Instructions.js';
import About from './About.js';

function Footer() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  const openAbout = () => setIsAboutOpen(true);
  const closeAbout = () => setIsAboutOpen(false);

  const openInstructions = () => setIsInstructionsOpen(true);
  const closeInstructions = () => setIsInstructionsOpen(false);

  return (
    <footer>
      <div className="footer-links">
        <button className="btn-link" onClick={openAbout}>
          About
        </button>

        <button className="btn-link" onClick={openInstructions}>
          Instructions
        </button>
      </div>

      <Modal
        isOpen={isAboutOpen}
        onClose={closeAbout}
        title="About Vocabulary Hokage"
      >
        <About />
      </Modal>
      <Modal
        isOpen={isInstructionsOpen}
        onClose={closeInstructions}
        title="Instructions"
      >
        <Instructions />
      </Modal>
    </footer>
  );
}

export default Footer;
