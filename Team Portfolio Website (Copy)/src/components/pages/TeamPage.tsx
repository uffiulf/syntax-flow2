import React, { useState, useMemo } from 'react';
import { useApp } from '../../lib/AppContext';
import { translations } from '../../lib/translations';
import { teamMembers } from '../../lib/mock-data';
import { Search, Download } from 'lucide-react';
import { Input } from '../ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const TeamPage: React.FC = () => {
  const { language, setCurrentPage, setSelectedProfileId } = useApp();
  const t = translations[language];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('alpha');

  const allRoles = useMemo(() => {
    const roles = new Set<string>();
    teamMembers.forEach(member => {
      member.role.forEach(role => roles.add(role));
    });
    return Array.from(roles);
  }, []);

  const filteredAndSortedMembers = useMemo(() => {
    let filtered = teamMembers;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.skills && member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by role
    if (roleFilter !== 'all') {
      filtered = filtered.filter(member => member.role.includes(roleFilter));
    }

    // Sort
    const sorted = [...filtered];
    if (sortBy === 'alpha') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'role') {
      sorted.sort((a, b) => a.role[0].localeCompare(b.role[0]));
    }

    return sorted;
  }, [searchQuery, roleFilter, sortBy]);

  const handleViewProfile = (id: string) => {
    setSelectedProfileId(id);
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="main-content" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl mb-4">{t.team.title}</h1>
          <p className="text-lg text-muted-foreground">{t.team.subtitle}</p>
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
                  placeholder={t.team.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Role Filter */}
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t.team.filterByRole} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.team.allRoles}</SelectItem>
                  {allRoles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder={t.team.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alpha">{t.team.sortAlpha}</SelectItem>
                  <SelectItem value="role">{t.team.sortRole}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Team Grid */}
        {filteredAndSortedMembers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No team members found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedMembers.map((member) => (
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
                  <p className="text-sm text-muted-foreground mt-2">{member.location}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.skills && member.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {member.skills && member.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{member.skills.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-2">
                  <Button size="sm" variant="default">
                    {t.team.viewProfile}
                  </Button>
                  {member.cvUrl && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={member.cvUrl} download>
                        <Download className="h-3 w-3 mr-1" />
                        {t.team.downloadCV}
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
