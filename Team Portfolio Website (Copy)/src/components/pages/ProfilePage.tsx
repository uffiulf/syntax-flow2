import React from 'react';
import { useApp } from '../../lib/AppContext';
import { translations } from '../../lib/translations';
import { teamMembers, projects } from '../../lib/mock-data';
import { Download, Mail, Github, Linkedin, Globe, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const ProfilePage: React.FC = () => {
  const { language, selectedProfileId, setCurrentPage, setSelectedProjectId } = useApp();
  const t = translations[language];

  const member = teamMembers.find(m => m.id === selectedProfileId);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Team member not found</p>
          <Button onClick={() => setCurrentPage('team')}>Back to Team</Button>
        </div>
      </div>
    );
  }

  const relatedProjects = projects.filter(p => member.projectIds.includes(p.id));

  const handleViewProject = (id: string) => {
    setSelectedProjectId(id);
    setCurrentPage('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="main-content" className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setCurrentPage('team')}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Team
        </Button>

        {/* Header Card */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <Avatar className="w-32 h-32 ring-4 ring-primary/20">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-2xl">
                  {member.name ? member.name.split(' ').map((n) => n[0]).join('') : '??'}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl mb-2">{member.name}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.role && member.role.map((role) => (
                    <Badge key={role}>{role}</Badge>
                  ))}
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  {member.location}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {member.links.email && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={`mailto:${member.links.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </a>
                    </Button>
                  )}
                  {member.links.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={member.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {member.links.linkedin && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {member.links.website && (
                    <Button variant="outline" className="website-btn" size="sm" asChild>
                      <a href={member.links.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </a>
                    </Button>
                  )}
                </div>

                <div className="flex gap-2">
                  {member.cvUrl && (
                    <Button asChild>
                      <a href={member.cvUrl} download>
                        <Download className="h-4 w-4 mr-2" />
                        {t.profile.downloadCV}
                      </a>
                    </Button>
                  )}
                  {member.contactInfo.email && (
                    <Button variant="outline" asChild>
                      <a href={`mailto:${member.contactInfo.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        {t.profile.contact}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio and Contact Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <h2>{t.profile.bio}</h2>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {typeof member.bio === 'string' 
                  ? member.bio 
                  : member.bio[language]
                }
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <h2>Contact</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {member.contactInfo.email && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a 
                    href={`mailto:${member.contactInfo.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {member.contactInfo.email}
                  </a>
                </div>
              )}
              {member.contactInfo.phone && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <a 
                    href={`tel:${member.contactInfo.phone.replace(/\s/g, '')}`}
                    className="hover:text-primary transition-colors"
                  >
                    {member.contactInfo.phone}
                  </a>
                </div>
              )}
              {member.contactInfo.address && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p>{member.contactInfo.address}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Min nettside - Special section for Khalid */}
        {member.id === "4" && member.links.website && (
          <Card className="mb-8 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20">
                  <h2 className="text-2xl font-bold mb-4">Min nettside</h2>
                  <p className="text-muted-foreground mb-6">
                    Besøk min personlige nettside for å se mine prosjekter, erfaringer og mer om min reise som utvikler.
                  </p>
                  <Button asChild className="w-fit">
                    <a href={member.links.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Besøk nettsiden
                    </a>
                  </Button>
                </div>
                <div className="relative h-64 lg:h-full min-h-[300px]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                    alt="Khalid's Website Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Highlights */}
        {member.highlights && member.highlights.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <h2>{t.profile.highlights}</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {member.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Skills */}
        <Card className="mb-8">
          <CardHeader>
            <h2>{t.profile.skills}</h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {member.skills && member.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <h2>{t.profile.relatedProjects}</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleViewProject(project.id)}
                  >
                    <div className="relative h-32 overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4>{project.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {typeof project.summary === 'string' 
                          ? project.summary 
                          : project.summary[language]
                        }
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Experience */}
        {member.experience && member.experience.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <h2>{t.profile.experience}</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {member.experience.map((exp, idx) => (
                  <div key={idx}>
                    {idx > 0 && <Separator className="mb-6" />}
                    <div>
                      <h3>{exp.title}</h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                      {exp.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {typeof exp.description === 'string' 
                            ? exp.description 
                            : exp.description[language]
                          }
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Education */}
        {member.education && member.education.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <h2>{t.profile.education}</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {member.education.map((edu, idx) => (
                  <div key={idx}>
                    {idx > 0 && <Separator className="mb-6" />}
                    <div>
                      <h3>{edu.degree}</h3>
                      <p className="text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
};
