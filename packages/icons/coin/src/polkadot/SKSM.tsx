import { forwardRef } from 'react';
import { Icon, IconProps } from '@interlay/icons';

const SKSM = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon {...props} ref={ref} fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <title>SKSM</title>
    <g clipPath='url(#clip0_1_230)'>
      <circle cx='12' cy='12' fill='url(#paint0_linear_1_230)' r='11.5' stroke='#E7F6FF' />
      <path
        d='M19.0064 6.58781C18.7506 6.37415 18.4456 6.08232 17.8898 6.00936C17.3683 5.9364 16.8371 6.3064 16.478 6.55133C16.1189 6.79626 15.4401 7.51542 15.1597 7.7343C14.8793 7.95317 14.1612 8.15642 13.0052 8.89121C11.8492 9.626 7.31395 12.7111 7.31395 12.7111L8.4945 12.7267L3.23119 15.5982H3.75752L3 16.2079C3 16.2079 3.66898 16.3955 4.22975 16.0203V16.1922C4.22975 16.1922 10.4965 13.5762 11.7066 14.2536L10.9688 14.4829C11.0327 14.4829 12.2231 14.5663 12.2231 14.5663C12.252 14.8275 12.3348 15.0787 12.4658 15.302C12.5967 15.5254 12.7725 15.7155 12.9806 15.8587C13.6988 16.359 13.7135 16.6352 13.7135 16.6352C13.7135 16.6352 13.3397 16.7968 13.3397 17C13.3397 17 13.8906 16.8228 14.4022 16.8384C14.7269 16.8515 15.0489 16.9057 15.3614 17C15.3614 17 15.3221 16.7811 14.8252 16.6352C14.3284 16.4893 13.8365 15.916 13.5955 15.6034C13.4479 15.4043 13.3516 15.168 13.3163 14.9177C13.2809 14.6674 13.3076 14.4116 13.3938 14.1755C13.566 13.7012 14.1661 13.4407 15.4057 12.7632C16.8666 11.9607 17.2011 11.3666 17.4077 10.9028C17.6143 10.439 17.9193 9.51657 18.0914 9.08403C18.3079 8.52642 18.5735 8.22937 18.7948 8.05219C19.0162 7.875 20 7.48416 20 7.48416C20 7.48416 19.2474 6.79105 19.0064 6.58781Z'
        fill='white'
      />
    </g>
    <defs>
      <linearGradient gradientUnits='userSpaceOnUse' id='paint0_linear_1_230' x1='12' x2='12' y1='0' y2='24'>
        <stop stopColor='#253869' />
        <stop offset='1' stopColor='#00227B' />
      </linearGradient>
      <clipPath id='clip0_1_230'>
        <rect fill='white' height='24' width='24' />
      </clipPath>
    </defs>
  </Icon>
));

SKSM.displayName = 'SKSM';

export { SKSM };
