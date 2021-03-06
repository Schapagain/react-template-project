import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";

let navItems = [
  {
    displayText: "Home",
    link: "/home",
  },
  {
    displayText: "About",
    link: "/about",
  },
  {
    displayText: "Auth",
    isAccordion: true,
    items: [
      {
        displayText: "Login",
        link: "/login",
      },
      {
        displayText: "Signup",
        link: "/signup",
      },
    ],
  },
];
function NavItem({ className, currentPage, link, displayText, isAccordion }) {
  const classes = classNames(className, {
    "bg-white": currentPage === link,
    "hover:bg-white": true,
    "transition duration-300 ease-in-out": true,
    "block w-full": true,
    "p-3": !isAccordion,
    "pl-5 p-3": isAccordion,
  });

  return (
    <li className="w-full">
      <Link to={link} className={classes}>
        {displayText}
      </Link>
    </li>
  );
}

function Accordion({ displayText, items, currentPage }) {
  const [isOpen, toggleOpen] = useState(false);

  useEffect(() => {
    if (items.some((item) => item.link === currentPage)) {
      toggleOpen(true);
    } else {
      toggleOpen(false);
    }
  }, [currentPage]);

  const classes = classNames(
    "hover:bg-white block",
    "transition duration-300 ease-in-out",
    "p-3 w-full cursor-pointer",
    {
      "bg-white": isOpen,
    }
  );

  const arrowClasses = classNames(
    "absolute right-2 top-5",
    "w-0 h-0 pointer-events-none",
    "transition duration-300 ease",
    {
      "transform rotate-180": isOpen,
    }
  );

  return (
    <ul aria-expanded={isOpen} className="relative">
      <li>
        <a
          className={classes}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toggleOpen(!isOpen);
          }}
        >
          {displayText}
        </a>
        <a
          href="#"
          aria-hidden={true}
          style={{
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid black",
          }}
          className={arrowClasses}
        />

        {isOpen && (
          <ul>
            {items.map((item, index) => {
              return (
                <NavItem
                  key={index}
                  displayText={item.displayText}
                  link={item.link}
                  currentPage={currentPage}
                  isAccordion={true}
                />
              );
            })}
          </ul>
        )}
      </li>
    </ul>
  );
}

function Leaf({ onClick, show }) {
  const classes = classNames(
    "rounded-r-full pointer-events-auto flex",
    "z-50 absolute top-1/2 right-0 w-10 h-10",
    "transform -translate-y-1/2 translate-x-full bg-gray-300",
    {
      hidden: !show,
    }
  );
  return (
    <div
      onClick={onClick}
      role="button"
      aria-label="toggle sidebar"
      className={classes}
    >
      <FiMoreVertical aria-hidden={true} className="m-auto" />
    </div>
  );
}

export default function Sidebar({ location }) {
  const [isOpen, setOpen] = useState(false);
  const [showLeaf, setShowLeaf] = useState(true);

  const classes = classNames(
    "h-full hidden md:flex fixed oveflow-y-auto left-0 z-30 top-0",
    "transition-width-color duration-400 ease-in-out",
    {
      "w-72 bg-gray-300": isOpen,
      "w-0 bg-transparent pointer-events-none": !isOpen,
    }
  );
  return (
    <div onTransitionEnd={() => setShowLeaf(!isOpen)} className={classes}>
      {isOpen && (
        <div
          onClick={() => setOpen(false)}
          className="fixed w-full h-full bg-opacity-20 z-30 bg-indigo-400"
        ></div>
      )}
      <div className="h-full w-full flex z-40 relative">
        <ul className="flex flex-col overflow-hidden w-full">
          {navItems.map((navItem, index) => {
            const currentPage = location && location.pathname;
            const childrenProps = { currentPage, ...navItem, key: index };
            return navItem.isAccordion ? (
              <Accordion {...childrenProps} />
            ) : (
              <NavItem {...childrenProps} />
            );
          })}
        </ul>

        <Leaf
          onClick={() => setOpen((open) => !open)}
          show={showLeaf && !isOpen}
        />
      </div>
    </div>
  );
}
