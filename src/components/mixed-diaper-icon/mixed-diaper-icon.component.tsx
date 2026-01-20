import { SvgIcon } from "@mui/material";

export function MixedDiaperIcon() {
  return (
    <SvgIcon>
      <svg
        fill="currentColor"
        height="24"
        width="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="split-top-gap">
            <rect x="0" y="0" width="24" height="11.5" />
          </clipPath>
          <clipPath id="split-bottom-gap">
            <rect x="0" y="12.5" width="24" height="11.5" />
          </clipPath>
        </defs>
        <path
          clipPath="url(#split-top-gap)"
          d="M12 2C10.5 2 9.5 3.5 10 5C8 5 6 6.5 6 9C4 9 3 10.5 3 12.5C3 15 5 17 8 17H16C19 17 21 15 21 12.5C21 10.5 20 9 18 9C18 6.5 16 5 14 5C14.5 3.5 13.5 2 12 2Z"
        />
        <path
          clipPath="url(#split-bottom-gap)"
          d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8M7.83 14c.37 0 .67.26.74.62.41 2.22 2.28 2.98 3.64 2.87.43-.02.79.32.79.75 0 .4-.32.73-.72.75-2.13.13-4.62-1.09-5.19-4.12-.08-.45.28-.87.74-.87"
        />
      </svg>
    </SvgIcon>
  );
}
