// lib/navigation-links.ts

export const navigationLinks = [
  {
    title: "Components",
    href: "/docs/components/accordion", // optional main href
    items: [
      {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
          "For sighted users to preview content available behind a link.",
      },
      {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
          "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
      },
      {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description:
          "Visually or semantically separates content.",
      },
      {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
          "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      },
      {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      },
    ],
  },
  {
    title: "Manage",
    href: "/docs/react/installation",
    items: [
      {
        title: "Candidates",
        href: "/candidates",
        description: "Install dependencies and structure your app.",
      },
      {
        title: "Voters",
        href: "/voters",
        description: "Use the components in your React app.",
      },
      {
        title: "Votes",
        href: "/docs/react/usage",
        description: "Use the components in your React app.",
      }
    ],
  }
]
