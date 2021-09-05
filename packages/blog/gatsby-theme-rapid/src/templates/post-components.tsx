/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/display-name */
import React from 'react';
import clsx from 'clsx';
import { NetEaseMusicPlayer } from '../components/shortcodes/NetEaseMusicPlarer';
import { Section } from '../components/shortcodes/Section';
import { YouTube } from '../components/shortcodes/YouTube';
import { Bilibili } from '../components/shortcodes/Bilibili';
import { CodePen } from '../components/shortcodes/CodePen';
import { PDFWrapper } from '../components/shortcodes/PDF';
import Button from '../components/Button';

import './post-components.css';

type ComponentsType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: React.FC<any>;
};

export const MDXComponents: ComponentsType = {
  'netease-music': NetEaseMusicPlayer,
  section: Section,
  youtube: YouTube,
  bilibili: Bilibili,
  codepen: CodePen,
  pdf: PDFWrapper,
  Button,
  Input: (props) => (
    <input className={clsx('input', props.className || '')} {...props} />
  ),
};
