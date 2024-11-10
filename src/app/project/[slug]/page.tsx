import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import React from "react";
import SingleProject from "@/components/projects/SingleProject";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

async function getDocFromParams(slug: string) {
  const project = allProjects.find((project) => project.slugAsParams === slug);
  if (!project) notFound();

  return project;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const projects = await getDocFromParams(params.slug);

  return <SingleProject projects={projects} />;
}
