import React, { useState, useMemo } from 'react';
import { useApp } from '../../lib/AppContext';
import { translations } from '../../lib/translations';
import { projects, teamMembers } from '../../lib/mock-data';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const ProjectsPage: React.FC = () => {
  const { language, setCurrentPage, setSelectedProjectId } = useApp();
  const t = translations[language];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [techFilter, setTechFilter] = useState('all');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  const allTech = useMemo(() => {
    const tech = new Set<string>();
    projects.forEach(project => {
      project.tech.forEach(t => tech.add(t));
    });
    return Array.from(tech);
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by tag
    if (tagFilter !== 'all') {
      filtered = filtered.filter(project => project.tags.includes(tagFilter));
    }

    // Filter by tech
    if (techFilter !== 'all') {
      filtered = filtered.filter(project => project.tech.includes(techFilter));
    }

    return filtered;
  }, [searchQuery, tagFilter, techFilter]);

  const handleViewProject = (id: string) => {
    setSelectedProjectId(id);
    setCurrentPage('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getProjectTeamMembers = (memberIds: string[]) => {
    return teamMembers.filter(m => memberIds.includes(m.id));
  };

  return (
    <div id="main-content" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl mb-4">{t.projects.title}</h1>
          <p className="text-lg text-muted-foreground">{t.projects.subtitle}</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t.projects.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Tag Filter */}
              <Select value={tagFilter} onValueChange={setTagFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t.projects.filterByTag} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.projects.allTags}</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Tech Filter */}
              <Select value={techFilter} onValueChange={setTechFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t.projects.filterByTech} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.projects.allTech}</SelectItem>
                  {allTech.map(tech => (
                    <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const teamMembersForProject = getProjectTeamMembers(project.teamMemberIds);
              
              return (
                <Card
                  key={project.id}
                  className="group hover:shadow-xl hover:border-primary transition-all cursor-pointer flex flex-col border-2 border-transparent"
                  onClick={() => handleViewProject(project.id)}
                >
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge>{project.tags[0]}</Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <h3>{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.summary}
                    </p>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.tech.length - 4}
                        </Badge>
                      )}
                    </div>

                    {/* Team Members */}
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {teamMembersForProject.slice(0, 4).map((member) => (
                          <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      {teamMembersForProject.length > 4 && (
                        <span className="text-xs text-muted-foreground">
                          +{teamMembersForProject.length - 4}
                        </span>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      {t.projects.viewProject}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

        {/* Side Projects Section */}
        <div className="mt-64">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">{t.projects.sideProjects}</h2>
            <p className="text-muted-foreground">{t.projects.sideProjectsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hjemmelab og nettverksinfrastruktur */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <h3 className="text-xl font-semibold">{t.projects.homeLabTitle}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.projects.homeLabDesc}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{t.projects.goals}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {t.projects.homeLabGoals}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">{t.projects.tools}:</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">pfSense</Badge>
                    <Badge variant="secondary" className="text-xs">Proxmox</Badge>
                    <Badge variant="secondary" className="text-xs">Docker</Badge>
                    <Badge variant="secondary" className="text-xs">Portainer</Badge>
                    <Badge variant="secondary" className="text-xs">Pi-hole</Badge>
                    <Badge variant="secondary" className="text-xs">Omada Controller</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">{t.projects.result}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {t.projects.homeLabResult}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Proxmox virtualiseringsmiljø */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <h3 className="text-xl font-semibold">{t.projects.proxmoxTitle}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.projects.proxmoxDesc}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{t.projects.goals}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {t.projects.proxmoxGoals}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">{t.projects.tools}:</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Proxmox VE</Badge>
                    <Badge variant="secondary" className="text-xs">Debian</Badge>
                    <Badge variant="secondary" className="text-xs">Ubuntu</Badge>
                    <Badge variant="secondary" className="text-xs">Docker</Badge>
                    <Badge variant="secondary" className="text-xs">MongoDB</Badge>
                    <Badge variant="secondary" className="text-xs">Omada Controller</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">{t.projects.result}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {t.projects.proxmoxResult}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Lokal web- og tjenestehosting */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <h3 className="text-xl font-semibold">{t.projects.webHostingTitle}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.projects.webHostingDesc}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{t.projects.goals}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {t.projects.webHostingGoals}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">{t.projects.tools}:</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Nginx Proxy Manager</Badge>
                    <Badge variant="secondary" className="text-xs">Docker</Badge>
                    <Badge variant="secondary" className="text-xs">Portainer</Badge>
                    <Badge variant="secondary" className="text-xs">pfSense</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">{t.projects.result}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {t.projects.webHostingResult}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AI- og bildegenerering */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <h3 className="text-xl font-semibold">{t.projects.aiTitle}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.projects.aiDesc}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{t.projects.goals}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {t.projects.aiGoals}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">{t.projects.tools}:</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Stable Diffusion WebUI</Badge>
                    <Badge variant="secondary" className="text-xs">SDXL Base 1.0</Badge>
                    <Badge variant="secondary" className="text-xs">Anaconda</Badge>
                    <Badge variant="secondary" className="text-xs">NVIDIA RTX 4080 Super</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">{t.projects.result}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {t.projects.aiResult}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
