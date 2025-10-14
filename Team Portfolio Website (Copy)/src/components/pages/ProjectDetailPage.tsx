import React from 'react';
import { useApp } from '../../lib/AppContext';
import { translations } from '../../lib/translations';
import { projects, teamMembers } from '../../lib/mock-data';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const ProjectDetailPage: React.FC = () => {
  const { language, selectedProjectId, setCurrentPage, setSelectedProfileId } = useApp();
  const t = translations[language];

  const project = projects.find(p => p.id === selectedProjectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Project not found</p>
          <Button onClick={() => setCurrentPage('projects')}>Back to Projects</Button>
        </div>
      </div>
    );
  }

  const projectTeamMembers = teamMembers.filter(m => project.teamMemberIds.includes(m.id));

  const handleViewProfile = (id: string) => {
    setSelectedProfileId(id);
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="main-content" className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setCurrentPage('projects')}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>

        {/* Hero Image */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-8">
          <ImageWithFallback
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground">{project.summary}</p>
          </div>
        </div>

        {/* Action Buttons */}
        {project.links && (
          <div className="flex flex-wrap gap-2 mb-8">
            {project.links.demo && (
              <Button asChild>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t.projects.viewDemo}
                </a>
              </Button>
            )}
            {project.links.repo && (
              <Button variant="outline" asChild>
                <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  {t.projects.viewRepo}
                </a>
              </Button>
            )}
          </div>
        )}

        {/* Description */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <p className="text-muted-foreground">{project.description}</p>
          </CardContent>
        </Card>

        {/* Technologies */}
        <Card className="mb-8">
          <CardHeader>
            <h2>Technologies</h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card className="mb-8">
          <CardHeader>
            <h2>{t.projects.goals}</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {project.goals.map((goal, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{goal}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Responsibilities */}
        <Card className="mb-8">
          <CardHeader>
            <h2>{t.projects.responsibilities}</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {project.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{resp}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Outcomes */}
        <Card className="mb-8">
          <CardHeader>
            <h2>{t.projects.outcomes}</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {project.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{outcome}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <h2>{t.projects.gallery}</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((image, idx) => (
                  <div key={idx} className="relative h-64 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={image}
                      alt={`${project.title} - Image ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Team Members */}
        <Card>
          <CardHeader>
            <h2>Team Members</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projectTeamMembers.map((member, idx) => (
                <div key={member.id}>
                  {idx > 0 && idx % 2 === 0 && <Separator className="col-span-2 my-4" />}
                  <div
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => handleViewProfile(member.id)}
                  >
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map((n) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4>{member.name}</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.role.map((role) => (
                          <Badge key={role} variant="secondary" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
