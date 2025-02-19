import './App.css';
import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { motion } from 'framer-motion';

interface IPositionState {
  left: number;
  width: number;
  opacity: number;
}

const headerConfig = [
  {
    title: 'Main',
  },
  {
    title: 'Projects',
  },
  {
    title: 'Links',
  },
];

const useDynamicStyling = () => {
  const [position, setPosition] = useState<IPositionState>({
    left: 0,
    width: 0,
    opacity: 1,
  });

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--dynamic-width',
      `${position.width}px`
    );
    document.documentElement.style.setProperty(
      '--dynamic-left',
      `${position.left}px`
    );
    document.documentElement.style.setProperty(
      '--dynamic-opacity',
      `${position.opacity}`
    );
  }, [position]);

  return {
    position,
    setPosition,
  };
};

const NavTab: React.FC<{
  setPosition: React.Dispatch<React.SetStateAction<IPositionState>>;
  children: React.ReactNode;
}> = ({ setPosition, children }) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (ref.current) {
          const { width } = ref.current.getBoundingClientRect();
          setPosition({
            width,
            opacity: 1,
            left: ref.current.offsetLeft,
          });
        }
      }}
      onMouseLeave={() => {
        setPosition((previous) => ({
          ...previous,
          opacity: 0,
        }));
      }}
      className="Nav-Tabs"
    >
      {children}
    </li>
  );
};

const CursorHoverPill: React.FC<{ position: any }> = ({ position }) => (
  <motion.li animate={position} className="Cursor-Hover-Pill" />
);

export const Header: React.FC = () => {
  const { position, setPosition } = useDynamicStyling();

  return (
    <ul className="Header-box">
      {headerConfig.map(({ title }) => (
        <NavTab key={title} setPosition={setPosition}>
          {title}
        </NavTab>
      ))}
      <CursorHoverPill position={position} />
    </ul>
  );
};
