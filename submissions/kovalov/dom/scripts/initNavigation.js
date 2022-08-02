import { data as planets } from './data.js';
import { createNavElement } from './createNavElement.js';

export function initNavigation(container, data) {
  const elements = createNavElement(data);
  container.appendChild(elements);
}
