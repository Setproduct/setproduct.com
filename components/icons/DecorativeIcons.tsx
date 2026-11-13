// Inline decorative icons.
//
// These used to be `<img src="/images/*.svg" alt="">`. An <img> with an empty
// alt is correct markup for decoration, but generic SEO/a11y scanners count it
// as "image missing alt text", and the browser still pays a request per icon.
// Inlining the same markup as a real <svg> with aria-hidden solves both: the
// icons disappear from the image audit, no request is spent, and assistive tech
// skips them (the surrounding link or button carries the accessible name).

type IconProps = {
  className?: string;
};

/** Magnifier used inside search fields and the mobile search button. */
export function SearchIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M4.16667 9.16667C4.16667 6.40917 6.40917 4.16667 9.16667 4.16667C11.9242 4.16667 14.1667 6.40917 14.1667 9.16667C14.1667 11.9242 11.9242 14.1667 9.16667 14.1667C6.40917 14.1667 4.16667 11.9242 4.16667 9.16667ZM17.2558 16.0775L14.4267 13.2475C15.3042 12.1192 15.8333 10.705 15.8333 9.16667C15.8333 5.49083 12.8425 2.5 9.16667 2.5C5.49083 2.5 2.5 5.49083 2.5 9.16667C2.5 12.8425 5.49083 15.8333 9.16667 15.8333C10.705 15.8333 12.1192 15.3042 13.2475 14.4267L16.0775 17.2558C16.24 17.4183 16.4533 17.5 16.6667 17.5C16.88 17.5 17.0933 17.4183 17.2558 17.2558C17.5817 16.93 17.5817 16.4033 17.2558 16.0775Z"
        fill="#231F20"
        fillRule="evenodd"
      />
    </svg>
  );
}

/** Mobile nav burger. */
export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M3.948 6H20.051C20.573 6 21 6.427 21 6.949V7.051C21 7.573 20.573 8 20.051 8H3.948C3.426 8 3 7.573 3 7.051V6.949C3 6.427 3.426 6 3.948 6ZM20.051 11H3.948C3.426 11 3 11.427 3 11.949V12.051C3 12.573 3.426 13 3.948 13H20.051C20.573 13 21 12.573 21 12.051V11.949C21 11.427 20.573 11 20.051 11ZM20.051 16H3.948C3.426 16 3 16.427 3 16.949V17.051C3 17.573 3.426 18 3.948 18H20.051C20.573 18 21 17.573 21 17.051V16.949C21 16.427 20.573 16 20.051 16Z"
        fill="#231F20"
        fillRule="evenodd"
      />
    </svg>
  );
}

/** Mobile nav close cross. */
export function CloseIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M13.4142 12.0002L17.7072 7.70725C18.0982 7.31625 18.0982 6.68425 17.7072 6.29325C17.3162 5.90225 16.6842 5.90225 16.2933 6.29325L12.0002 10.5862L7.70725 6.29325C7.31625 5.90225 6.68425 5.90225 6.29325 6.29325C5.90225 6.68425 5.90225 7.31625 6.29325 7.70725L10.5862 12.0002L6.29325 16.2933C5.90225 16.6842 5.90225 17.3162 6.29325 17.7072C6.48825 17.9022 6.74425 18.0002 7.00025 18.0002C7.25625 18.0002 7.51225 17.9022 7.70725 17.7072L12.0002 13.4142L16.2933 17.7072C16.4882 17.9022 16.7443 18.0002 17.0002 18.0002C17.2562 18.0002 17.5122 17.9022 17.7072 17.7072C18.0982 17.3162 18.0982 16.6842 17.7072 16.2933L13.4142 12.0002Z"
        fill="#231F20"
        fillRule="evenodd"
      />
    </svg>
  );
}

/** Chevron between breadcrumb items. */
export function BreadcrumbIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 3L11 8L6 13" stroke="#1A191C" strokeWidth="1.5" />
    </svg>
  );
}

/** Small caret on collapsible footer groups. */
export function FooterCaretIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      height="6"
      viewBox="0 0 12 6"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M6.00001 5.8334C5.81001 5.8334 5.62084 5.76923 5.46667 5.64007L0.466672 1.4734C0.113339 1.17923 0.0650056 0.653401 0.360006 0.300068C0.654172 -0.0532655 1.17917 -0.100765 1.53334 0.193401L6.00917 3.9234L10.4775 0.327568C10.8358 0.0392345 11.3608 0.0959012 11.6492 0.454234C11.9375 0.812568 11.8808 1.33673 11.5225 1.6259L6.52251 5.64923C6.37001 5.77173 6.18501 5.8334 6.00001 5.8334Z"
        fill="#231F20"
        fillRule="evenodd"
      />
    </svg>
  );
}
