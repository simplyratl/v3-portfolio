export type Playground = {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
  video?: string;
};

export const playground: Playground[] = [
  {
    id: 1,
    title: "Boundless Crafting",
    description: "A game where you can craft anything you want.",
    location: "https://boundless-crafting.nikicaraznatovic.me/",
    image:
      "https://nikicaraznatovic-portfolio.s3.eu-central-1.amazonaws.com/boundless-crafting/Boundless+Crafting.png",
    video:
      "https://nikicaraznatovic-portfolio.s3.eu-central-1.amazonaws.com/boundless-crafting/boundless+crafting.mp4",
  },
];
