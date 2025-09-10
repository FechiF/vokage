import { useState } from 'react';
import Modal from './Modal';

import Instructions from './Instructions.js';
import About from './About.js';
import ResumeLevelButton from './ResumeLevelButton.js';
import ReviewLevelsButton from './ReviewLevelsButton.js';

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
        <ReviewLevelsButton btnClass="btn-link" />
        <ResumeLevelButton btnClass="btn-link" />
      </div>

      <Modal
        isOpen={isAboutOpen}
        onClose={closeAbout}
        title="About Vocabulary Hokage"
      >
        <About />
        <button className="btn btn-close-modal" onClick={closeAbout}>
          Close
        </button>
      </Modal>
      <Modal
        isOpen={isInstructionsOpen}
        onClose={closeInstructions}
        title="Instructions"
      >
        <Instructions />
        <button className="btn btn-close-modal" onClick={closeInstructions}>
          Close
        </button>
      </Modal>
    </footer>
  );
}

export default Footer;
