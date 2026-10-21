<div align="center">

# lexi tinajero ♡

robotics, research, and a few things off the clock.

[github](https://github.com/lexitinajero) · [linkedin](https://www.linkedin.com/in/alexatinajero) · [say hi](mailto:tinajero@unc.edu)

</div>

---

hi, i'm lexi! i'm a computer science junior at unc–chapel hill, focusing on mobile and embedded systems with a minor in ai. i'm interested in robotics, embedded systems, and having a say in what gets built next.

this is my personal portfolio: a home for my projects, research, and a little of life outside the lab. built with **React, TypeScript, and Vite**, with **CSS** for styling.

## take a look around ✧

- **home**: a quick introduction, a few favorite projects, and a working terminal. try typing `help`, or `spot dance`.
- **about**: goldsboro → durham → chapel hill, with a semester in seoul along the way. plus school, experience, skills, and my résumé.
- **projects**: PAWS, a robot guide built on Boston Dynamics Spot, and the voice navigation system and voice-command demo i built for it. also a plastic recycling system, a startup wearable, and a few other things i've been building.
- **moments**: photos from life outside the lab, mostly travel and food.

## running locally

```bash
git clone https://github.com/lexitinajero/portfolio.git
cd portfolio
npm install
npm run dev
```

open the local address printed in your terminal.

## editing the words

most of the site's copy lives in [`src/content.ts`](src/content.ts). photo captions live in [`src/photos.json`](src/photos.json).

## adding photos

drop new photos into `photos-inbox/`, then run:

```bash
npm run photos
```

the script strips location data, resizes the images, and adds them to [`src/photos.json`](src/photos.json). captions go there, too.

## license

the code is free to learn from and reuse under the [MIT License](LICENSE). my photos, writing, and résumé aren't, so please don't reuse those. details in [`LICENSE`](LICENSE).

---

made by lexi ♡
