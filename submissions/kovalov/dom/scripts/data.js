const data = [
  {
    id: 0,
    name: 'Tatooine',
    src: 'tatooine.webp',
    description:
      'Tatooine is a fictional desert planet that appears in the Star Wars franchise. It is a beige-colored, desolate world orbiting a pair of binary stars, and inhabited by human settlers and a variety of other life forms. The planet was first seen in the original 1977 film Star Wars, and has to date featured in a total of six Star Wars theatrical films.',
  },
  {
    id: 1,
    name: 'Vulcan',
    src: 'vulcan.webp',
    description:
      'The fictional Vulcan homeworld, also named Vulcan, was visited several times in the Star Trek series and feature films. The inhabitants are known as "Vulcans" or "Vulcanians". First seen in the TOS episode, "Amok Time", Vulcan, a Class M planet, is an arid world with a thinner atmosphere than Earth. McCoy states upon beaming down, "Hot as Vulcan, now I understand what that phrase means." In the TOS episode, "The Man Trap", while Uhura is attempting to make conversation with Spock, he informs her that Vulcan has no moon.',
  },
  {
    id: 2,
    name: 'Xandar',
    src: 'xandar.jpg',
    description:
      'Xandar is a fictional planet appearing in American comic books published by Marvel Comics. The planet is depicted as being in the Tranta system in the Andromeda Galaxy. It is best known as the home world of the Nova Corps, an intergalactic police task force. Xandar is also the home planet of Firelord and Air-Walker, former Heralds of Galactus, as well as the super-villain Supernova.',
  },
  {
    id: 3,
    name: 'Krypton',
    src: 'krypton.webp',
    description:
      'Krypton is a fictional planet appearing in American comic books published by DC Comics. The planet was created by Jerry Siegel and Joe Shuster, and was named after the chemical element krypton. The home world of Superman, it was first mentioned in Action Comics #1 (June 1938) and made its first appearance in Superman #1 (1939).',
  },
];

export function getSelectedDataItem(id) {
  data.find((item) => item.id === Number(id));
}
