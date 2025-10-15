import React, { useState, useEffect } from 'react';
import { useApp } from '../../lib/AppContext';
import { translations } from '../../lib/translations';
import { teamMembers, projects } from '../../lib/mock-data';
import { Search, Code, Cloud, Users, Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const HomePage: React.FC = () => {
  const { language, setCurrentPage, setSelectedProfileId, setSelectedProjectId } = useApp();
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredScroll, setFeaturedScroll] = useState(0);
  const [visibleWords, setVisibleWords] = useState(0); // Start with nothing visible

  const services = [
    {
      icon: Code,
      title: t.services.development.title,
      description: t.services.development.description,
    },
    {
      icon: Cloud,
      title: t.services.devops.title,
      description: t.services.devops.description,
    },
    {
      icon: Users,
      title: t.services.projectManagement.title,
      description: t.services.projectManagement.description,
    },
    {
      icon: Palette,
      title: t.services.design.title,
      description: t.services.design.description,
    },
  ];

  const roles = ['Developer', 'DevOps', 'Project Manager', 'Designer'];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    
    // "From idea" / "Fra idé" appears immediately
    timers.push(setTimeout(() => setVisibleWords(1), 0));
    
    // "to reality" / "til virkelighet" after 1 second
    timers.push(setTimeout(() => setVisibleWords(2), 1000));
    
    // Subtitle 2 seconds after "til virkelighet" (total 3 seconds)
    timers.push(setTimeout(() => setVisibleWords(3), 3000));

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('team');
    }
  };

  const scrollFeatured = (direction: 'left' | 'right') => {
    const container = document.getElementById('featured-projects');
    if (container) {
      const scrollAmount = 400;
      const newScroll = direction === 'left' 
        ? Math.max(0, featuredScroll - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, featuredScroll + scrollAmount);
      
      container.scrollTo({ left: newScroll, behavior: 'smooth' });
      setFeaturedScroll(newScroll);
    }
  };

  const handleViewProfile = (id: string) => {
    setSelectedProfileId(id);
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProject = (id: string) => {
    setSelectedProjectId(id);
    setCurrentPage('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  return (
    <div id="main-content">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 border border-primary rotate-45" />
          <div className="absolute bottom-40 left-20 w-96 h-96 border border-primary rotate-12" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
            {language === 'no' ? (
              <>
                <span 
                  className={`inline-block mr-4 sm:mr-6 transition-all duration-700 ${
                    visibleWords >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  Fra idé
                </span>
                <span 
                  className={`inline-block transition-all duration-700 ${
                    visibleWords >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  til virkelighet
                </span>
              </>
            ) : (
              <>
                <span 
                  className={`inline-block mr-4 sm:mr-6 transition-all duration-700 ${
                    visibleWords >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  From idea
                </span>
                <span 
                  className={`inline-block transition-all duration-700 ${
                    visibleWords >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  to reality
                </span>
              </>
            )}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            <span 
              className={`inline-block transition-all duration-700 ${
                visibleWords >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {t.home.heroSubtitle}
            </span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setCurrentPage('projects')}
              className="bg-primary text-primary-foreground hover:bg-violet-700 dark:hover:bg-violet-600"
            >
              {t.home.viewAllProjects}
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t.home.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {roles.map((role) => (
                  <Badge
                    key={role}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setCurrentPage('team')}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl mb-2">{t.home.featuredProjects}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollFeatured('left')}
              disabled={featuredScroll === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollFeatured('right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          id="featured-projects"
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <Card
              key={project.id}
              className="flex-shrink-0 w-[400px] snap-start group hover:shadow-xl hover:border-primary transition-all cursor-pointer border-2 border-transparent"
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
                <p className="text-muted-foreground">
                  {typeof project.summary === 'string' 
                    ? project.summary 
                    : project.summary[language]
                  }
                </p>
              </CardHeader>
              <CardFooter className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
                {project.tech.length > 3 && (
                  <Badge variant="secondary">+{project.tech.length - 3}</Badge>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" onClick={() => setCurrentPage('projects')}>
            {t.home.viewAllProjects}
          </Button>
        </div>
      </section>

      {/* Team Preview */}
      <section className="bg-muted/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl mb-12 text-center">{t.home.teamPreview}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="group hover:shadow-xl hover:bg-violet-100/60 dark:hover:bg-blue-950/20 transition-all cursor-pointer"
                onClick={() => handleViewProfile(member.id)}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-24 h-24 ring-4 ring-background group-hover:ring-primary transition-all">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name ? member.name.split(' ').map((n) => n[0]).join('') : '??'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h3>{member.name}</h3>
                  <div className="flex flex-wrap gap-1 justify-center mt-2">
                    {member.role && member.role.map((role) => (
                      <Badge key={role} variant="secondary" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.skills && member.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-2">
                  <Button size="sm" variant="ghost">
                    {t.team.viewProfile}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => setCurrentPage('team')}>
              {t.home.viewAllTeam}
            </Button>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl mb-12 text-center">{t.home.whatWeOffer}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <Card key={idx} className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3>{service.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
